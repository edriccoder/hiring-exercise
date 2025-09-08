import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { ThemedView } from './ThemedView';

export function SectionCard({ style, ...props }: ViewProps) {
  return <ThemedView style={[styles.card, style]} {...props} />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(120,120,140,0.25)',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
