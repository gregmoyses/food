import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import apiClient from '../services/apiClient';

export default function ShoppingScreen() {
  const [inputText, setInputText] = useState('Shopping list: milk, eggs, spinach');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  async function parseShopping() {
    try {
      setError('');
      const response = await apiClient.post('/shopping/parse', { inputText });
      setItems(response.data.items);
    } catch (apiError) {
      setError(apiError.message);
      setItems([]);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Text or voice transcript</Text>
      <TextInput style={styles.input} value={inputText} onChangeText={setInputText} multiline />
      <Button title="Parse List" onPress={parseShopping} />
      {error ? <Text style={styles.error}>Error: {error}</Text> : null}
      {items.map((item, index) => (
        <Text key={`${item.name}-${index}`}>• {item.name}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10 },
  label: { fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10, minHeight: 80 },
  error: { color: '#b91c1c' }
});
