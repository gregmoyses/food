import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import apiClient from '../services/apiClient';

export default function MealPlannerScreen() {
  const [calories, setCalories] = useState('1800');
  const [protein, setProtein] = useState('100');
  const [restriction, setRestriction] = useState('vegetarian');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  async function generatePlan() {
    try {
      setError('');
      const result = await apiClient.post('/meals/plan', {
        calories: Number(calories),
        protein: Number(protein),
        dietaryRestrictions: restriction ? [restriction] : [],
        healthyOnly: true
      });
      setResponse(result.data);
    } catch (apiError) {
      setError(apiError.message);
      setResponse(null);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Calories/day</Text>
      <TextInput style={styles.input} value={calories} onChangeText={setCalories} keyboardType="numeric" />
      <Text style={styles.label}>Protein (g/day)</Text>
      <TextInput style={styles.input} value={protein} onChangeText={setProtein} keyboardType="numeric" />
      <Text style={styles.label}>Restriction (e.g. vegetarian)</Text>
      <TextInput style={styles.input} value={restriction} onChangeText={setRestriction} />

      <Button title="Generate Meal Plan" onPress={generatePlan} />

      {error ? <Text style={styles.error}>Error: {error}</Text> : null}

      {response && (
        <View style={styles.card}>
          <Text style={styles.heading}>Meals</Text>
          {response.meals.map((meal, idx) => (
            <Text key={`${meal.name}-${idx}`}>• {meal.name}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 8 },
  label: { fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 8 },
  card: { marginTop: 12, padding: 12, backgroundColor: '#f8fafc', borderRadius: 8 },
  heading: { fontWeight: '700', marginBottom: 8 },
  error: { color: '#b91c1c', marginTop: 8 }
});
