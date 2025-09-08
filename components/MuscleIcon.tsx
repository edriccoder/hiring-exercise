import Back from '@/assets/images/icons/back.svg';
import Biceps from '@/assets/images/icons/biceps.svg';
import Calves from '@/assets/images/icons/calves.svg';
import Chest from '@/assets/images/icons/chest.svg';
import Forearms from '@/assets/images/icons/forearms.svg';
import Hamstrings from '@/assets/images/icons/hamstrings.svg';
import Hips from '@/assets/images/icons/hips.svg';
import Neck from '@/assets/images/icons/neck.svg';
import Quadriceps from '@/assets/images/icons/quadriceps.svg';
import Shoulders from '@/assets/images/icons/shoulders.svg';
import Triceps from '@/assets/images/icons/triceps.svg';
import UpperArms from '@/assets/images/icons/upperArms.svg';
import Waist from '@/assets/images/icons/waist.svg';
import type { MuscleKey } from '@/data/exercises';
import React from 'react';
import { View } from 'react-native';

const map: Record<MuscleKey, React.ComponentType<any>> = {
  chest: Chest,
  triceps: Triceps,
  shoulders: Shoulders,
  quadriceps: Quadriceps,
  hamstrings: Hamstrings,
  hips: Hips,
  calves: Calves,
  upperArms: UpperArms,
  waist: Waist,
  back: Back,
  biceps: Biceps,
  forearms: Forearms,
  neck: Neck,
};

export function MuscleIcon({ name, size = 24, color = '#888' }: { name: MuscleKey; size?: number; color?: string }) {
  const Cmp = map[name];
  if (!Cmp) return <View />;
  return <Cmp width={size} height={size} fill={color} />;
}
