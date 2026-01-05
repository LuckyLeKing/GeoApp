// ==========================================
// Carte interactive avec support SVG
// ==========================================

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { CountryState, Continent } from '../../types';
import { MAP_COLORS } from '../../constants';
import { countries } from '../../data/countries';
import EuropeMap from './EuropeMap';

interface Props {
    countryStates: Record<string, CountryState>;
    onCountryPress: (countryId: string) => void;
    disabled?: boolean;
    continent?: Continent;
}

// Liste des pays européens avec carte SVG
const EUROPE_SVG_COUNTRIES = ['FR', 'DE', 'IT', 'ES', 'GB', 'PT', 'NL', 'BE', 'CH', 'AT', 'PL', 'SE', 'NO', 'GR'];

const InteractiveMap: React.FC<Props> = ({ countryStates, onCountryPress, disabled, continent }) => {

    // Si Europe, utiliser la carte SVG
    if (continent === 'europe') {
        return (
            <View style={styles.svgContainer}>
                <EuropeMap
                    countryStates={countryStates}
                    onCountryPress={onCountryPress}
                    disabled={disabled}
                />
            </View>
        );
    }

    // Sinon, fallback sur la grille
    return <GridMap countryStates={countryStates} onCountryPress={onCountryPress} disabled={disabled} />;
};

// Composant grille (fallback pour autres continents)
const GridMap: React.FC<Props> = ({ countryStates, onCountryPress, disabled }) => {
    const getColor = (state: CountryState) => {
        switch (state) {
            case 'correct': return MAP_COLORS.correct;
            case 'error': return MAP_COLORS.error;
            case 'validated': return MAP_COLORS.validated;
            default: return MAP_COLORS.neutral;
        }
    };

    const continents = ['europe', 'asia', 'africa', 'north_america', 'south_america', 'oceania'];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            {continents.map(cont => (
                <View key={cont} style={styles.continentSection}>
                    <Text style={styles.continentTitle}>
                        {formatContinent(cont)}
                    </Text>
                    <View style={styles.countriesGrid}>
                        {countries
                            .filter(c => c.continent === cont)
                            .map(country => {
                                const state = countryStates[country.id] || 'neutral';
                                const isClickable = state !== 'error' && state !== 'validated' && !disabled;

                                return (
                                    <TouchableOpacity
                                        key={country.id}
                                        style={[
                                            styles.countryTile,
                                            { backgroundColor: getColor(state) },
                                            !isClickable && styles.disabledTile,
                                        ]}
                                        onPress={() => isClickable && onCountryPress(country.id)}
                                        disabled={!isClickable}
                                    >
                                        <Text style={styles.countryFlag}>{country.flagEmoji}</Text>
                                        {(state === 'validated' || state === 'correct') && (
                                            <Text style={styles.countryName}>{country.nameFr}</Text>
                                        )}
                                    </TouchableOpacity>
                                );
                            })}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

const formatContinent = (c: string) => {
    const names: Record<string, string> = {
        europe: '🌍 Europe',
        asia: '🌏 Asie',
        africa: '🌍 Afrique',
        north_america: '🌎 Am. Nord',
        south_america: '🌎 Am. Sud',
        oceania: '🌏 Océanie',
    };
    return names[c] || c;
};

const { width } = Dimensions.get('window');
const TILE_SIZE = (width - 48) / 5;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    svgContainer: {
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 12,
    },
    continentSection: {
        marginBottom: 16,
    },
    continentTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#94A3B8',
        marginBottom: 8,
    },
    countriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    countryTile: {
        width: TILE_SIZE,
        height: TILE_SIZE,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#334155',
    },
    disabledTile: {
        opacity: 0.6,
    },
    countryFlag: {
        fontSize: 24,
    },
    countryName: {
        fontSize: 8,
        color: '#FFF',
        marginTop: 2,
        textAlign: 'center',
    },
});

export default InteractiveMap;
