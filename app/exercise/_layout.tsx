import { Stack } from 'expo-router';
import React from 'react';

export default function ExerciseStack() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[slug]" />
    </Stack>
  );
}
