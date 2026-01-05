// ==========================================
// Écran de sélection continent
// ==========================================

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, BackHandler, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Continent } from '../types';
import { colors, typography, spacing, radius, shadows } from '../theme';

interface Props {
    onSelectContinent: (continent: Continent | 'world') => void;
    onBack: () => void;
}

const continents: { id: Continent | 'world'; emoji: string; name: string; hasSvg: boolean }[] = [
    { id: 'world', emoji: '🌍', name: 'Monde entier', hasSvg: true },
    { id: 'europe', emoji: '🇪🇺', name: 'Europe', hasSvg: true },
    { id: 'asia', emoji: '🌏', name: 'Asie', hasSvg: true },
    { id: 'africa', emoji: '🌍', name: 'Afrique', hasSvg: true },
    { id: 'north_america', emoji: '🌎', name: 'Amérique du Nord', hasSvg: true },
    { id: 'south_america', emoji: '🌎', name: 'Amérique du Sud', hasSvg: true },
    { id: 'oceania', emoji: '🏝️', name: 'Océanie', hasSvg: true },
];

const ContinentSelect: React.FC<Props> = ({ onSelectContinent, onBack }) => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                onBack();
                return true;
            });
            return () => backHandler.remove();
        }
    }, [onBack]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>← Retour</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Choisis une région</Text>
            </View>

            <View style={styles.continentsContainer}>
                {continents.map(cont => (
                    <TouchableOpacity
                        key={cont.id}
                        style={[styles.continentButton, cont.hasSvg && styles.svgAvailable]}
                        onPress={() => onSelectContinent(cont.id)}
                    >
                        <Text style={styles.continentEmoji}>{cont.emoji}</Text>
                        <View style={styles.continentInfo}>
                            <Text style={styles.continentName}>{cont.name}</Text>
                            {cont.hasSvg && (
                                <Text style={styles.svgBadge}>🗺️ Carte géographique</Text>
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    backButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.action.secondary,
        borderRadius: radius.md,
        alignSelf: 'flex-start',
        marginBottom: spacing.md,
    },
    backText: {
        color: colors.text.primary,
        ...typography.button,
    },
    title: {
        ...typography.question,
        color: colors.text.primary,
    },
    continentsContainer: {
        flex: 1,
        padding: spacing.md,
        gap: spacing.md,
    },
    continentButton: {
        backgroundColor: colors.background.card,
        borderRadius: radius.lg,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        ...shadows.card,
    },
    svgAvailable: {
        borderWidth: 2,
        borderColor: colors.country.success,
    },
    continentEmoji: {
        fontSize: 40,
    },
    continentInfo: {
        flex: 1,
    },
    continentName: {
        ...typography.score,
        color: colors.text.primary,
    },
    svgBadge: {
        ...typography.caption,
        color: colors.country.success,
        marginTop: spacing.xs,
    },
});

export default ContinentSelect;
