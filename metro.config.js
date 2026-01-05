const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add geojson extension to asset types
config.resolver.assetExts.push('geojson');

// Remove geojson from source extensions if it's there
config.resolver.sourceExts = config.resolver.sourceExts.filter(ext => ext !== 'geojson');

module.exports = config;
