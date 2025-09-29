export type ExerciseItem = {
  name: string;
  defaultSets: number;
  defaultReps: number;
};

export const EXERCISES: ExerciseItem[] = [
  { name: "Bench Press", defaultSets: 4, defaultReps: 8 },
  { name: "Squat", defaultSets: 4, defaultReps: 10 },
  { name: "Deadlift", defaultSets: 3, defaultReps: 6 },
  { name: "Pull Ups", defaultSets: 3, defaultReps: 12 },
  { name: "Push Ups", defaultSets: 3, defaultReps: 15 },
  { name: "Dumbbell Rows", defaultSets: 3, defaultReps: 12 },
  { name: "Overhead Press", defaultSets: 4, defaultReps: 10 },
  { name: "Plank", defaultSets: 3, defaultReps: 60 },
  // add as many as you want
];
