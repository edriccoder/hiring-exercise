import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';

export function PlayButton({ onPress, label = 'Play Video' }: { onPress?: () => void; label?: string }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.btn, pressed && { opacity: 0.85 }]}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(80,160,220,0.25)',
  },
});
