import React from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        <Text style={styles.title}>FlowFit 🚀</Text>
        <Text style={styles.subtitle}>Your fitness journey starts here!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0f172a' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 34, fontWeight: '700', color: '#fff' },
  subtitle: { fontSize: 18, color: '#e6edf3', marginTop: 10, textAlign: 'center' }
});
