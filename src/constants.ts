// ==========================================
// Constantes du jeu
// ==========================================

// Points de base
export const SCORING = {
    TEXT_CORRECT: 100,        // Saisie libre correcte
    MCQ_CORRECT: 50,          // QCM correct
    PLACEMENT_CORRECT: 100,   // Placement carte correct

    // Pénalités
    ERROR_PENALTY: 20,        // Points perdus par erreur
    HINT_PENALTY: 15,         // Points perdus par indice

    // Bonus
    SPEED_BONUS_THRESHOLD: 5000,  // ms pour bonus vitesse
    SPEED_BONUS: 20,
} as const;

// Temps
export const TIMING = {
    QUESTION_TIMEOUT: 30000,  // 30s max par question (mode normal)
    FEEDBACK_DURATION: 1500,  // Durée feedback visuel
    ANIMATION_DURATION: 300,
} as const;

// Couleurs carte
export const MAP_COLORS = {
    neutral: '#E5E7EB',       // Gris clair
    correct: '#22C55E',       // Vert
    error: '#EF4444',         // Rouge
    validated: '#16A34A',     // Vert foncé
    hover: '#93C5FD',         // Bleu clair hover
    border: '#374151',        // Bordure
} as const;

// Storage keys
export const STORAGE_KEYS = {
    PLAYER_STATS: '@geoapp_player_stats',
    SAVED_GAME: '@geoapp_saved_game',
    SETTINGS: '@geoapp_settings',
    DAILY_CHALLENGE: '@geoapp_daily',
} as const;

// Nombre d'options QCM
export const MCQ_OPTIONS_COUNT = 4;
