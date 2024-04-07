import React, { createContext, useContext, useState } from 'react';

export const TransactionsContext = createContext();

export const TransactionContainer = ({ children }) => {
  const [transactionsData, setTransactionsData] = useState([
    { id: 1, name: 'Transaction 1', amount: '$100', date: '2024-03-25' },
    { id: 2, name: 'Transaction 2', amount: '$50', date: '2024-03-24' },
    // Add more transactions as needed
  ]);

  return (
    <TransactionsContext.Provider value={{ transactionsData, setTransactionsData }}>
      {children}
    </TransactionsContext.Provider>
  );
};
