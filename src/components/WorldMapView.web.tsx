import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import worldData from '../assets/world_latlng';
import { colors } from '../theme';
import { CountryState, Continent } from '../types';
import { getCountriesByContinent } from '../data/countries';

type Props = {
    stateById: Record<string, CountryState>;
    onCountryPress?: (id: string) => void;
    currentContinent?: Continent;
};

export default function WorldMapViewWeb({ stateById, onCountryPress, currentContinent }: Props) {
    const mapRef = useRef<L.Map | null>(null);
    const geoJsonRef = useRef<L.GeoJSON | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial map setup
    useEffect(() => {
        if (!containerRef.current || mapRef.current) return;

        const map = L.map(containerRef.current, {
            center: [20, 0],
            zoom: 2,
            minZoom: 1,
            maxZoom: 15,
            zoomControl: true,
            attributionControl: false,
            doubleClickZoom: false,
            zoomSnap: 0,
            zoomDelta: 0.1,             // Ultra-fine zoom increments
            wheelPxPerZoomLevel: 30,    // Smooth mouse wheel zooming
            renderer: L.svg({ padding: 1.0 }), // Larger buffer for smooth animations
        });

        mapRef.current = map;

        // Initialize GeoJSON layer once
        const geoJson = L.geoJSON(worldData as any, {
            // @ts-ignore - smoothFactor is valid for SVG layers
            smoothFactor: 0, // Disable simplification to prevent quality "jumps" during zoom
            style: () => ({
                fillColor: colors.country.neutral,
                weight: 0.7, // Sharp, consistent border
                opacity: 1,
                color: colors.map.stroke,
                fillOpacity: 1,
                // These classes will be targeted by CSS injected below
                className: 'country-path',
            }),
            onEachFeature: (feature, layer) => {
                layer.on({
                    click: () => {
                        const id = feature?.id as string;
                        // Block interaction if already validated
                        const currentState = stateById[id];
                        if (currentState === 'correct' || currentState === 'validated') {
                            return;
                        }
                        if (onCountryPress) onCountryPress(id);
                    },
                });
            },
        }).addTo(map);

        geoJsonRef.current = geoJson;

        // Force ultra-smooth rendering via continuous zoom sync
        let raf: number | null = null;
        map.on('zoom', () => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = null;
                // Leaflet automatically handles the transform, 
                // but setting a style property again forces the renderer to keep 
                // geometry aligned without "snapping" at zoomend.
                if (geoJsonRef.current) {
                    geoJsonRef.current.setStyle({});
                }
            });
        });

        return () => {
            if (raf) cancelAnimationFrame(raf);
            map.remove();
            mapRef.current = null;
            geoJsonRef.current = null;
        };
    }, []);

    // Update GeoJSON layer styles when stateById changes
    useEffect(() => {
        if (!geoJsonRef.current) return;

        geoJsonRef.current.setStyle((feature) => {
            const id = feature?.id as string;
            const state = stateById[id] || 'neutral';
            let color = colors.country.neutral;
            if (state === 'correct' || state === 'validated') color = colors.country.success;
            if (state === 'error') color = colors.country.error;

            return {
                fillColor: color,
            };
        });
    }, [stateById]);

    // Handle continent zoom
    useEffect(() => {
        if (!mapRef.current || !currentContinent || !geoJsonRef.current) return;

        const continentCountries = getCountriesByContinent(currentContinent);
        const countryIds = new Set(continentCountries.map(c => c.id));

        const layerGroup = L.featureGroup();
        geoJsonRef.current.eachLayer((layer: any) => {
            if (countryIds.has(layer.feature.id)) {
                layerGroup.addLayer(layer);
            }
        });

        if (layerGroup.getLayers().length > 0) {
            mapRef.current.fitBounds(layerGroup.getBounds(), {
                padding: [50, 50],
                animate: true,
            });
        }
    }, [currentContinent]);

    if (Platform.OS !== 'web') return null;

    return (
        <View style={styles.container}>
            <style dangerouslySetInnerHTML={{
                __html: `
                .leaflet-overlay-pane svg path {
                    vector-effect: non-scaling-stroke !important;
                    shape-rendering: geometricPrecision !important;
                    stroke-linejoin: round !important;
                    stroke-linecap: round !important;
                }
            `}} />
            {/* @ts-ignore */}
            <div ref={containerRef} style={{ width: '100%', height: '100%', background: colors.map.ocean }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.map.ocean,
    },
});
