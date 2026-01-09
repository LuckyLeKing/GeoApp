import React, { useEffect, useRef, useMemo } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import worldData from '../assets/world_latlng';
import { colors } from '../theme';
import { CountryState, Continent } from '../types';
import { getCountriesByContinent } from '../data/countries';

// We'll read the local assets to inline them or use their content
// For simplicity and 100% offline, we'll use a template that receives the data
// Since we cannot easily read local file content as string during runtime in a portable way without more dependencies,
// we will assume the user has the leaflet files or we'll use a CDN fallback for now IF local fails, 
// but the plan was local. I'll use a CDN as primary for this implementation to ensure it WORKS now, 
// but I'll add the logic to make it local if I can.
import { LEAFLET_CSS_B64, LEAFLET_JS_B64 } from '../assets/leaflet/bundled_leaflet';

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
    <style id="leaflet-css"></style>
    <style>
        body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; background: ${colors.map.ocean}; }
        .leaflet-container { background: ${colors.map.ocean} !important; }
        /* Professional SVG rendering optimizations */
        .leaflet-overlay-pane svg path {
            vector-effect: non-scaling-stroke !important;
            shape-rendering: geometricPrecision !important;
            stroke-linejoin: round !important;
            stroke-linecap: round !important;
        }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        document.getElementById('leaflet-css').innerHTML = atob("${LEAFLET_CSS_B64}");
        var script = document.createElement('script');
        script.innerHTML = atob("${LEAFLET_JS_B64}");
        document.body.appendChild(script);
    </script>
    <script>
        var map = L.map('map', {
            center: [20, 0],
            zoom: 2,
            minZoom: 1,
            maxZoom: 15,
            zoomControl: false,
            attributionControl: false,
            doubleClickZoom: false,
            zoomSnap: 0,      // Continuous zoom
            zoomDelta: 0.25,  // Smooth delta
            zoomAnimation: true,
            zoomAnimationThreshold: 10,
            fadeAnimation: true,
            renderer: L.svg({ 
                padding: 1.5, // Increased padding to reduce "snapping" during pan/zoom
                tolerance: 1  // Precision tolerance
            })
        });

        var worldData = ${JSON.stringify(worldData)};
        var colors = ${JSON.stringify(colors)};
        var geoJsonLayer;
        var currentStateById = ${JSON.stringify(stateById)};

        function updateStyles(stateById) {
            currentStateById = stateById;
            if (geoJsonLayer) {
                geoJsonLayer.setStyle(function(feature) {
                    var id = feature.id;
                    var state = stateById[id] || 'neutral';
                    var color = colors.country.neutral;
                    if (state === 'correct' || state === 'validated') color = colors.country.success;
                    if (state === 'error') color = colors.country.error;
                    return {
                        fillColor: color,
                        weight: 0.7,
                        opacity: 1,
                        color: colors.map.stroke,
                        fillOpacity: 1
                    };
                });
            }
        }

        geoJsonLayer = L.geoJSON(worldData, {
            smoothFactor: 0.1, // Minimal simplification to help performance without visual impact
            style: function(feature) {
                return {
                    fillColor: colors.country.neutral,
                    weight: 0.7,
                    opacity: 1,
                    color: colors.map.stroke,
                    fillOpacity: 1
                };
            },
            onEachFeature: function(feature, layer) {
                layer.on('click', function() {
                    var id = feature.id;
                    var state = currentStateById[id];
                    if (state === 'correct' || state === 'validated') {
                        return;
                    }
                    window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'COUNTRY_PRESS', id: id }));
                });
            }
        }).addTo(map);

        // Optimization: Use a debounced redraw for state updates only, not during continuous zoom
        var updateTimeout = null;
        function debouncedUpdate() {
            if (updateTimeout) clearTimeout(updateTimeout);
            updateTimeout = setTimeout(function() {
                if (geoJsonLayer) geoJsonLayer.setStyle({});
            }, 100);
        }

        // Initial update
        updateStyles(currentStateById);

        window.addEventListener('message', function(event) {
            var message = JSON.parse(event.data);
            if (message.type === 'FIT_BOUNDS') {
                var countryIds = new Set(message.countryIds);
                var bounds = L.latLngBounds();
                geoJsonLayer.eachLayer(function(layer) {
                    if (countryIds.has(layer.feature.id)) {
                        bounds.extend(layer.getBounds());
                    }
                });
                if (bounds.isValid()) {
                    map.fitBounds(bounds, { padding: [20, 20], animate: true });
                }
            }
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
        if (webViewRef.current && currentContinent) {
            const continentCountries = getCountriesByContinent(currentContinent);
            const countryIds = continentCountries.map(c => c.id);
            webViewRef.current.postMessage(JSON.stringify({
                type: 'FIT_BOUNDS',
                countryIds
            }));
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
