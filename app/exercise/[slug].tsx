import { MuscleIcon } from '@/components/MuscleIcon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { getExerciseBySlug } from '@/data/exercises';
import { useEvent } from 'expo';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView, type VideoPlayer, type VideoSource } from 'expo-video';
import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

export default function ExerciseDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const exercise = useMemo(() => (slug ? getExerciseBySlug(slug) : undefined), [slug]);
  const source: VideoSource | null = useMemo(
    () => (exercise ? { assetId: exercise.video } : null),
    [exercise]
  );
  const player = useVideoPlayer(source, (p: VideoPlayer) => {
    p.loop = true;
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const [overlayVisible, setOverlayVisible] = useState(true);
  // Keep overlay in sync with player state
  useEffect(() => {
    setOverlayVisible(!isPlaying);
  }, [isPlaying]);
  // Reset overlay when exercise changes
  useEffect(() => {
    setOverlayVisible(true);
  }, [slug]);

  if (!exercise) {
    return (
      <ThemedView style={styles.centered}> 
        <ThemedText>Exercise not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.heroWrap}>
          <Image source={exercise.image} style={styles.hero} contentFit="contain" />
          <View style={styles.heroOverlay} />
          <View style={styles.heroTopBar}>
            <Pressable onPress={() => router.back()} style={styles.circleBtn}>
              <ThemedText style={styles.circleBtnIcon}>{'‹'}</ThemedText>
            </Pressable>
            <Pressable style={styles.circleBtn}>
              <ThemedText style={styles.circleBtnIcon}>⋯</ThemedText>
            </Pressable>
          </View>
          <View style={styles.heroBottom}>
            <ThemedText type="title">{exercise.title}</ThemedText>
          </View>
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Muscles Worked</ThemedText>
          <View style={styles.pillsRow}>
            {exercise.primaryMuscles.map((m) => (
              <View style={[styles.pill, styles.pillPrimary]} key={`p-${m}`}>
                <MuscleIcon name={m as any} size={22} />
                <ThemedText style={styles.pillText}>{capitalize(m)}</ThemedText>
              </View>
            ))}
          </View>
          {exercise.secondaryMuscles.length > 0 && (
            <View style={styles.pillsRow}>
              {exercise.secondaryMuscles.map((m) => (
                <View style={[styles.pill, styles.pillSecondary]} key={`s-${m}`}>
                  <MuscleIcon name={m as any} size={20} />
                  <ThemedText style={styles.pillText}>{capitalize(m)}</ThemedText>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">How to Perform</ThemedText>
          {exercise.instructions.map((line, idx) => (
            <View style={styles.bulletRow} key={idx}>
              <View style={styles.bullet} />
              <ThemedText>{line}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <ThemedText type="subtitle">Watch the Video</ThemedText>
          <View style={styles.videoWrap}>
            <VideoView
              style={styles.video}
              player={player}
              nativeControls
              allowsFullscreen
              allowsPictureInPicture
              playsInline
              contentFit="contain"
              onFirstFrameRender={() => setOverlayVisible(false)}
            />
            {overlayVisible && (
              <Pressable
                style={styles.playFloating}
                onPress={() => {
                  player.play();
                  setOverlayVisible(false);
                }}
              >
                <ThemedText style={styles.playIcon}>▶</ThemedText>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  content: { padding: 16, paddingBottom: 48 },
  heroWrap: { position: 'relative', borderRadius: 18, overflow: 'hidden', backgroundColor: 'rgba(0,0,0,0.25)' },
  hero: { width: '100%', height: 320 },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
  heroTopBar: {
    position: 'absolute',
    top: 14,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circleBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnIcon: { color: '#fff', fontSize: 20, lineHeight: 20 },
  heroBottom: { position: 'absolute', bottom: 16, left: 16, right: 16 },
  section: { marginTop: 16, gap: 10 },
  pillsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillPrimary: { backgroundColor: 'rgba(80,160,220,0.2)' },
  pillSecondary: { backgroundColor: 'rgba(120,120,160,0.18)' },
  pillText: { fontSize: 13 },
  bulletRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(120,120,160,0.8)', marginTop: 8 },
  videoWrap: { position: 'relative' },
  video: { width: '100%', height: 260, borderRadius: 14, backgroundColor: 'black' },
  playFloating: {
    position: 'absolute',
    top: '40%',
    left: '45%',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(80,160,220,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: { color: '#fff', fontSize: 24, marginLeft: 3 },
});
