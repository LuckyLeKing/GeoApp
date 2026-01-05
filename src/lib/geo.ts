// src/lib/geo.ts

export type Pt = { x: number; y: number };
export type BBox = { minX: number; minY: number; maxX: number; maxY: number };

export type CountryShape = {
    id: string;
    rings: Pt[][];     // projected coords in [0..1]
    bbox: BBox;        // projected bbox in [0..1]
};

export function projectEquirect(lon: number, lat: number): Pt {
    // lon [-180..180], lat [-90..90]
    return {
        x: (lon + 180) / 360,
        y: (90 - lat) / 180,
    };
}

export function computeBBox(rings: Pt[][]): BBox {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (const ring of rings) {
        for (const p of ring) {
            if (p.x < minX) minX = p.x;
            if (p.y < minY) minY = p.y;
            if (p.x > maxX) maxX = p.x;
            if (p.y > maxY) maxY = p.y;
        }
    }
    return { minX, minY, maxX, maxY };
}

export function pointInRing(pt: Pt, ring: Pt[]): boolean {
    // Ray casting; ring is expected closed or not, works either way.
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const xi = ring[i].x, yi = ring[i].y;
        const xj = ring[j].x, yj = ring[j].y;

        const intersects =
            (yi > pt.y) !== (yj > pt.y) &&
            pt.x < ((xj - xi) * (pt.y - yi)) / (yj - yi + 1e-12) + xi;

        if (intersects) inside = !inside;
    }
    return inside;
}

export function pointInPolygonWithHoles(pt: Pt, rings: Pt[][]): boolean {
    // GeoJSON Polygon: rings[0] outer, rings[1..] holes.
    if (rings.length === 0) return false;
    if (!pointInRing(pt, rings[0])) return false;
    for (let i = 1; i < rings.length; i++) {
        if (pointInRing(pt, rings[i])) return false;
    }
    return true;
}

export function parseWorldGeoJSON(geojson: any): CountryShape[] {
    const features = geojson?.features ?? [];
    const out: CountryShape[] = [];

    for (const f of features) {
        const id = String(
            f?.id ??
            f?.properties?.iso_a3 ??
            f?.properties?.ISO_A3 ??
            f?.properties?.adm0_a3 ??
            ""
        );
        if (!id) continue;

        const geom = f?.geometry;
        if (!geom?.type || !geom?.coordinates) continue;

        // We store "polygons" as: array of rings[] (outer+holes).
        // For MultiPolygon, we flatten polygons but keep rings per polygon grouped.
        // We'll store each polygon as its own rings[] and treat country as multiple polygons.
        // For hit-test: inside if inside ANY polygon.
        const polygons: Pt[][][] = [];

        if (geom.type === "Polygon") {
            const rings: Pt[][] = geom.coordinates.map((ringCoords: [number, number][]) =>
                ringCoords.map(([lon, lat]) => projectEquirect(lon, lat))
            );
            polygons.push(rings);
        } else if (geom.type === "MultiPolygon") {
            for (const poly of geom.coordinates) {
                const rings: Pt[][] = poly.map((ringCoords: [number, number][]) =>
                    ringCoords.map(([lon, lat]) => projectEquirect(lon, lat))
                );
                polygons.push(rings);
            }
        } else {
            continue;
        }

        // Flatten for rendering convenience, but keep polygon boundaries for holes in hit-test:
        // We'll store as "ringsGroups": Pt[][][]; however to keep type simple, we encode with separators:
        // Instead, we duplicate CountryShape per polygon? Not ideal.
        // We'll merge bbox across polygons and store a special encoding:
        // rings = [outer, hole1, hole2, outer2, hole2-1, ...] NOT safe.
        // So we store each polygon as separate "CountryShape" entry but same id? Also not ideal for coloring.
        // Best compromise: store country with polygons in a map (handled in component).
        //
        // For simplicity, component will use parseWorldGeoJSONRaw to get polygons per country.
        //
        // Therefore we won't use this in the component; kept for reference.
    }

    return out;
}

export type CountryPoly = { id: string; polygons: Pt[][][]; bbox: BBox };

export function parseWorldGeoJSONPolygons(geojson: any): CountryPoly[] {
    const features = geojson?.features ?? [];
    const out: CountryPoly[] = [];

    for (const f of features) {
        const id = String(
            f?.id ??
            f?.properties?.iso_a3 ??
            f?.properties?.ISO_A3 ??
            f?.properties?.adm0_a3 ??
            ""
        );
        if (!id) continue;

        const geom = f?.geometry;
        if (!geom?.type || !geom?.coordinates) continue;

        const polygons: Pt[][][] = [];

        if (geom.type === "Polygon") {
            const rings: Pt[][] = geom.coordinates.map((ringCoords: [number, number][]) =>
                ringCoords.map(([lon, lat]) => projectEquirect(lon, lat))
            );
            polygons.push(rings);
        } else if (geom.type === "MultiPolygon") {
            for (const poly of geom.coordinates) {
                const rings: Pt[][] = poly.map((ringCoords: [number, number][]) =>
                    ringCoords.map(([lon, lat]) => projectEquirect(lon, lat))
                );
                polygons.push(rings);
            }
        } else {
            continue;
        }

        // bbox across all rings of all polygons
        const allRings: Pt[][] = [];
        for (const poly of polygons) for (const ring of poly) allRings.push(ring);
        const bbox = computeBBox(allRings);

        out.push({ id, polygons, bbox });
    }

    return out;
}

export function hitTestCountry(
    pt: Pt,
    countries: CountryPoly[]
): string | null {
    for (const c of countries) {
        const b = c.bbox;
        if (pt.x < b.minX || pt.x > b.maxX || pt.y < b.minY || pt.y > b.maxY) continue;

        // Inside if inside any polygon (with holes)
        for (const polyRings of c.polygons) {
            if (pointInPolygonWithHoles(pt, polyRings)) return c.id;
        }
    }
    return null;
}
