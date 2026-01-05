// ==========================================
// Écran d'accueil
// ==========================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameMode, GameVariant } from '../types';
import { colors, typography, spacing, radius, shadows } from '../theme';

interface Props {
    onStartGame: (mode: GameMode, variant?: GameVariant) => void;
    onResumeGame: () => void;
    hasSavedGame: boolean;
}

const HomeScreen: React.FC<Props> = ({ onStartGame, onResumeGame, hasSavedGame }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>🌍 GeoApp</Text>
                <Text style={styles.subtitle}>Apprends la géographie en jouant</Text>
            </View>

            <View style={styles.modesContainer}>
                {hasSavedGame && (
                    <TouchableOpacity style={[styles.modeButton, styles.resumeButton]} onPress={onResumeGame}>
                        <Text style={styles.modeEmoji}>▶️</Text>
                        <Text style={styles.modeTitle}>Reprendre</Text>
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={styles.modeButton}
                    onPress={() => onStartGame('placement')}
                >
                    <Text style={styles.modeEmoji}>📍</Text>
                    <Text style={styles.modeTitle}>Placement</Text>
                    <Text style={styles.modeDesc}>Trouve les pays sur la carte</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.modeButton}
                    onPress={() => onStartGame('capital')}
                >
                    <Text style={styles.modeEmoji}>🏛️</Text>
                    <Text style={styles.modeTitle}>Capitales</Text>
                    <Text style={styles.modeDesc}>Trouve les capitales</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.modeButton}
                    onPress={() => onStartGame('combined')}
                >
                    <Text style={styles.modeEmoji}>🎯</Text>
                    <Text style={styles.modeTitle}>Mode Combiné</Text>
                    <Text style={styles.modeDesc}>Drapeau → Pays → Carte → Capitale</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.modeButton}
                    onPress={() => onStartGame('progressive')}
                >
                    <Text style={styles.modeEmoji}>🗺️</Text>
                    <Text style={styles.modeTitle}>Construction</Text>
                    <Text style={styles.modeDesc}>Complète la carte entière</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.variantsContainer}>
                <TouchableOpacity
                    style={styles.variantButton}
                    onPress={() => onStartGame('placement', 'daily')}
                >
                    <Text style={styles.variantText}>🎁 Défi du jour</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.variantButton}
                    onPress={() => onStartGame('placement', 'unlimited')}
                >
                    <Text style={styles.variantText}>♾️ Sans limite</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.variantButton}
                    onPress={() => onStartGame('placement', 'expert')}
                >
                    <Text style={styles.variantText}>🎓 Expert</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    subtitle: {
        ...typography.body,
        color: colors.text.secondary,
        marginTop: spacing.sm,
    },
    modesContainer: {
        flex: 1,
        paddingHorizontal: spacing.lg,
        gap: spacing.md,
    },
    modeButton: {
        backgroundColor: colors.background.card,
        borderRadius: radius.lg,
        padding: spacing.lg,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        ...shadows.card,
    },
    resumeButton: {
        backgroundColor: colors.country.success,
    },
    modeEmoji: {
        fontSize: 32,
    },
    modeTitle: {
        ...typography.score,
        color: colors.text.primary,
    },
    modeDesc: {
        ...typography.caption,
        color: colors.text.secondary,
        flex: 1,
        textAlign: 'right',
    },
    variantsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.xl,
        gap: spacing.md,
        justifyContent: 'space-around',
    },
    variantButton: {
        backgroundColor: colors.action.secondary,
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        ...shadows.button,
    },
    variantText: {
        color: colors.text.primary,
        ...typography.caption,
        fontWeight: '500',
    },
});

export default HomeScreen;
