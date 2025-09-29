import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert
} from 'react-native';
import { SPLITS, Split, Exercise } from '../constants/splits';
import { EXERCISES, ExerciseItem } from '../constants/exercises';
import { useWorkout } from '../context/WorkoutContext';
import { useNavigation } from '@react-navigation/native';

export default function WorkoutScreen() {
  const { selectedSplit, setSelectedSplit, exercises, setExercises } = useWorkout();
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const selectSplit = (split: Split) => {
    setSelectedSplit(split);
    setExercises(split.exercises);
  };

  const addExercise = (item: ExerciseItem) => {
    if (exercises.some(ex => ex.name === item.name)) {
      Alert.alert('Exercise already added!');
      return;
    }
    const newEx: Exercise = { name: item.name, sets: item.defaultSets, reps: item.defaultReps };
    setExercises([...exercises, newEx]);
  };

  const deleteExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, sets: number, reps: number) => {
    setExercises(exercises.map((ex, i) => (i === index ? { ...ex, sets, reps } : ex)));
  };

  const filteredExercises = EXERCISES.filter(ex =>
    ex.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Workout Split</Text>

      {/* Split Buttons */}
      <FlatList
        data={SPLITS}
        keyExtractor={item => item.name}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.splitButton, selectedSplit?.name === item.name && styles.splitButtonSelected]}
            onPress={() => selectSplit(item)}
          >
            <Text style={[styles.splitButtonText, selectedSplit?.name === item.name && styles.splitButtonTextSelected]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Exercises */}
      {selectedSplit && (
        <View style={styles.exercisesContainer}>
          <Text style={styles.subTitle}>{selectedSplit.name} Exercises:</Text>
          {exercises.map((ex, index) => (
            <View key={index} style={styles.exerciseRow}>
              <Text style={styles.exercise}>{ex.name} — {ex.sets} sets x {ex.reps} reps</Text>
              <View style={{ flexDirection: 'row' }}>
                <TextInput style={styles.inputSmall} keyboardType="numeric" value={ex.sets.toString()} onChangeText={val => updateExercise(index, parseInt(val), ex.reps)} />
                <TextInput style={styles.inputSmall} keyboardType="numeric" value={ex.reps.toString()} onChangeText={val => updateExercise(index, ex.sets, parseInt(val))} />
                <TouchableOpacity onPress={() => deleteExercise(index)}>
                  <Text style={styles.deleteText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Search & Add */}
          <TextInput
            style={styles.input}
            placeholder="Search Exercises"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={setSearchText}
          />
          <FlatList
            data={filteredExercises}
            keyExtractor={item => item.name}
            style={{ maxHeight: 150, marginTop: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.addExerciseButton} onPress={() => addExercise(item)}>
                <Text style={styles.addExerciseText}>➕ {item.name}</Text>
              </TouchableOpacity>
            )}
          />

          {/* Log Workout Button */}
          <TouchableOpacity
            style={styles.logButton}
            onPress={() => navigation.navigate('WorkoutLog' as never)}
          >
            <Text style={styles.logButtonText}>Log Workout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#fff', textAlign: 'center' },
  subTitle: { fontSize: 18, fontWeight: '600', color: '#e6edf3', marginBottom: 10 },
  splitButton: { backgroundColor: '#1e293b', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 20, marginHorizontal: 8 },
  splitButtonSelected: { backgroundColor: '#38bdf8' },
  splitButtonText: { color: '#fff', fontWeight: '600' },
  splitButtonTextSelected: { color: '#0f172a' },
  exercisesContainer: { marginTop: 20 },
  exerciseRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 4 },
  exercise: { color: '#cbd5e1', fontSize: 16, marginRight: 10 },
  deleteText: { color: '#f87171', fontSize: 18, marginLeft: 8 },
  input: { backgroundColor: '#1e293b', color: '#fff', padding: 10, borderRadius: 10, marginTop: 10 },
  inputSmall: { backgroundColor: '#1e293b', color: '#fff', padding: 6, width: 50, marginHorizontal: 4, borderRadius: 6, textAlign: 'center' },
  addExerciseButton: { backgroundColor: '#334155', padding: 8, borderRadius: 8, marginVertical: 2 },
  addExerciseText: { color: '#38bdf8', fontWeight: '600' },

  logButton: { backgroundColor: '#38bdf8', padding: 14, borderRadius: 12, marginTop: 20, alignItems: 'center' },
  logButtonText: { color: '#0f172a', fontSize: 16, fontWeight: '700' },
});
