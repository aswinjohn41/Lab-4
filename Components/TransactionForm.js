import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

// Import Firestore methods
import { collection, addDoc } from 'firebase/firestore';
import firestore from './firebase'; // Import Firestore instance

const TransactionForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleAddTransaction = async () => {
    try {
      const transactionsCollection = collection(firestore, 'transactions');

      await addDoc(transactionsCollection, { name, amount, date });

      // Reset form fields after adding transaction
      setName('');
      setAmount('');
      setDate('');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Transaction Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <Button title="Add Transaction" onPress={handleAddTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TransactionForm;
