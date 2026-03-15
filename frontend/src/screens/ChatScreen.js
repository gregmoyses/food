import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

/**
 * Frontend chat scaffold.
 * Wire this to `/api/chat` after obtaining a user auth token.
 */
export default function ChatScreen() {
  const [message, setMessage] = useState('Give me a healthy vegetarian dinner idea.');
  const [reply, setReply] = useState('');

  async function handleSend() {
    // Placeholder until auth wiring is added to the UI.
    setReply('Try tofu stir fry with broccoli and brown rice for a protein-rich dinner.');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ask meal ideas</Text>
      <TextInput style={styles.input} value={message} onChangeText={setMessage} multiline />
      <Button title="Send" onPress={handleSend} />
      {reply ? <Text style={styles.reply}>{reply}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10 },
  label: { fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10, minHeight: 80 },
  reply: { backgroundColor: '#f1f5f9', padding: 10, borderRadius: 8 }
});
