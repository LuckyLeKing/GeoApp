// ==========================================
// Hook principal pour le jeu
// ==========================================

import { useState, useCallback, useEffect } from 'react';
import { GameState, GameMode, GameVariant, Continent } from '../types';
import {
    createInitialGameState,
    startNextQuestion,
    submitTextAnswer,
    submitPlacementAnswer,
    skipQuestion,
    switchToMCQ,
    useHint,
    isGameComplete,
    getGameProgress,
} from '../logic/gameEngine';
import { saveGame, clearSavedGame, getSavedGame } from '../services/storage';

export const useGame = () => {
    const [gameState, setGameState] = useState<GameState | null>(null);
    const [feedback, setFeedback] = useState<{ type: 'correct' | 'error'; message?: string } | null>(null);
    const [selectedContinent, setSelectedContinent] = useState<Continent | undefined>(undefined);

    // Démarrer une nouvelle partie
    const startGame = useCallback((mode: GameMode, variant: GameVariant = 'normal', continent?: Continent) => {
        setSelectedContinent(continent);
        const state = createInitialGameState(mode, variant, continent);
        const stateWithQuestion = startNextQuestion(state);
        setGameState(stateWithQuestion);
        setFeedback(null);
    }, []);

    // Reprendre une partie sauvegardée
    const resumeGame = useCallback(async () => {
        const saved = await getSavedGame();
        if (saved) {
            setGameState(saved.gameState);
            return true;
        }
        return false;
    }, []);

    // Soumettre une réponse texte
    const submitText = useCallback((answer: string) => {
        if (!gameState) return;

        const { newState, correct } = submitTextAnswer(gameState, answer);
        setGameState(newState);
        showFeedback(correct);
    }, [gameState]);

    // Soumettre un clic sur la carte
    const submitPlacement = useCallback((countryId: string) => {
        if (!gameState) return;

        const { newState, correct } = submitPlacementAnswer(gameState, countryId);
        setGameState(newState);
        showFeedback(correct);
    }, [gameState]);

    // Passer la question
    const skip = useCallback(() => {
        if (!gameState) return;
        const newState = skipQuestion(gameState);
        setGameState(newState);
    }, [gameState]);

    // Passer en mode QCM
    const enableMCQ = useCallback(() => {
        if (!gameState) return;
        const newState = switchToMCQ(gameState);
        setGameState(newState);
    }, [gameState]);

    // Utiliser un indice
    const getHint = useCallback((type: string) => {
        if (!gameState) return '';
        const { newState, hint } = useHint(gameState, type);
        setGameState(newState);
        return hint;
    }, [gameState]);

    // Afficher le feedback
    const showFeedback = (correct: boolean) => {
        setFeedback({ type: correct ? 'correct' : 'error' });
        setTimeout(() => setFeedback(null), 1500);
    };

    // Sauvegarder automatiquement
    useEffect(() => {
        if (gameState && !isGameComplete(gameState)) {
            saveGame({ gameState, savedAt: Date.now() });
        } else if (gameState && isGameComplete(gameState)) {
            clearSavedGame();
        }
    }, [gameState]);

    return {
        gameState,
        feedback,
        selectedContinent,
        startGame,
        resumeGame,
        submitText,
        submitPlacement,
        skip,
        enableMCQ,
        getHint,
        isComplete: gameState ? isGameComplete(gameState) : false,
        progress: gameState ? getGameProgress(gameState) : { current: 0, total: 0 },
    };
};
