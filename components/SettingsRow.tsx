import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';

export function SettingsRow({ label, value, onPress }: { label: string; value?: string; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.9 }]}>
      <ThemedText style={styles.label}>{label}</ThemedText>
      <View style={styles.right}>
        {value ? <ThemedText style={styles.value}>{value}</ThemedText> : null}
        <ThemedText style={styles.chev}>{'›'}</ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  label: { flex: 1, fontSize: 16 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  value: { opacity: 0.7 },
  chev: { fontSize: 22, color: '#8aa' },
});
