import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, active && styles.active, pressed && { opacity: 0.9 }]}>
      <ThemedText style={{ fontWeight: active ? '700' as const : '500' }}>{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(120,120,140,0.35)',
  },
  active: {
    backgroundColor: 'rgba(80,160,220,0.25)',
  },
});
