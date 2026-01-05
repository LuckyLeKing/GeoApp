// ==========================================
// Service de stockage (AsyncStorage wrapper)
// ==========================================

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants';
import { PlayerStats, SavedGame } from '../types';

// Initialiser les stats vides
const getEmptyStats = (): PlayerStats => ({
    totalGames: 0,
    totalCorrect: 0,
    totalWrong: 0,
    averageScore: 0,
    byContinent: {
        europe: { correct: 0, total: 0 },
        asia: { correct: 0, total: 0 },
        africa: { correct: 0, total: 0 },
        north_america: { correct: 0, total: 0 },
        south_america: { correct: 0, total: 0 },
        oceania: { correct: 0, total: 0 },
    },
    byCountry: {},
    streakDays: 0,
    lastPlayedDate: '',
});

// ===== Stats joueur =====

export const getPlayerStats = async (): Promise<PlayerStats> => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEYS.PLAYER_STATS);
        if (json) {
            return JSON.parse(json);
        }
        return getEmptyStats();
    } catch (error) {
        console.error('Error loading stats:', error);
        return getEmptyStats();
    }
};

export const savePlayerStats = async (stats: PlayerStats): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.PLAYER_STATS, JSON.stringify(stats));
    } catch (error) {
        console.error('Error saving stats:', error);
    }
};

// ===== Sauvegarde partie =====

export const getSavedGame = async (): Promise<SavedGame | null> => {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEYS.SAVED_GAME);
        if (json) {
            return JSON.parse(json);
        }
        return null;
    } catch (error) {
        console.error('Error loading saved game:', error);
        return null;
    }
};

export const saveGame = async (game: SavedGame): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.SAVED_GAME, JSON.stringify(game));
    } catch (error) {
        console.error('Error saving game:', error);
    }
};

export const clearSavedGame = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEYS.SAVED_GAME);
    } catch (error) {
        console.error('Error clearing saved game:', error);
    }
};

// ===== Daily challenge =====

export const getDailyChallengeSeed = (): string => {
    const today = new Date();
    return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
};

export const hasDoneDailyChallenge = async (): Promise<boolean> => {
    try {
        const lastDaily = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE);
        return lastDaily === getDailyChallengeSeed();
    } catch {
        return false;
    }
};

export const markDailyChallengeComplete = async (): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, getDailyChallengeSeed());
    } catch (error) {
        console.error('Error marking daily complete:', error);
    }
};
