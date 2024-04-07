import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import firestore from './firebase'; // Import Firestore instance

const TransactionList = () => {
  const [transactionsData, setTransactionsData] = useState([]);

  const fetchTransactions = async () => {
    try {
      const transactionsCollection = collection(firestore, 'transactions');
      const transactionsQuery = query(transactionsCollection);

      const snapshot = await getDocs(transactionsQuery);
      const transactions = [];

      snapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });

      setTransactionsData(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  // Use useFocusEffect to fetch transactions when component gains focus
  useFocusEffect(
    React.useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={transactionsData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionName}>{item.name}</Text>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
          </View>
        )}
        contentContainerStyle={styles.transactionList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  transactionList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionAmount: {
    fontSize: 16,
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default TransactionList;
