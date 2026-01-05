// ==========================================
// App.tsx - Point d'entrée principal
// ==========================================

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ResultScreen from './src/screens/ResultScreen';
import ContinentSelect from './src/screens/ContinentSelect';
import { useGame } from './src/hooks/useGame';
import { getSavedGame } from './src/services/storage';
import { GameMode, GameVariant, Continent } from './src/types';

type Screen = 'home' | 'continent_select' | 'game' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [hasSavedGame, setHasSavedGame] = useState(false);
  const [pendingMode, setPendingMode] = useState<GameMode>('placement');
  const [pendingVariant, setPendingVariant] = useState<GameVariant>('normal');

  const {
    gameState,
    feedback,
    selectedContinent,
    startGame,
    resumeGame,
    submitText,
    submitPlacement,
    skip,
    enableMCQ,
    isComplete,
  } = useGame();

  // Vérifier si une partie est sauvegardée
  useEffect(() => {
    const checkSaved = async () => {
      const saved = await getSavedGame();
      setHasSavedGame(!!saved);
    };
    checkSaved();
  }, [screen]);

  // Détecter fin de partie
  useEffect(() => {
    if (isComplete && screen === 'game') {
      setScreen('result');
    }
  }, [isComplete, screen]);

  const handleStartGame = (mode: GameMode, variant: GameVariant = 'normal') => {
    setPendingMode(mode);
    setPendingVariant(variant);
    // Aller à la sélection de continent
    setScreen('continent_select');
  };

  const handleSelectContinent = (continent: Continent | 'world') => {
    const selectedCont = continent === 'world' ? undefined : continent;
    startGame(pendingMode, pendingVariant, selectedCont);
    setScreen('game');
  };

  const handleResumeGame = async () => {
    const resumed = await resumeGame();
    if (resumed) {
      setScreen('game');
    }
  };

  const handleRestart = () => {
    startGame(pendingMode, pendingVariant, selectedContinent);
    setScreen('game');
  };

  const handleHome = () => {
    setScreen('home');
  };

  return (
    <>
      <StatusBar style="light" />

      {screen === 'home' && (
        <HomeScreen
          onStartGame={handleStartGame}
          onResumeGame={handleResumeGame}
          hasSavedGame={hasSavedGame}
        />
      )}

      {screen === 'continent_select' && (
        <ContinentSelect
          onSelectContinent={handleSelectContinent}
          onBack={handleHome}
        />
      )}

      {screen === 'game' && gameState && (
        <GameScreen
          gameState={gameState}
          onSubmitText={submitText}
          onSubmitPlacement={submitPlacement}
          onSkip={skip}
          onEnableMCQ={enableMCQ}
          onBack={handleHome}
          feedback={feedback}
          continent={selectedContinent}
        />
      )}

      {screen === 'result' && gameState && (
        <ResultScreen
          gameState={gameState}
          onRestart={handleRestart}
          onHome={handleHome}
        />
      )}
    </>
  );
}
