import React from 'react';
import { View, Text } from 'react-native';

const TransactionDetails = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={{ padding: 16 }}>
      <Text>Name: {transaction.name}</Text>
      <Text>Amount: {transaction.amount}</Text>
      <Text>Date: {transaction.date}</Text>
      {/* Add more detailed information as needed */}
    </View>
  );
};

export default TransactionDetails;
