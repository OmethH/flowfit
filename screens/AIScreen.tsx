import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AIScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Assistant 🤖</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#0f172a' },
  title: { fontSize: 24, color:'#fff', fontWeight:'700' }
});
