import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AI Meal & Grocery Assistant</Text>
      <Text style={styles.subtitle}>Plan meals, build shopping baskets, and chat for ideas.</Text>
      <Button title="Meal Planner" onPress={() => navigation.navigate('Meal Planner')} />
      <Button title="Shopping" onPress={() => navigation.navigate('Shopping')} />
      <Button title="Chat" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 12, padding: 24 },
  title: { fontSize: 24, fontWeight: '700' },
  subtitle: { color: '#475569' }
});
