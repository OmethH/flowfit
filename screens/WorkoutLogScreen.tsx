import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert
} from 'react-native';
import { useWorkout } from '../context/WorkoutContext';
import { EXERCISES } from '../constants/exercises';
import { useNavigation } from '@react-navigation/native';

type SetEntry = {
  weight: string;
  reps: string;
};

type ExerciseWithSets = {
  name: string;
  sets: SetEntry[];
};

export default function WorkoutLogScreen() {
  const { selectedSplit, exercises, addToHistory } = useWorkout();
  const [logExercises, setLogExercises] = useState<ExerciseWithSets[]>([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  // Load exercises from selected split
  useEffect(() => {
    if (selectedSplit) {
      setLogExercises(
        exercises.map(ex => ({
          name: ex.name,
          sets: [{ weight: '', reps: '' }],
        }))
      );
    }
  }, [selectedSplit, exercises]);

  // Add a new empty set for an exercise
  const addSet = (index: number) => {
    const updated = [...logExercises];
    updated[index].sets.push({ weight: '', reps: '' });
    setLogExercises(updated);
  };

  // Update weight/reps in a set
  const updateSet = (exIndex: number, setIndex: number, field: 'weight' | 'reps', value: string) => {
    const updated = [...logExercises];
    updated[exIndex].sets[setIndex][field] = value;
    setLogExercises(updated);
  };

  // Delete exercise
  const deleteExercise = (index: number) => {
    setLogExercises(logExercises.filter((_, i) => i !== index));
  };

  // Add new exercise from library
  const addExercise = (name: string) => {
    if (logExercises.some(ex => ex.name === name)) {
      Alert.alert('Exercise already added!');
      return;
    }
    setLogExercises([
      ...logExercises,
      { name, sets: [{ weight: '', reps: '' }] },
    ]);
  };

  // Filter library for search
  const filteredExercises = EXERCISES.filter(ex =>
    ex.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Save current log to history
  const saveLog = () => {
    if (!selectedSplit) return;
    if (logExercises.length === 0) {
      Alert.alert('Add at least one exercise before saving!');
      return;
    }
    addToHistory({
      splitName: selectedSplit.name,
      exercises: logExercises,
      date: new Date().toLocaleString(),
    });
    Alert.alert('Workout saved!');
  };

  return (
    <View style={styles.container}>
      {selectedSplit ? (
        <>
          <Text style={styles.title}>{selectedSplit.name} Log</Text>

          <FlatList
            data={logExercises}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View style={styles.exerciseBlock}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <TouchableOpacity onPress={() => deleteExercise(index)}>
                    <Text style={styles.deleteText}>🗑️</Text>
                  </TouchableOpacity>
                </View>

                {/* Sets for this exercise */}
                {item.sets.map((set, setIndex) => (
                  <View key={setIndex} style={styles.setRow}>
                    <Text style={styles.setLabel}>Set {setIndex + 1}:</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Weight"
                      placeholderTextColor="#888"
                      keyboardType="numeric"
                      value={set.weight}
                      onChangeText={val => updateSet(index, setIndex, 'weight', val)}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Reps"
                      placeholderTextColor="#888"
                      keyboardType="numeric"
                      value={set.reps}
                      onChangeText={val => updateSet(index, setIndex, 'reps', val)}
                    />
                  </View>
                ))}

                {/* Add new set button */}
                <TouchableOpacity style={styles.addSetButton} onPress={() => addSet(index)}>
                  <Text style={styles.addSetText}>➕ Add Set</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Search + Add Exercise */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search exercise to add"
            placeholderTextColor="#aaa"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredExercises}
            keyExtractor={item => item.name}
            style={{ maxHeight: 150 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.addExerciseButton} onPress={() => addExercise(item.name)}>
                <Text style={styles.addExerciseText}>➕ {item.name}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Save Log Button */}
          <TouchableOpacity style={styles.saveButton} onPress={saveLog}>
            <Text style={styles.saveButtonText}>💾 Save Workout</Text>
          </TouchableOpacity>

          {/* History Button */}
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate('History' as never)}
          >
            <Text style={styles.historyButtonText}>📜 View History</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.noSplit}>No split selected. Go back and choose one.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  title: { fontSize: 22, fontWeight: '700', color: '#38bdf8', marginBottom: 20, textAlign: 'center' },
  exerciseBlock: { backgroundColor: '#1e293b', borderRadius: 10, padding: 12, marginBottom: 15 },
  exerciseHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  exerciseName: { color: '#fff', fontSize: 16, fontWeight: '600' },
  deleteText: { fontSize: 18, color: '#f87171' },
  setRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  setLabel: { color: '#cbd5e1', marginRight: 8 },
  input: { backgroundColor: '#334155', color: '#fff', width: 70, textAlign: 'center', borderRadius: 6, marginHorizontal: 5, padding: 6 },
  addSetButton: { marginTop: 8, padding: 6, backgroundColor: '#334155', borderRadius: 6, alignItems: 'center' },
  addSetText: { color: '#38bdf8', fontWeight: '600' },
  searchInput: { backgroundColor: '#1e293b', color: '#fff', borderRadius: 8, padding: 10, marginVertical: 10 },
  addExerciseButton: { backgroundColor: '#334155', padding: 8, borderRadius: 8, marginVertical: 2 },
  addExerciseText: { color: '#38bdf8', fontWeight: '600' },
  saveButton: { backgroundColor: '#38bdf8', padding: 14, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  saveButtonText: { color: '#0f172a', fontSize: 16, fontWeight: '700' },
  historyButton: { backgroundColor: '#334155', padding: 14, borderRadius: 12, marginTop: 10, alignItems: 'center' },
  historyButtonText: { color: '#38bdf8', fontSize: 16, fontWeight: '700' },
  noSplit: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginTop: 50 },
});
