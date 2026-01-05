// ==========================================
// Composant saisie texte avec toggle QCM
// ==========================================

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface Props {
    onSubmit: (answer: string) => void;
    onSwitchToMCQ: () => void;
    onSkip: () => void;
    mcqDisabled?: boolean;
    placeholder?: string;
}

const TextInputComponent: React.FC<Props> = ({
    onSubmit,
    onSwitchToMCQ,
    onSkip,
    mcqDisabled = false,
    placeholder = 'Tape ta réponse...',
}) => {
    const [value, setValue] = useState('');

    const handleSubmit = () => {
        if (value.trim()) {
            onSubmit(value.trim());
            setValue('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={setValue}
                    placeholder={placeholder}
                    placeholderTextColor="#64748B"
                    autoCapitalize="words"
                    autoCorrect={false}
                    onSubmitEditing={handleSubmit}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitText}>✓</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.actionsRow}>
                {!mcqDisabled && (
                    <TouchableOpacity style={styles.actionButton} onPress={onSwitchToMCQ}>
                        <Text style={styles.actionText}>📝 QCM</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.actionButton, styles.skipButton]} onPress={onSkip}>
                    <Text style={styles.actionText}>⏭️ Passer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
    },
    inputRow: {
        flexDirection: 'row',
        gap: 12,
    },
    input: {
        flex: 1,
        backgroundColor: '#1E293B',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 18,
        color: '#F8FAFC',
        borderWidth: 2,
        borderColor: '#334155',
    },
    submitButton: {
        backgroundColor: '#22C55E',
        borderRadius: 12,
        width: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        fontSize: 24,
        color: '#FFF',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    actionButton: {
        flex: 1,
        backgroundColor: '#334155',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
    },
    skipButton: {
        backgroundColor: '#475569',
    },
    actionText: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default TextInputComponent;
