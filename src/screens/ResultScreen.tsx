// ==========================================
// Écran de fin de partie
// ==========================================

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameState } from '../types';
import { colors, typography, spacing, radius, shadows } from '../theme';

interface Props {
    gameState: GameState;
    onRestart: () => void;
    onHome: () => void;
}

const ResultScreen: React.FC<Props> = ({ gameState, onRestart, onHome }) => {
    const { score, correctAnswers, wrongAnswers, countries, variant } = gameState;
    const total = countries.length;
    const percentage = Math.round((correctAnswers / total) * 100);

    const getGrade = () => {
        if (percentage >= 90) return { emoji: '🏆', text: 'Excellent !', color: colors.country.success };
        if (percentage >= 70) return { emoji: '🎉', text: 'Très bien !', color: colors.action.primary };
        if (percentage >= 50) return { emoji: '👍', text: 'Pas mal !', color: colors.action.info };
        return { emoji: '💪', text: 'Continue !', color: colors.feedback.error };
    };

    const grade = getGrade();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.gradeEmoji}>{grade.emoji}</Text>
                <Text style={[styles.gradeText, { color: grade.color }]}>{grade.text}</Text>

                <View style={styles.statsCard}>
                    {variant !== 'unlimited' && (
                        <View style={styles.statRow}>
                            <Text style={styles.statLabel}>Score</Text>
                            <Text style={styles.statValue}>{score} pts</Text>
                        </View>
                    )}

                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Réponses correctes</Text>
                        <Text style={styles.statValue}>{correctAnswers} / {total}</Text>
                    </View>

                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Erreurs</Text>
                        <Text style={[styles.statValue, styles.errorValue]}>{wrongAnswers}</Text>
                    </View>

                    <View style={styles.progressBar}>
                        <View style={[styles.progressFill, { width: `${percentage}%`, backgroundColor: grade.color }]} />
                    </View>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
                        <Text style={styles.restartText}>🔄 Rejouer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.homeButton} onPress={onHome}>
                        <Text style={styles.homeText}>🏠 Accueil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.lg,
    },
    gradeEmoji: {
        fontSize: 80,
        marginBottom: spacing.md,
    },
    gradeText: {
        ...typography.question,
        fontSize: 32,
        marginBottom: spacing.xl,
    },
    statsCard: {
        backgroundColor: colors.background.card,
        borderRadius: radius.xl,
        padding: spacing.lg,
        width: '100%',
        gap: spacing.md,
        ...shadows.card,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statLabel: {
        ...typography.body,
        color: colors.text.secondary,
    },
    statValue: {
        ...typography.score,
        color: colors.text.primary,
    },
    errorValue: {
        color: colors.feedback.error,
    },
    progressBar: {
        height: 12,
        backgroundColor: colors.action.secondary,
        borderRadius: radius.sm,
        overflow: 'hidden',
        marginTop: spacing.sm,
    },
    progressFill: {
        height: '100%',
        borderRadius: radius.sm,
    },
    percentageText: {
        textAlign: 'center',
        ...typography.caption,
        color: colors.text.secondary,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.md,
        marginTop: spacing.xl,
    },
    restartButton: {
        backgroundColor: colors.country.success,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: radius.lg,
        ...shadows.button,
    },
    restartText: {
        color: colors.text.primary,
        ...typography.score,
    },
    homeButton: {
        backgroundColor: colors.action.secondary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: radius.lg,
        ...shadows.button,
    },
    homeText: {
        color: colors.text.primary,
        ...typography.score,
    },
});

export default ResultScreen;
