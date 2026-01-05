// ==========================================
// Écran de jeu principal
// ==========================================

import React, { useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, BackHandler, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameState, Continent } from '../types';
import WorldMapSvg, { CountryState as SvgState } from '../components/WorldMapSvg';
import TextInputComponent from '../components/Input/TextInput';
import MCQInput from '../components/Input/MCQInput';
import { colors, typography, spacing, radius, shadows } from '../theme';

interface Props {
    gameState: GameState;
    onSubmitText: (answer: string) => void;
    onSubmitPlacement: (countryId: string) => void;
    onSkip: () => void;
    onEnableMCQ: () => void;
    onBack: () => void;
    feedback: { type: 'correct' | 'error' } | null;
    continent?: Continent;
}

const GameScreen: React.FC<Props> = ({
    gameState,
    onSubmitText,
    onSubmitPlacement,
    onSkip,
    onEnableMCQ,
    onBack,
    feedback,
    continent,
}) => {
    const { currentQuestion, score, countryStates, variant, correctAnswers } = gameState;

    useEffect(() => {
        if (Platform.OS === 'android') {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                onBack();
                return true;
            });
            return () => backHandler.remove();
        }
    }, [onBack]);

    const svgStateById = useMemo(() => {
        const result: Record<string, SvgState> = {};
        for (const [id, state] of Object.entries(countryStates)) {
            if (state === 'correct' || state === 'validated') {
                result[id] = 'green';
            } else if (state === 'error') {
                result[id] = 'red';
            } else {
                result[id] = 'neutral';
            }
        }
        return result;
    }, [countryStates]);

    if (!currentQuestion) {
        return null;
    }

    const { country, step, answerMode, mcqOptions } = currentQuestion;
    const isExpert = variant === 'expert';
    const isUnlimited = variant === 'unlimited';

    const getQuestionDisplay = () => {
        switch (step) {
            case 'flag':
                return { emoji: country.flagEmoji, text: 'Quel est ce pays ?' };
            case 'name':
                return { emoji: country.flagEmoji, text: 'Nomme ce pays' };
            case 'placement':
                return { emoji: country.flagEmoji, text: `Trouve ${country.nameFr} sur la carte` };
            case 'capital':
                return { emoji: country.flagEmoji, text: `Capitale de ${country.nameFr} ?` };
            default:
                return { emoji: '❓', text: '' };
        }
    };

    const question = getQuestionDisplay();
    const showMap = step === 'placement';
    const showTextInput = !showMap && answerMode === 'text';
    const showMCQ = !showMap && answerMode === 'mcq' && mcqOptions;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack} style={styles.backButton}>
                    <Text style={styles.backText}>← Quitter</Text>
                </TouchableOpacity>

                <View style={styles.progressContainer}>
                    <Text style={styles.progressText}>
                        {correctAnswers} / {gameState.countries.length}
                    </Text>
                </View>

                {!isUnlimited && (
                    <View style={styles.scoreContainer}>
                        <Text style={styles.scoreText}>🏆 {score}</Text>
                    </View>
                )}

                {isUnlimited && (
                    <View style={styles.unlimitedBadge}>
                        <Text style={styles.unlimitedText}>♾️</Text>
                    </View>
                )}
            </View>

            <View style={styles.questionContainer}>
                <Text style={styles.questionEmoji}>{question.emoji}</Text>
                <Text style={styles.questionText}>{question.text}</Text>
            </View>

            {showMap && (
                <View style={styles.mapContainer}>
                    <WorldMapSvg
                        stateById={svgStateById}
                        onCountryPress={onSubmitPlacement}
                    />

                    {feedback && (
                        <View style={styles.feedbackOverlay}>
                            <View style={[
                                styles.feedbackBadge,
                                feedback.type === 'correct' ? styles.feedbackCorrect : styles.feedbackError
                            ]}>
                                <Text style={styles.feedbackText}>
                                    {feedback.type === 'correct' ? '✓ Correct !' : '✗ Mauvaise réponse'}
                                </Text>
                            </View>
                        </View>
                    )}
                </View>
            )}

            {showTextInput && (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.inputArea}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                >
                    <TextInputComponent
                        onSubmit={onSubmitText}
                        onSwitchToMCQ={onEnableMCQ}
                        onSkip={onSkip}
                        mcqDisabled={isExpert}
                        placeholder={step === 'capital' ? 'Capitale...' : 'Nom du pays...'}
                    />
                </KeyboardAvoidingView>
            )}

            {showMCQ && (
                <View style={styles.inputArea}>
                    <MCQInput
                        options={mcqOptions}
                        onSelect={onSubmitText}
                        onSkip={onSkip}
                    />
                </View>
            )}

            {showMap && (
                <View style={styles.mapSkipContainer}>
                    <TouchableOpacity style={styles.mapSkipButton} onPress={onSkip}>
                        <Text style={styles.mapSkipText}>⏭️ Passer</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
        paddingBottom: spacing.sm,
    },
    backButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.action.secondary,
        borderRadius: radius.md,
    },
    backText: {
        color: colors.text.primary,
        ...typography.caption,
        fontWeight: '500',
    },
    progressContainer: {
        backgroundColor: colors.background.card,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.xl,
    },
    progressText: {
        color: colors.text.primary,
        ...typography.button,
    },
    scoreContainer: {
        backgroundColor: colors.country.success,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.xl,
    },
    scoreText: {
        color: colors.text.primary,
        ...typography.button,
        fontWeight: 'bold',
    },
    unlimitedBadge: {
        backgroundColor: colors.action.info,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.xl,
    },
    unlimitedText: {
        color: colors.text.primary,
        ...typography.caption,
        fontWeight: '600',
    },
    questionContainer: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.md,
    },
    questionEmoji: {
        ...typography.emoji,
        marginBottom: spacing.sm,
    },
    questionText: {
        ...typography.screenTitle,
        color: colors.text.primary,
        textAlign: 'center',
    },
    feedbackBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: radius.xl,
    },
    feedbackCorrect: {
        backgroundColor: colors.feedback.success,
    },
    feedbackError: {
        backgroundColor: colors.feedback.error,
    },
    feedbackText: {
        color: colors.text.primary,
        ...typography.button,
    },
    inputArea: {
        marginTop: 'auto',
    },
    mapContainer: {
        flex: 1,
        marginHorizontal: spacing.sm,
        marginBottom: spacing.sm,
        borderRadius: radius.lg,
        overflow: 'hidden',
    },
    feedbackOverlay: {
        position: 'absolute',
        top: spacing.md,
        left: 0,
        right: 0,
        alignItems: 'center',
        zIndex: 10,
    },
    mapSkipContainer: {
        padding: spacing.md,
        alignItems: 'center',
    },
    mapSkipButton: {
        backgroundColor: colors.action.secondary,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: radius.xl,
        ...shadows.button,
    },
    mapSkipText: {
        color: colors.text.primary,
        ...typography.button,
    },
});

export default GameScreen;
