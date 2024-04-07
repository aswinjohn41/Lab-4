import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TransactionContainer } from './Components/Transaction';
import TransactionList from './Components/TransactionList';
import TransactionForm from './Components/TransactionForm';
import SummaryComponent from './Components/SummaryComponent';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TransactionContainer>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen
            name="Transactions"
            component={TransactionList}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="document-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="TransactionForm"
            component={TransactionForm}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="add-circle-outline" size={size} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="Summary"
            component={SummaryComponent}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="information-outline" size={size} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TransactionContainer>
  );
}
