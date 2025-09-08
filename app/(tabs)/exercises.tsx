import { MuscleIcon } from '@/components/MuscleIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { exercises } from '@/data/exercises';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, TextInput, View } from 'react-native';

const FILTERS = ['all', 'chest', 'shoulders', 'legs', 'arms'] as const;

export default function ExercisesScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('all');
  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exercises.filter((e) => {
      const inTitle = e.title.toLowerCase().includes(q);
      const matchFilter = filter === 'all' || e.primaryMuscles.includes(filter as any);
      return inTitle && matchFilter;
    });
  }, [query, filter]);
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>Exercises</ThemedText>
      <TextInput
        placeholder="Search exercises"
        placeholderTextColor="#8aa"
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />
      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[styles.filterChip, filter === f && styles.filterActive]}>
            <ThemedText style={[styles.filterText, filter === f && styles.filterTextActive]}>{f.toUpperCase()}</ThemedText>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/exercise/[slug]', params: { slug: item.slug } })}
            style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
          >
            <Image source={item.avatar} style={styles.avatar} contentFit="contain" />
            <View style={styles.cardBody}>
              <ThemedText type="defaultSemiBold" style={styles.title}>
                {item.title}
              </ThemedText>
              <View style={styles.musclesRow}>
        {item.primaryMuscles.slice(0, 3).map((m) => (
                  <View style={styles.musclePill} key={m}>
          <MuscleIcon name={m as any} size={20} />
                    <ThemedText style={styles.muscleText}>{m}</ThemedText>
                  </View>
                ))}
              </View>
      </View>
      <ThemedText style={styles.chevron}>{'›'}</ThemedText>
          </Pressable>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: { marginBottom: 10 },
  search: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(120,120,140,0.35)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#9ab',
    marginBottom: 10,
  },
  filters: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(120,120,140,0.35)',
  },
  filterActive: { backgroundColor: 'rgba(80,160,220,0.25)' },
  filterText: { fontSize: 12, color: '#8aa' },
  filterTextActive: { color: '#0aa' },
  list: { paddingBottom: 32 },
  card: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderRadius: 18,
    overflow: 'hidden',
  borderWidth: StyleSheet.hairlineWidth,
  borderColor: 'rgba(120,120,140,0.35)',
    marginBottom: 14,
  },
  avatar: { width: 96, height: 96 },
  cardBody: { flex: 1, padding: 14, justifyContent: 'center', gap: 6 },
  title: { fontSize: 17 },
  musclesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  musclePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(120,120,160,0.18)',
  },
  muscleText: { textTransform: 'capitalize', fontSize: 12 },
  chevron: { alignSelf: 'center', paddingHorizontal: 12, fontSize: 26, color: '#8aa' },
});
