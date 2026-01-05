// ==========================================
// Moteur de scoring
// ==========================================

import { SCORING, TIMING } from '../constants';
import { AnswerMode, AnswerResult, CurrentQuestion } from '../types';

interface ScoreParams {
    answerMode: AnswerMode;
    errorsCount: number;
    hintsUsed: number;
    timeTaken: number;
    isExpertMode: boolean;
    isUnlimitedMode: boolean;
}

// Calcule le score maximum possible pour une question
export const getMaxPossibleScore = (params: ScoreParams): number => {
    if (params.isUnlimitedMode) return 0; // Pas de score en mode sans limite

    let maxScore = params.answerMode === 'text'
        ? SCORING.TEXT_CORRECT
        : SCORING.MCQ_CORRECT;

    // Réduction par erreurs
    maxScore -= params.errorsCount * SCORING.ERROR_PENALTY;

    // Réduction par indices (sauf si expert, pas d'indices disponibles)
    if (!params.isExpertMode) {
        maxScore -= params.hintsUsed * SCORING.HINT_PENALTY;
    }

    return Math.max(0, maxScore);
};

// Calcule le score final pour une réponse correcte
export const calculateScore = (params: ScoreParams): number => {
    if (params.isUnlimitedMode) return 0;

    let score = getMaxPossibleScore(params);

    // Bonus vitesse si réponse rapide
    if (params.timeTaken < SCORING.SPEED_BONUS_THRESHOLD && params.errorsCount === 0) {
        score += SCORING.SPEED_BONUS;
    }

    return Math.max(0, score);
};

// Génère le résultat d'une réponse
export const makeAnswerResult = (
    correct: boolean,
    question: CurrentQuestion,
    isExpertMode: boolean,
    isUnlimitedMode: boolean
): AnswerResult => {
    const timeTaken = Date.now() - question.startTime;

    const params: ScoreParams = {
        answerMode: question.answerMode,
        errorsCount: question.errorsCount,
        hintsUsed: question.hintsUsed.length,
        timeTaken,
        isExpertMode,
        isUnlimitedMode,
    };

    return {
        correct,
        points: correct ? calculateScore(params) : 0,
        maxPoints: getMaxPossibleScore({ ...params, errorsCount: 0, hintsUsed: 0 }),
        timeTaken,
    };
};
