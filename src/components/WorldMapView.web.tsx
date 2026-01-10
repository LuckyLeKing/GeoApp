import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import worldData from '../assets/world_latlng';
import { colors } from '../theme';
import { CountryState, Continent } from '../types';
import { getCountriesByContinent } from '../data/countries';

type Props = {
    stateById: Record<string, CountryState>;
    onCountryPress?: (id: string) => void;
    currentContinent?: Continent;
};

// MapLibre configuration constants
const MAPLIBRE_VERSION = '3.6.2';
const MAPLIBRE_GL_JS = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.js`;
const MAPLIBRE_GL_CSS = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.css`;

export default function WorldMapViewWeb({ stateById, onCountryPress, currentContinent }: Props) {
    const mapRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Initial map setup
    useEffect(() => {
        if (!containerRef.current || mapRef.current || Platform.OS !== 'web') return;

        // Dynamically load MapLibre
        const link = document.createElement('link');
        link.href = MAPLIBRE_GL_CSS;
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = MAPLIBRE_GL_JS;
        script.onload = () => {
            // @ts-ignore
            const maplibregl = window.maplibregl;
            if (!maplibregl || !containerRef.current) return;

            const map = new maplibregl.Map({
                container: containerRef.current,
                style: {
                    version: 8,
                    sources: {
                        'countries': {
                            type: 'geojson',
                            data: worldData as any,
                            generateId: false
                        }
                    },
                    layers: [
                        {
                            id: 'background',
                            type: 'background',
                            paint: { 'background-color': colors.map.ocean }
                        },
                        {
                            id: 'country-fill',
                            type: 'fill',
                            source: 'countries',
                            paint: {
                                'fill-color': [
                                    'match',
                                    ['get', 'id'],
                                    ...Object.entries(stateById).flatMap(([id, state]) => {
                                        let color = colors.country.neutral;
                                        if (state === 'correct' || state === 'validated') color = colors.country.success;
                                        if (state === 'error') color = colors.country.error;
                                        return [id, color];
                                    }),
                                    colors.country.neutral
                                ],
                                'fill-opacity': 1
                            }
                        },
                        {
                            id: 'country-border',
                            type: 'line',
                            source: 'countries',
                            paint: {
                                'line-color': colors.map.stroke,
                                'line-width': 0.7
                            }
                        }
                    ]
                },
                center: [0, 20],
                zoom: 1.5,
                dragRotate: false,
                touchPitch: false,
                doubleClickZoom: false
            });

            map.on('click', 'country-fill', (e: any) => {
                const feature = e.features[0];
                const id = feature.properties.id || feature.id;
                if (onCountryPress) onCountryPress(id);
            });

            map.on('mouseenter', 'country-fill', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'country-fill', () => {
                map.getCanvas().style.cursor = '';
            });

            mapRef.current = map;
        };
        document.body.appendChild(script);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // Update styles when stateById changes
    useEffect(() => {
        if (!mapRef.current) return;

        const matchExpression = [
            'match',
            ['get', 'id'],
            ...Object.entries(stateById).flatMap(([id, state]) => {
                let color = colors.country.neutral;
                if (state === 'correct' || state === 'validated') color = colors.country.success;
                if (state === 'error') color = colors.country.error;
                return [id, color];
            }),
            colors.country.neutral
        ];

        if (mapRef.current.getLayer('country-fill')) {
            mapRef.current.setPaintProperty('country-fill', 'fill-color', matchExpression);
        }
    }, [stateById]);

    // Handle continent zoom and filtering
    useEffect(() => {
        if (!mapRef.current) return;

        if (currentContinent) {
            const countries = getCountriesByContinent(currentContinent);
            const ids = countries.map(c => c.id);

            // @ts-ignore
            const maplibregl = window.maplibregl;
            if (!maplibregl) return;

            const bounds = new maplibregl.LngLatBounds();
            let found = false;

            (worldData as any).features.forEach((f: any) => {
                if (ids.includes(f.id)) {
                    const coords = f.geometry.coordinates;
                    const processCoords = (c: any) => {
                        if (typeof c[0] === 'number') bounds.extend(c);
                        else c.forEach(processCoords);
                    };
                    processCoords(coords);
                    found = true;
                }
            });

            if (found) {
                mapRef.current.fitBounds(bounds, { padding: 50, duration: 1000 });
            }

            // Apply filter
            const filter = ['in', ['get', 'id'], ['literal', ids]];
            if (mapRef.current.getLayer('country-fill')) {
                mapRef.current.setFilter('country-fill', filter);
            }
            if (mapRef.current.getLayer('country-border')) {
                mapRef.current.setFilter('country-border', filter);
            }
        } else {
            // Remove filter if no continent
            if (mapRef.current.getLayer('country-fill')) {
                mapRef.current.setFilter('country-fill', null);
            }
            if (mapRef.current.getLayer('country-border')) {
                mapRef.current.setFilter('country-border', null);
            }
        }
    }, [currentContinent]);

    if (Platform.OS !== 'web') return null;

    return (
        <View style={styles.container}>
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
