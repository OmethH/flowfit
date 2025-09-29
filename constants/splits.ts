export type Exercise = {
  name: string;
  sets: number;
  reps: number;
};

export type Split = {
  name: string;
  exercises: Exercise[];
};

export const SPLITS: Split[] = [
  {
    name: "PPL",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8 },
      { name: "Squat", sets: 4, reps: 10 },
      { name: "Pull Ups", sets: 3, reps: 12 },
    ],
  },
  {
    name: "UL",
    exercises: [
      { name: "Overhead Press", sets: 4, reps: 10 },
      { name: "Deadlift", sets: 3, reps: 6 },
      { name: "Barbell Row", sets: 3, reps: 10 },
    ],
  },
  {
    name: "PPL x UL",
    exercises: [
      { name: "Bench Press", sets: 4, reps: 8 },
      { name: "Squat", sets: 4, reps: 10 },
      { name: "Pull Ups", sets: 3, reps: 12 },
      { name: "Overhead Press", sets: 3, reps: 10 },
      { name: "Deadlift", sets: 3, reps: 6 },
    ],
  },
  {
    name: "Full Body",
    exercises: [
      { name: "Push Ups", sets: 3, reps: 15 },
      { name: "Bodyweight Squats", sets: 3, reps: 20 },
      { name: "Dumbbell Rows", sets: 3, reps: 12 },
      { name: "Plank", sets: 3, reps: 60 }, // seconds
    ],
  },
];
