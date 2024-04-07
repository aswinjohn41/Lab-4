import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { collection, query, getDocs } from 'firebase/firestore';
import firestore from './firebase'; // Import Firestore instance

const SummaryComponent = () => {
  const [transactionsData, setTransactionsData] = useState([]);

  const fetchTransactions = async () => {
    try {
      const transactionsCollection = collection(firestore, 'transactions');
      const transactionsQuery = query(transactionsCollection);

      const snapshot = await getDocs(transactionsQuery);
      const transactions = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data && typeof data.amount === 'string') {
          // Ensure amount property exists and is a string before processing
          const amountValue = parseFloat(data.amount.replace('$', ''));
          if (!isNaN(amountValue)) {
            transactions.push({ id: doc.id, ...data });
          }
        }
      });

      setTransactionsData(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    // Fetch transactions on component mount
    fetchTransactions();
  }, []); // Run once on component mount

  // Use useFocusEffect to fetch transactions when component gains focus
  useFocusEffect(() => {
    fetchTransactions();
  });

  if (!transactionsData || !Array.isArray(transactionsData) || transactionsData.length === 0) {
    return <Text>No transactions data available.</Text>;
  }

  // Calculate summary data
  const totalTransactions = transactionsData.length;
  const highestTransaction = Math.max(...transactionsData.map((t) => t.amount));
  const lowestTransaction = Math.min(...transactionsData.map((t) => t.amount));
  const totalAmount = transactionsData.reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  return (
    <View style={{ padding: 16 }}>
      <Text>Total number of transactions: {totalTransactions}</Text>
      <Text>Highest transaction: ${highestTransaction}</Text>
      <Text>Lowest transaction: ${lowestTransaction}</Text>
      <Text>Total amount: ${totalAmount.toFixed(2)}</Text>
    </View>
  );
};

export default SummaryComponent;
