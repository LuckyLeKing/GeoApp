// src/components/WorldMapSvg.tsx
// Version simplifiée avec contrôles fiables

import React, { useMemo, useRef, useState, useCallback } from "react";
import { View, LayoutChangeEvent, StyleSheet, NativeTouchEvent } from "react-native";
import Svg, { Path, G, Rect } from "react-native-svg";
import world from "../assets/world_simplified";
import { parseWorldGeoJSONPolygons, hitTestCountry, CountryPoly } from "../lib/geo";
import { colors } from "../theme";

export type CountryState = "neutral" | "red" | "green";

type Props = {
    stateById: Record<string, CountryState>;
    onCountryPress?: (id: string) => void;
    strokeWidth?: number;
};

function clamp(v: number, min: number, max: number) {
    return Math.max(min, Math.min(max, v));
}

function colorForState(state: CountryState | undefined) {
    switch (state) {
        case "green": return colors.country.success;
        case "red": return colors.country.error;
        default: return colors.country.neutral;
    }
}

function polygonsToSvgPath(polygons: { x: number; y: number }[][][], w: number, h: number): string {
    let d = "";
    for (const poly of polygons) {
        for (const ring of poly) {
            if (!ring || ring.length < 2) continue;
            d += `M ${ring[0].x * w} ${ring[0].y * h} `;
            for (let i = 1; i < ring.length; i++) {
                d += `L ${ring[i].x * w} ${ring[i].y * h} `;
            }
            d += "Z ";
        }
    }
    return d;
}

function getDistance(t1: NativeTouchEvent, t2: NativeTouchEvent): number {
    const dx = t2.pageX - t1.pageX;
    const dy = t2.pageY - t1.pageY;
    return Math.sqrt(dx * dx + dy * dy);
}

export default function WorldMapSvg({
    stateById,
    onCountryPress,
    strokeWidth = 0.5,
}: Props) {
    const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
    const [transform, setTransform] = useState({ scale: 1, tx: 0, ty: 0 });

    // Refs pour gérer les gestes
    const containerRef = useRef<View>(null);
    const offsetRef = useRef({ x: 0, y: 0 });
    const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
    const panStartRef = useRef<{ tx: number; ty: number } | null>(null);
    const pinchStartRef = useRef<{ distance: number; scale: number; tx: number; ty: number; cx: number; cy: number } | null>(null);
    const movedRef = useRef(false);

    const MIN_SCALE = 1;
    const MAX_SCALE = 150; // Zoom très élevé pour les micro-états

    const countries: CountryPoly[] = useMemo(() => {
        return parseWorldGeoJSONPolygons(world as any);
    }, []);

    const svgPaths = useMemo(() => {
        if (size.w <= 0 || size.h <= 0) return [];
        return countries.map(c => ({
            id: c.id,
            d: polygonsToSvgPath(c.polygons, size.w, size.h),
        }));
    }, [countries, size.w, size.h]);

    const clampTranslate = useCallback((nextTx: number, nextTy: number, nextScale: number) => {
        const w = size.w;
        const h = size.h;
        const sw = w * nextScale;
        const sh = h * nextScale;

        const minX = sw <= w ? (w - sw) / 2 : w - sw;
        const maxX = sw <= w ? (w - sw) / 2 : 0;
        const minY = sh <= h ? (h - sh) / 2 : h - sh;
        const maxY = sh <= h ? (h - sh) / 2 : 0;

        return {
            tx: clamp(nextTx, minX, maxX),
            ty: clamp(nextTy, minY, maxY),
        };
    }, [size.w, size.h]);

    const onLayout = (e: LayoutChangeEvent) => {
        const { width, height } = e.nativeEvent.layout;
        setSize({ w: width, h: height });

        // Mesurer l'offset réel du conteneur par rapport à l'écran
        if (containerRef.current) {
            containerRef.current.measure((_x, _y, _width, _height, pageX, pageY) => {
                offsetRef.current = { x: pageX, y: pageY };
            });
        }
    };

    const handleTap = useCallback((x: number, y: number) => {
        if (size.w <= 0 || size.h <= 0 || !onCountryPress) return;

        const localX = (x - transform.tx) / transform.scale;
        const localY = (y - transform.ty) / transform.scale;

        const px = localX / size.w;
        const py = localY / size.h;

        if (px < 0 || px > 1 || py < 0 || py > 1) return;

        const id = hitTestCountry({ x: px, y: py }, countries);

        // Ne pas permettre le clic sur les pays déjà validés (verts)
        if (id && stateById[id] !== 'green') {
            onCountryPress(id);
        }
    }, [size, transform, countries, onCountryPress, stateById]);

    const onTouchStart = useCallback((e: any) => {
        const touches: NativeTouchEvent[] = e.nativeEvent.touches;
        movedRef.current = false;

        if (touches.length === 1) {
            const lx = touches[0].pageX - offsetRef.current.x;
            const ly = touches[0].pageY - offsetRef.current.y;

            // Single touch - prepare for tap or pan
            touchStartRef.current = {
                x: lx,
                y: ly,
                time: Date.now(),
            };
            panStartRef.current = { tx: transform.tx, ty: transform.ty };
            pinchStartRef.current = null;
        } else if (touches.length >= 2) {
            // Multi-touch - prepare for pinch
            const dist = getDistance(touches[0], touches[1]);
            const cx = ((touches[0].pageX + touches[1].pageX) / 2) - offsetRef.current.x;
            const cy = ((touches[0].pageY + touches[1].pageY) / 2) - offsetRef.current.y;

            pinchStartRef.current = {
                distance: dist,
                scale: transform.scale,
                tx: transform.tx,
                ty: transform.ty,
                cx,
                cy,
            };
            touchStartRef.current = null;
        }
    }, [transform]);

    const onTouchMove = useCallback((e: any) => {
        const touches: NativeTouchEvent[] = e.nativeEvent.touches;

        if (touches.length >= 2 && pinchStartRef.current) {
            // Pinch zoom
            movedRef.current = true;
            const dist = getDistance(touches[0], touches[1]);
            const scaleFactor = dist / pinchStartRef.current.distance;
            const newScale = clamp(pinchStartRef.current.scale * scaleFactor, MIN_SCALE, MAX_SCALE);

            // Zoom centré sur le point de pincement actuel
            const cx = ((touches[0].pageX + touches[1].pageX) / 2) - offsetRef.current.x;
            const cy = ((touches[0].pageY + touches[1].pageY) / 2) - offsetRef.current.y;

            const startCx = pinchStartRef.current.cx;
            const startCy = pinchStartRef.current.cy;

            // Point local relatif à la transformation au début du pincement
            const localX = (startCx - pinchStartRef.current.tx) / pinchStartRef.current.scale;
            const localY = (startCy - pinchStartRef.current.ty) / pinchStartRef.current.scale;

            // Nouvelle translation pour garder ce point local exactement sous le point central actuel
            const nextTx = cx - localX * newScale;
            const nextTy = cy - localY * newScale;

            const clamped = clampTranslate(nextTx, nextTy, newScale);
            setTransform({ scale: newScale, tx: clamped.tx, ty: clamped.ty });

        } else if (touches.length === 1 && panStartRef.current && !pinchStartRef.current) {
            // Pan
            const lx = touches[0].pageX - offsetRef.current.x;
            const ly = touches[0].pageY - offsetRef.current.y;

            const dx = lx - (touchStartRef.current?.x ?? lx);
            const dy = ly - (touchStartRef.current?.y ?? ly);

            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                movedRef.current = true;
            }

            const nextTx = panStartRef.current.tx + dx;
            const nextTy = panStartRef.current.ty + dy;
            const clamped = clampTranslate(nextTx, nextTy, transform.scale);
            setTransform(prev => ({ ...prev, tx: clamped.tx, ty: clamped.ty }));
        }
    }, [transform.scale, clampTranslate]);

    const onTouchEnd = useCallback((e: any) => {
        const touches: NativeTouchEvent[] = e.nativeEvent.touches;

        // Si plus de touche active
        if (touches.length === 0) {
            // Vérifier si c'était un tap (court, sans mouvement)
            if (touchStartRef.current && !movedRef.current) {
                const duration = Date.now() - touchStartRef.current.time;
                if (duration < 300) {
                    // C'est un tap !
                    const changedTouches = e.nativeEvent.changedTouches;
                    if (changedTouches && changedTouches.length > 0) {
                        const touch = changedTouches[0];
                        // Convertir en coordonnées locales du composant
                        handleTap(touch.locationX, touch.locationY);
                    }
                }
            }

            touchStartRef.current = null;
            panStartRef.current = null;
            pinchStartRef.current = null;
            movedRef.current = false;
        } else if (touches.length === 1) {
            const lx = touches[0].pageX - offsetRef.current.x;
            const ly = touches[0].pageY - offsetRef.current.y;

            // Passé de 2 à 1 doigt - reset pour pan
            panStartRef.current = { tx: transform.tx, ty: transform.ty };
            touchStartRef.current = {
                x: lx,
                y: ly,
                time: Date.now(),
            };
            pinchStartRef.current = null;
            movedRef.current = true; // On considère qu'on a bougé après un pinch
        }
    }, [handleTap, transform]);

    if (size.w <= 0 || size.h <= 0) {
        return <View style={styles.container} onLayout={onLayout} />;
    }

    return (
        <View
            ref={containerRef}
            style={styles.container}
            onLayout={onLayout}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <Svg
                width={size.w}
                height={size.h}
                viewBox={`0 0 ${size.w} ${size.h}`}
            >
                <Rect x="0" y="0" width={size.w} height={size.h} fill="#1E3A5F" />

                <G transform={`translate(${transform.tx}, ${transform.ty}) scale(${transform.scale})`}>
                    {svgPaths.map(({ id, d }) => {
                        const st = stateById[id] ?? "neutral";
                        return (
                            <Path
                                key={id}
                                d={d}
                                fill={colorForState(st)}
                                stroke={colors.map.stroke}
                                strokeWidth={strokeWidth / transform.scale}
                            />
                        );
                    })}
                </G>
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.map.ocean,
    },
});
