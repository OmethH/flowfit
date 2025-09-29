import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import QuoteCard from '../components/QuoteCard';

export default function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>FlowFit</Text>
        <Text style={styles.subtitle}>Your fitness journey starts here!</Text>

        {/* Motivational Quote Card */}
        <QuoteCard />

        {/* Start Workout Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Workouts")}>
          <Text style={styles.buttonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 34, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 18, color: '#e6edf3', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#38bdf8',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#0f172a' },
});
