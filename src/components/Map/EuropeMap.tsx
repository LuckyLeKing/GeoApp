// ==========================================
// Carte de l'Europe avec tuiles cliquables
// ==========================================

import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { CountryState } from '../../types';
import { MAP_COLORS } from '../../constants';

interface Props {
    countryStates: Record<string, CountryState>;
    onCountryPress: (countryId: string) => void;
    disabled?: boolean;
}

// Pays européens avec positions sur une grille 6x5
const EUROPE_COUNTRIES: { id: string; name: string; flag: string; row: number; col: number }[] = [
    // Rangée 0 - Nord
    { id: 'NO', name: 'Norvège', flag: '🇳🇴', row: 0, col: 2 },
    { id: 'SE', name: 'Suède', flag: '🇸🇪', row: 0, col: 3 },

    // Rangée 1 - Centre-Nord
    { id: 'GB', name: 'UK', flag: '🇬🇧', row: 1, col: 0 },
    { id: 'NL', name: 'Pays-Bas', flag: '🇳🇱', row: 1, col: 2 },
    { id: 'DE', name: 'Allemagne', flag: '🇩🇪', row: 1, col: 3 },
    { id: 'PL', name: 'Pologne', flag: '🇵🇱', row: 1, col: 4 },

    // Rangée 2 - Centre
    { id: 'BE', name: 'Belgique', flag: '🇧🇪', row: 2, col: 1 },
    { id: 'FR', name: 'France', flag: '🇫🇷', row: 2, col: 2 },
    { id: 'CH', name: 'Suisse', flag: '🇨🇭', row: 2, col: 3 },
    { id: 'AT', name: 'Autriche', flag: '🇦🇹', row: 2, col: 4 },

    // Rangée 3 - Sud
    { id: 'PT', name: 'Portugal', flag: '🇵🇹', row: 3, col: 0 },
    { id: 'ES', name: 'Espagne', flag: '🇪🇸', row: 3, col: 1 },
    { id: 'IT', name: 'Italie', flag: '🇮🇹', row: 3, col: 3 },
    { id: 'GR', name: 'Grèce', flag: '🇬🇷', row: 3, col: 5 },
];

const { width } = Dimensions.get('window');
const GRID_COLS = 6;
const TILE_SIZE = (width - 48) / GRID_COLS;
const GRID_ROWS = 4;

const EuropeMap: React.FC<Props> = ({ countryStates, onCountryPress, disabled }) => {
    const getColor = (countryId: string): string => {
        const state = countryStates[countryId] || 'neutral';
        switch (state) {
            case 'correct': return MAP_COLORS.correct;
            case 'error': return MAP_COLORS.error;
            case 'validated': return MAP_COLORS.validated;
            default: return MAP_COLORS.neutral;
        }
    };

    const isClickable = (countryId: string): boolean => {
        if (disabled) return false;
        const state = countryStates[countryId] || 'neutral';
        return state !== 'error' && state !== 'validated';
    };

    // Créer une grille vide
    const grid: (typeof EUROPE_COUNTRIES[0] | null)[][] = [];
    for (let r = 0; r < GRID_ROWS; r++) {
        grid[r] = [];
        for (let c = 0; c < GRID_COLS; c++) {
            grid[r][c] = null;
        }
    }

    // Placer les pays dans la grille
    EUROPE_COUNTRIES.forEach(country => {
        grid[country.row][country.col] = country;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🌍 Europe</Text>
            <View style={styles.grid}>
                {grid.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((country, colIndex) => {
                            if (!country) {
                                return <View key={colIndex} style={styles.emptyTile} />;
                            }

                            const clickable = isClickable(country.id);
                            const state = countryStates[country.id] || 'neutral';

                            return (
                                <TouchableOpacity
                                    key={country.id}
                                    style={[
                                        styles.tile,
                                        { backgroundColor: getColor(country.id) },
                                        !clickable && styles.disabledTile,
                                    ]}
                                    onPress={() => clickable && onCountryPress(country.id)}
                                    disabled={!clickable}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.flag}>{country.flag}</Text>
                                    {(state === 'validated' || state === 'correct') && (
                                        <Text style={styles.name}>{country.name}</Text>
                                    )}
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E3A5F',
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#F8FAFC',
        textAlign: 'center',
        marginBottom: 16,
    },
    grid: {
        flexDirection: 'column',
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'center',
    },
    tile: {
        width: TILE_SIZE,
        height: TILE_SIZE,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#334155',
    },
    emptyTile: {
        width: TILE_SIZE,
        height: TILE_SIZE,
    },
    disabledTile: {
        opacity: 0.5,
    },
    flag: {
        fontSize: 28,
    },
    name: {
        fontSize: 9,
        color: '#FFF',
        marginTop: 2,
        textAlign: 'center',
        fontWeight: '600',
    },
});

export default EuropeMap;
