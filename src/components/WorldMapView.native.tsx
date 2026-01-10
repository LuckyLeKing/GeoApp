import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import worldData from '../assets/world_latlng';
import { colors } from '../theme';
import { CountryState, Continent } from '../types';
import { getCountriesByContinent } from '../data/countries';

// MapLibre configuration constants
const MAPLIBRE_VERSION = '3.6.2';
const MAPLIBRE_GL_JS = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.js`;
const MAPLIBRE_GL_CSS = `https://unpkg.com/maplibre-gl@${MAPLIBRE_VERSION}/dist/maplibre-gl.css`;

type Props = {
    stateById: Record<string, CountryState>;
    onCountryPress?: (id: string) => void;
    currentContinent?: Continent;
};

export default function WorldMapViewNative({ stateById, onCountryPress, currentContinent }: Props) {
    const webViewRef = useRef<WebView>(null);

    const htmlContent = useMemo(() => {
        return `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <link href="${MAPLIBRE_GL_CSS}" rel="stylesheet" />
    <style>
        body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; background: ${colors.map.ocean}; overflow: hidden; }
        .maplibregl-canvas { outline: none; }
    </style>
</head>
<body>
    <div id="map"></div>
    <script src="${MAPLIBRE_GL_JS}"></script>
    <script>
        const colors = ${JSON.stringify(colors)};
        let currentStateById = ${JSON.stringify(stateById)};
        const worldData = ${JSON.stringify(worldData)};
        
        const map = new maplibregl.Map({
            container: 'map',
            style: {
                version: 8,
                sources: {
                    'countries': {
                        type: 'geojson',
                        data: worldData,
                        generateId: false // We use our own IDs
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
                                ...Object.entries(currentStateById).flatMap(([id, state]) => {
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

        map.on('error', (e) => {
            // window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOG', message: 'Map Error: ' + e.error.message }));
        });

        map.on('load', () => {
            // window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOG', message: 'Map Loaded' }));
            // Log available layers to debug source-layer name
            // const layers = map.getStyle().layers;
            // window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'LOG', message: 'Layers: ' + layers.map(l => l.id).join(', ') }));
        });

        function updateStyles(stateById) {
            currentStateById = stateById;
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
            
            if (map.getLayer('country-fill')) {
                map.setPaintProperty('country-fill', 'fill-color', matchExpression);
            }
        }

        map.on('click', 'country-fill', (e) => {
            const feature = e.features[0];
            const id = feature.properties.id || feature.id;
            const state = currentStateById[id];
            
            if (state === 'correct' || state === 'validated') return;
            
            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'COUNTRY_PRESS', id: id }));
        });

        map.on('mouseenter', 'country-fill', () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'country-fill', () => {
            map.getCanvas().style.cursor = '';
        });

        function fitCountries(ids) {
            if (!ids || ids.length === 0) return;
            const bounds = new maplibregl.LngLatBounds();
            let found = false;
            
            worldData.features.forEach(f => {
                if (ids.includes(f.id)) {
                    const coords = f.geometry.coordinates;
                    const processCoords = (c) => {
                        if (typeof c[0] === 'number') bounds.extend(c);
                        else c.forEach(processCoords);
                    };
                    processCoords(coords);
                    found = true;
                }
            });

            if (found) {
                map.fitBounds(bounds, { padding: 50, duration: 1000 });
            }
        }

        function setFilter(ids) {
            if (!ids || ids.length === 0) {
                map.setFilter('country-fill', null);
                map.setFilter('country-border', null);
                return;
            }
            const filter = ['in', ['get', 'id'], ['literal', ids]];
            map.setFilter('country-fill', filter);
            map.setFilter('country-border', filter);
        }

        window.addEventListener('message', function(event) {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'FIT_BOUNDS') {
                    fitCountries(message.ids);
                } else if (message.type === 'SET_FILTER') {
                    setFilter(message.ids);
                }
            } catch(e) {}
        });
    </script>
</body>
</html>
        `;
    }, []);

    useEffect(() => {
        if (webViewRef.current) {
            const js = `updateStyles(${JSON.stringify(stateById)})`;
            webViewRef.current.injectJavaScript(js);
        }
    }, [stateById]);

    useEffect(() => {
        if (webViewRef.current) {
            if (currentContinent) {
                const countries = getCountriesByContinent(currentContinent);
                const ids = countries.map(c => c.id);
                webViewRef.current.postMessage(JSON.stringify({ type: 'SET_FILTER', ids }));
                webViewRef.current.postMessage(JSON.stringify({ type: 'FIT_BOUNDS', ids }));
            } else {
                webViewRef.current.postMessage(JSON.stringify({ type: 'SET_FILTER', ids: null }));
            }
        }
    }, [currentContinent]);

    const onMessage = (event: any) => {
        try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'COUNTRY_PRESS' && onCountryPress) {
                onCountryPress(data.id);
            }
        } catch (e) {
            console.error('Failed to parse message from WebView', e);
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                style={styles.map}
                onMessage={onMessage}
                scrollEnabled={false}
                overScrollMode="never"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.map.ocean,
    },
    map: {
        flex: 1,
        backgroundColor: colors.map.ocean,
    },
});
