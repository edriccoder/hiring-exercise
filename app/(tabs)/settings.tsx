import { Chip } from '@/components/Chip';
import { SectionCard } from '@/components/SectionCard';
import { SettingsRow } from '@/components/SettingsRow';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemePreference } from '@/context/ThemePreference';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function SettingsScreen() {
  const { mode, setMode, effectiveScheme } = useThemePreference();

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <ThemedText type="title">Settings</ThemedText>
        </View>

        <SectionCard style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image source={require('@/assets/images/overHead/overhead.png')} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <ThemedText type="defaultSemiBold">Welcome back</ThemedText>
            <ThemedText style={{ opacity: 0.7 }}>Customize your experience</ThemedText>
          </View>
        </SectionCard>

        <SectionCard>
          <ThemedText type="subtitle" style={{ marginBottom: 10 }}>Appearance</ThemedText>
          <View style={styles.row}>
            <Chip label="System" active={mode === 'system'} onPress={() => setMode('system')} />
            <Chip label="Light" active={mode === 'light'} onPress={() => setMode('light')} />
            <Chip label="Dark" active={mode === 'dark'} onPress={() => setMode('dark')} />
          </View>
          <ThemedText style={{ marginTop: 8, opacity: 0.7 }}>Current: {effectiveScheme}</ThemedText>
        </SectionCard>

        <SectionCard>
          <ThemedText type="subtitle" style={{ marginBottom: 6 }}>App</ThemedText>
          <SettingsRow label="Notifications" value="On" />
          <SettingsRow label="Download over Wi‑Fi only" value="On" />
          <SettingsRow label="Units" value="Metric" />
        </SectionCard>

        <SectionCard>
          <ThemedText type="subtitle" style={{ marginBottom: 6 }}>About</ThemedText>
          <SettingsRow label="Terms of Service" />
          <SettingsRow label="Privacy Policy" />
          <SettingsRow label="App Version" value="1.0.0" />
        </SectionCard>

        <SectionCard style={{ alignItems: 'center', gap: 8 }}>
          <ThemedText type="defaultSemiBold">Have feedback?</ThemedText>
          <ThemedText style={{ opacity: 0.7, textAlign: 'center' }}>Tell us how we can improve your workout experience.</ThemedText>
        </SectionCard>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 14, paddingBottom: 32 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  row: { flexDirection: 'row', gap: 10 },
  avatar: { width: 54, height: 54 },
});
