import React, { createContext, useContext, useState } from 'react';
import { Split, Exercise } from '../constants/splits';

type SetEntry = {
  weight: string;
  reps: string;
};

type ExerciseWithSets = {
  name: string;
  sets: SetEntry[];
};

type WorkoutHistoryEntry = {
  splitName: string;
  exercises: ExerciseWithSets[];
  date: string;
};

type WorkoutContextType = {
  selectedSplit: Split | null;
  exercises: Exercise[];
  history: WorkoutHistoryEntry[];
  setSelectedSplit: (split: Split | null) => void;
  setExercises: (exercises: Exercise[]) => void;
  addToHistory: (entry: WorkoutHistoryEntry) => void;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedSplit, setSelectedSplit] = useState<Split | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);

  const addToHistory = (entry: WorkoutHistoryEntry) => {
    setHistory(prev => [...prev, entry]);
  };

  return (
    <WorkoutContext.Provider
      value={{
        selectedSplit,
        exercises,
        history,
        setSelectedSplit,
        setExercises,
        addToHistory,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) throw new Error('useWorkout must be used inside WorkoutProvider');
  return context;
};
