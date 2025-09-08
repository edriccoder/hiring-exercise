import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#0f172a', dark: '#0b1220' }}
      headerImage={
        <Image source={require('@/assets/images/overHead/group.png')} style={styles.heroImage} />
      }
    >
      <ThemedView style={styles.headerBlock}>
        <ThemedText type="title">Build. Stronger.</ThemedText>
        <ThemedText>{`Curated exercises with videos and clear cues.`}</ThemedText>
        <Pressable
          onPress={() => router.push('/(tabs)/exercises')}
          style={({ pressed }) => [styles.cta, pressed && { opacity: 0.9 }]}
        >
          <ThemedText type="defaultSemiBold">Browse Exercises</ThemedText>
        </Pressable>
      </ThemedView>

      <View style={styles.grid}>
        <Image source={require('@/assets/images/benchPress/bench1.png')} style={styles.gridItem} contentFit="contain" />
        <Image source={require('@/assets/images/lunges/backandfront1.png')} style={styles.gridItem} contentFit="contain" />
        <Image source={require('@/assets/images/barbellPush/barbell1.png')} style={styles.gridItem} contentFit="contain" />
        <Image source={require('@/assets/images/calfRaise/donkey1.png')} style={styles.gridItem} contentFit="contain" />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  heroImage: {
    height: 250,
    width: '100%',
    bottom: 0,
    position: 'absolute',
  },
  headerBlock: {
    gap: 12,
  },
  cta: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(80,160,220,0.25)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 6,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 12,
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 14,
    overflow: 'hidden',
  },
});
