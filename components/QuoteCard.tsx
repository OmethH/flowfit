import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuoteCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.quote}>
        "Push yourself, because no one else is going to do it for you."
      </Text>
      <Text style={styles.author}>– FlowFit AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  quote: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#e2e8f0',
    textAlign: 'center',
  },
  author: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'right',
    marginTop: 8,
  },
});
