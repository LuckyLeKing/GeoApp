// ==========================================
// Game Engine - Machine d'état principale
// ==========================================

import {
    Country,
    GameMode,
    GameVariant,
    GameState,
    CurrentQuestion,
    CountryState,
    AnswerMode
} from '../types';
import { countries, shuffleCountries, getCountriesSortedByDifficulty } from '../data/countries';
import { makeAnswerResult } from './scoring';
import { MCQ_OPTIONS_COUNT } from '../constants';

// ===== Initialisation =====

export const createInitialGameState = (
    mode: GameMode,
    variant: GameVariant,
    continent?: string
): GameState => {
    // D'abord filtrer par continent si spécifié
    let baseCountries = continent
        ? countries.filter(c => c.continent === continent)
        : countries;

    let gameCountries: Country[];

    // Mode progressif: ordre par difficulté
    if (mode === 'progressive') {
        gameCountries = [...baseCountries].sort((a, b) => a.difficulty - b.difficulty);
    } else {
        // Autres modes: aléatoire
        gameCountries = shuffleCountries(baseCountries);
    }

    // Mode expert: pas de QCM disponible
    const initialStates: Record<string, CountryState> = {};
    gameCountries.forEach(c => initialStates[c.id] = 'neutral');

    return {
        mode,
        variant,
        countries: gameCountries,
        currentIndex: 0,
        currentQuestion: null,
        score: 0,
        maxPossibleScore: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        countryStates: initialStates,
        startTime: Date.now(),
        isPaused: false,
    };
};

// ===== Question management =====

export const startNextQuestion = (state: GameState): GameState => {
    if (state.currentIndex >= state.countries.length) {
        return { ...state, currentQuestion: null }; // Fin du jeu
    }

    const country = state.countries[state.currentIndex];
    const step = getFirstStep(state.mode);

    const question: CurrentQuestion = {
        country,
        step,
        answerMode: state.variant === 'expert' ? 'text' : 'text', // Par défaut texte
        hintsUsed: [],
        errorsCount: 0,
        startTime: Date.now(),
    };

    return { ...state, currentQuestion: question };
};

const getFirstStep = (mode: GameMode): CurrentQuestion['step'] => {
    switch (mode) {
        case 'placement': return 'placement';
        case 'capital': return 'capital';
        case 'combined': return 'flag';
        case 'progressive': return 'placement';
        default: return 'placement';
    }
};

// ===== Réponses =====

export const submitTextAnswer = (
    state: GameState,
    answer: string
): { newState: GameState; correct: boolean } => {
    if (!state.currentQuestion) {
        return { newState: state, correct: false };
    }

    const { country, step } = state.currentQuestion;
    const expectedAnswer = step === 'capital' ? country.capital : country.nameFr;

    const correct = normalizeAnswer(answer) === normalizeAnswer(expectedAnswer);

    return processAnswer(state, correct);
};

export const submitPlacementAnswer = (
    state: GameState,
    clickedCountryId: string
): { newState: GameState; correct: boolean } => {
    if (!state.currentQuestion) {
        return { newState: state, correct: false };
    }

    const correct = clickedCountryId === state.currentQuestion.country.id;
    return processAnswer(state, correct, clickedCountryId);
};

const processAnswer = (
    state: GameState,
    correct: boolean,
    clickedCountryId?: string
): { newState: GameState; correct: boolean } => {
    const question = state.currentQuestion!;
    const isExpert = state.variant === 'expert';
    const isUnlimited = state.variant === 'unlimited';

    const result = makeAnswerResult(correct, question, isExpert, isUnlimited);

    let newCountryStates = { ...state.countryStates };

    if (correct) {
        // En mode combiné, ne marquer 'validated' qu'à la dernière étape (capital)
        // Pour les autres modes, marquer immédiatement
        const isCombinedFinalStep = state.mode === 'combined' && question.step === 'capital';
        const shouldValidate = state.mode !== 'combined' || isCombinedFinalStep;

        if (shouldValidate) {
            newCountryStates[question.country.id] = 'validated';
        }

        // Réinitialiser les erreurs pour tous les pays dès qu'une bonne réponse est trouvée
        Object.keys(newCountryStates).forEach(id => {
            if (newCountryStates[id] === 'error') {
                newCountryStates[id] = 'neutral';
            }
        });

        const nextState = moveToNextQuestion({
            ...state,
            score: state.score + result.points,
            maxPossibleScore: state.maxPossibleScore + result.maxPoints,
            correctAnswers: shouldValidate ? state.correctAnswers + 1 : state.correctAnswers,
            countryStates: newCountryStates,
        });

        return { newState: nextState, correct: true };
    } else {
        // Erreur
        if (clickedCountryId) {
            newCountryStates[clickedCountryId] = 'error';
        }

        const newQuestion: CurrentQuestion = {
            ...question,
            errorsCount: question.errorsCount + 1,
        };

        return {
            newState: {
                ...state,
                currentQuestion: newQuestion,
                wrongAnswers: state.wrongAnswers + 1,
                countryStates: newCountryStates,
            },
            correct: false,
        };
    }
};

// ===== Navigation =====

const moveToNextQuestion = (state: GameState): GameState => {
    const question = state.currentQuestion!;

    // Mode combiné: enchaînement des étapes
    if (state.mode === 'combined') {
        const nextStep = getNextCombinedStep(question.step);
        if (nextStep) {
            return {
                ...state,
                currentQuestion: {
                    ...question,
                    step: nextStep,
                    answerMode: 'text',
                    errorsCount: 0,
                    hintsUsed: [],
                    startTime: Date.now(),
                },
            };
        }
    }

    // Passer au pays suivant
    return startNextQuestion({
        ...state,
        currentIndex: state.currentIndex + 1,
    });
};

const getNextCombinedStep = (
    current: CurrentQuestion['step']
): CurrentQuestion['step'] | null => {
    // Séquence: flag → placement → capital
    switch (current) {
        case 'flag': return 'placement';
        case 'placement': return 'capital';
        case 'capital': return null;
        default: return null;
    }
};

// ===== Skip =====

export const skipQuestion = (state: GameState): GameState => {
    if (!state.currentQuestion) return state;

    return moveToNextQuestion({
        ...state,
        wrongAnswers: state.wrongAnswers + 1,
    });
};

// ===== QCM =====

export const switchToMCQ = (state: GameState): GameState => {
    if (!state.currentQuestion || state.variant === 'expert') {
        return state;
    }

    const question = state.currentQuestion;
    const options = generateMCQOptions(state, question);

    return {
        ...state,
        currentQuestion: {
            ...question,
            answerMode: 'mcq',
            mcqOptions: options,
        },
    };
};

const generateMCQOptions = (state: GameState, question: CurrentQuestion): string[] => {
    const { step, country } = question;
    const correctAnswer = step === 'capital' ? country.capital : country.nameFr;

    // Prendre des réponses incorrectes du même continent
    const sameContinent = countries.filter(
        c => c.continent === country.continent && c.id !== country.id
    );

    const wrongAnswers = shuffleCountries(sameContinent)
        .slice(0, MCQ_OPTIONS_COUNT - 1)
        .map(c => step === 'capital' ? c.capital : c.nameFr);

    // Mélanger les options
    const allOptions = [correctAnswer, ...wrongAnswers];
    for (let i = allOptions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]];
    }
    return allOptions;
};

// ===== Hints =====

export const useHint = (state: GameState, hintType: string): { newState: GameState; hint: string } => {
    if (!state.currentQuestion || state.variant === 'expert' || state.variant === 'unlimited') {
        return { newState: state, hint: '' };
    }

    const question = state.currentQuestion;
    const country = question.country;
    let hint = '';

    switch (hintType) {
        case 'firstLetter':
            const answer = question.step === 'capital' ? country.capital : country.nameFr;
            hint = `Première lettre: ${answer[0].toUpperCase()}`;
            break;
        case 'continent':
            hint = `Continent: ${formatContinent(country.continent)}`;
            break;
        case 'region':
            hint = `Région: ${country.continent.replace('_', ' ')}`;
            break;
    }

    if (!question.hintsUsed.includes(hintType)) {
        return {
            newState: {
                ...state,
                currentQuestion: {
                    ...question,
                    hintsUsed: [...question.hintsUsed, hintType],
                },
            },
            hint,
        };
    }

    return { newState: state, hint };
};

// ===== Helpers =====

const normalizeAnswer = (str: string): string => {
    return str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Enlever accents
        .replace(/[^a-z0-9]/g, '')       // Enlever caractères spéciaux
        .trim();
};

const formatContinent = (continent: string): string => {
    const names: Record<string, string> = {
        europe: 'Europe',
        asia: 'Asie',
        africa: 'Afrique',
        north_america: 'Amérique du Nord',
        south_america: 'Amérique du Sud',
        oceania: 'Océanie',
    };
    return names[continent] || continent;
};

// ===== Game status =====

export const isGameComplete = (state: GameState): boolean => {
    return state.currentIndex >= state.countries.length && !state.currentQuestion;
};

export const getGameProgress = (state: GameState): { current: number; total: number } => {
    return {
        current: state.currentIndex + 1,
        total: state.countries.length,
    };
};
