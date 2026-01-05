// ==========================================
// Composant QCM (4 options)
// ==========================================

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    options: string[];
    onSelect: (answer: string) => void;
    onSkip: () => void;
}

const MCQInput: React.FC<Props> = ({ options, onSelect, onSkip }) => {
    return (
        <View style={styles.container}>
            <View style={styles.optionsGrid}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.optionButton}
                        onPress={() => onSelect(option)}
                    >
                        <Text style={styles.optionLetter}>
                            {String.fromCharCode(65 + index)}
                        </Text>
                        <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.skipButton} onPress={onSkip}>
                <Text style={styles.skipText}>⏭️ Passer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    optionsGrid: {
        gap: 10,
    },
    optionButton: {
        backgroundColor: '#1E293B',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        borderWidth: 2,
        borderColor: '#334155',
    },
    optionLetter: {
        width: 32,
        height: 32,
        backgroundColor: '#3B82F6',
        borderRadius: 8,
        textAlign: 'center',
        lineHeight: 32,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    optionText: {
        flex: 1,
        fontSize: 17,
        color: '#F8FAFC',
    },
    skipButton: {
        backgroundColor: '#475569',
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: 'center',
    },
    skipText: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default MCQInput;
