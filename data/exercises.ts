export type MuscleKey =
  | 'chest'
  | 'triceps'
  | 'shoulders'
  | 'quadriceps'
  | 'hamstrings'
  | 'hips'
  | 'calves'
  | 'upperArms'
  | 'waist'
  | 'back'
  | 'biceps'
  | 'forearms'
  | 'neck';

export type Exercise = {
  slug: string;
  title: string;
  avatar: any; // require()
  image: any; // require() group image
  video: any; // require() mp4
  primaryMuscles: MuscleKey[];
  secondaryMuscles: MuscleKey[];
  instructions: string[];
};

export const exercises: Exercise[] = [
  {
    slug: 'barbell-bench-press',
    title: 'Barbell Bench Press',
    avatar: require('@/assets/images/benchPress/bench1.png'),
    image: require('@/assets/images/benchPress/group.png'),
    video: require('@/assets/videos/benchPress.mp4'),
    primaryMuscles: ['chest'],
    secondaryMuscles: ['triceps', 'shoulders'],
    instructions: [
      'Lie flat on the bench with feet planted and back neutral.',
      'Grip the bar slightly wider than shoulder-width with wrists straight.',
      'Unrack and lower the bar to mid-chest with control, elbows ~45°.',
      'Press the bar up by driving through the floor and squeezing your chest.',
      'Lock out without overextending and keep your shoulder blades retracted.',
    ],
  },
  {
    slug: 'front-and-back-lunges',
    title: 'Front and Back Lunges',
    avatar: require('@/assets/images/lunges/backandfront1.png'),
    image: require('@/assets/images/lunges/group.png'),
    video: require('@/assets/videos/lunges.mp4'),
    primaryMuscles: ['quadriceps', 'hamstrings', 'hips'],
    secondaryMuscles: ['calves', 'waist'],
    instructions: [
      'Stand tall, brace your core, and keep your chest up.',
      'Step forward into a lunge: front knee over ankle, back knee down.',
      'Drive back to start, then step backward into a reverse lunge.',
      'Keep hips square and torso upright throughout.',
      'Alternate sides with smooth, controlled reps.',
    ],
  },
  {
    slug: 'barbell-push-and-press',
    title: 'Barbell Push and Press',
    avatar: require('@/assets/images/barbellPush/barbell1.png'),
    image: require('@/assets/images/barbellPush/group.png'),
    video: require('@/assets/videos/shoulderPress.mp4'),
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'waist'],
    instructions: [
      'Set barbell at shoulders, hands just outside shoulder-width.',
      'Dip slightly by bending knees and hips, torso vertical.',
      'Drive explosively through legs and press the bar overhead.',
      'Lock out with ribs down and head neutral; control back down.',
      'Reset brace and repeat with crisp dip-drive timing.',
    ],
  },
  {
    slug: 'overhead-shoulder-press',
    title: 'Overhead Shoulder Press',
    avatar: require('@/assets/images/overHead/overhead.png'),
    image: require('@/assets/images/overHead/group.png'),
    video: require('@/assets/videos/overheadPress.mp4'),
    primaryMuscles: ['shoulders'],
    secondaryMuscles: ['triceps', 'waist'],
    instructions: [
      'Stand tall with the bar at shoulder height, core tight and glutes squeezed.',
      'Press the bar straight up while moving your head slightly back, then through.',
      'Finish with the bar over midfoot, biceps by ears; avoid arching the low back.',
      'Lower with control to the start; keep wrists neutral.',
    ],
  },
  {
    slug: 'donkey-calf-raise',
    title: 'Donkey Calf Raise',
    avatar: require('@/assets/images/calfRaise/donkey1.png'),
    image: require('@/assets/images/calfRaise/group.png'),
    video: require('@/assets/videos/calfRaise.mp4'),
    primaryMuscles: ['calves'],
    secondaryMuscles: ['hamstrings'],
    instructions: [
      'Set up with hips hinged and torso supported as needed.',
      'Let heels drop for a full stretch at the bottom.',
      'Drive through the balls of your feet to raise heels high.',
      'Pause briefly at peak contraction; lower slowly.',
    ],
  },
];

export const getExerciseBySlug = (slug: string) =>
  exercises.find((e) => e.slug === slug);
