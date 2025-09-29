import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useWorkout } from '../context/WorkoutContext';

export default function WorkoutHistoryScreen() {
  const { history } = useWorkout();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout History</Text>

      {history.length === 0 ? (
        <Text style={styles.noHistory}>No workouts logged yet.</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.splitName}>{item.splitName}</Text>

              {item.exercises.map((ex, i) => (
                <View key={i} style={styles.exerciseBlock}>
                  <Text style={styles.exerciseName}>{ex.name}</Text>
                  {ex.sets.map((set, j) => (
                    <Text key={j} style={styles.setText}>
                      Set {j + 1}: {set.weight || '—'} kg × {set.reps || '—'} reps
                    </Text>
                  ))}
                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#38bdf8', marginBottom: 20, textAlign: 'center' },
  noHistory: { fontSize: 16, color: '#94a3b8', textAlign: 'center', marginTop: 50 },
  historyCard: { backgroundColor: '#1e293b', borderRadius: 12, padding: 15, marginBottom: 15 },
  date: { color: '#94a3b8', fontSize: 12, marginBottom: 5 },
  splitName: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 10 },
  exerciseBlock: { marginBottom: 10 },
  exerciseName: { color: '#38bdf8', fontSize: 16, fontWeight: '600' },
  setText: { color: '#cbd5e1', fontSize: 14, marginLeft: 10 },
});
