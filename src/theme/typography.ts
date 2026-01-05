// Design Tokens - Typography
// Font: Inter (system fallback)

import { TextStyle } from 'react-native';

type TypographyStyle = Pick<TextStyle, 'fontSize' | 'fontWeight' | 'lineHeight'>;

export const typography: Record<string, TypographyStyle> = {
    screenTitle: {
        fontSize: 22,
        fontWeight: "600",
        lineHeight: 28,
    },
    question: {
        fontSize: 26,
        fontWeight: "700",
        lineHeight: 32,
    },
    button: {
        fontSize: 16,
        fontWeight: "500",
        lineHeight: 22,
    },
    body: {
        fontSize: 15,
        fontWeight: "400",
        lineHeight: 22,
    },
    caption: {
        fontSize: 13,
        fontWeight: "400",
        lineHeight: 18,
    },
    emoji: {
        fontSize: 64,
        fontWeight: "400",
        lineHeight: 72,
    },
    score: {
        fontSize: 18,
        fontWeight: "600",
        lineHeight: 24,
    },
};
