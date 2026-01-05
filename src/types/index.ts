// ==========================================
// Types principaux pour GeoApp
// ==========================================

// Continents disponibles
export type Continent = 
  | 'europe' 
  | 'asia' 
  | 'africa' 
  | 'north_america' 
  | 'south_america' 
  | 'oceania';

// Mode de jeu
export type GameMode = 
  | 'placement'      // Mode 1: Placer le pays sur la carte
  | 'capital'        // Mode 2: Trouver la capitale
  | 'combined'       // Mode 3: Drapeau → Pays → Carte → Capitale
  | 'progressive';   // Mode 4: Construction progressive

// Variante de mode
export type GameVariant = 
  | 'normal' 
  | 'daily'          // Défi quotidien
  | 'unlimited'      // Sans limite
  | 'expert';        // Mode expert

// État d'un pays sur la carte
export type CountryState = 
  | 'neutral'        // Non touché
  | 'correct'        // Bonne réponse (vert)
  | 'error'          // Mauvaise réponse (rouge)
  | 'validated';     // Validé définitivement (reste vert)

// Mode de réponse
export type AnswerMode = 'text' | 'mcq';

// Données d'un pays
export interface Country {
  id: string;              // Code ISO (ex: "FR")
  nameFr: string;          // Nom français
  nameEn: string;          // Nom anglais
  capital: string;         // Capitale
  continent: Continent;
  flagEmoji: string;       // 🇫🇷
  svgPath: string;         // Path SVG pour la carte
  difficulty: number;      // 1-10, basé sur stats globales
}

// Question en cours
export interface CurrentQuestion {
  country: Country;
  step: 'flag' | 'name' | 'placement' | 'capital';
  answerMode: AnswerMode;
  hintsUsed: string[];
  errorsCount: number;
  mcqOptions?: string[];   // Options QCM si mode QCM
  startTime: number;       // Timestamp début question
}

// État du jeu
export interface GameState {
  mode: GameMode;
  variant: GameVariant;
  countries: Country[];           // Pays à jouer
  currentIndex: number;           // Index question actuelle
  currentQuestion: CurrentQuestion | null;
  score: number;
  maxPossibleScore: number;
  correctAnswers: number;
  wrongAnswers: number;
  countryStates: Record<string, CountryState>;  // État visuel carte
  startTime: number;
  isPaused: boolean;
}

// Statistiques par pays pour un joueur
export interface CountryStats {
  countryId: string;
  totalAttempts: number;
  correctAttempts: number;
  averageTime: number;       // ms
  totalErrors: number;
  skipped: number;
  mcqUsed: number;
  hintsUsed: number;
  lastPlayed: number;        // Timestamp
}

// Stats globales joueur
export interface PlayerStats {
  totalGames: number;
  totalCorrect: number;
  totalWrong: number;
  averageScore: number;
  byContinent: Record<Continent, { correct: number; total: number }>;
  byCountry: Record<string, CountryStats>;
  streakDays: number;
  lastPlayedDate: string;
}

// Sauvegarde de partie
export interface SavedGame {
  gameState: GameState;
  savedAt: number;
}

// Configuration indices
export interface HintConfig {
  firstLetter: boolean;
  continent: boolean;
  region: boolean;
}

// Résultat d'une réponse
export interface AnswerResult {
  correct: boolean;
  points: number;
  maxPoints: number;
  timeTaken: number;
}
