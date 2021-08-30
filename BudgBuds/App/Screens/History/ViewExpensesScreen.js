import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, AsyncStorage, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../../Themes';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import ExpenseHistoryCard from '../../Components/Cards/ExpenseHistoryCard';
import Header from '../../Components/Common/Header.js';

export default function ViewExpensesScreen({navigation}) {

const expensesData = [
  {
    name:"DOMINOS",
    date:"03/13/2021",
    people:["beyonce", "childish", "osaka"],
    amount: 50,
    budget: "Stanny Squad",
    subbudget: "Food"
  },
  {
    name:"SUBWAY",
    date:"03/15/2021",
    people:["childish", "federer"],
    amount: 20,
    budget: "Stanny Squad",
    subbudget: "Food"
  },
  {
    name:"DENNY'S",
    date:"03/14/2021",
    people:["osaka", "federer", "jim"],
    amount: 35,
    budget: "Stanny Squad",
    subbudget: "Food"
  },
]

expensesData.sort((a, b) => (a.date > b.date) ? -1 : 1)

const keyExtractor = (index) => {
  return index.toString();
};


const renderExpenses = ({item, index}) => {
  return (
    <View>
      <View>
        <ExpenseHistoryCard
          name={item.name}
          date={item.date}
          people={item.people}
          amount={item.amount}
          budget={item.budget}
          subbudget={item.subbudget}
        />
      </View>
    </View>
    );
}

return (
  <View style={styles.container}>
    <View style={styles.titleContainer}>
      <Header
        title="VIEW EXPENSES"
      />
    </View>
    <View style={styles.historyContainer}>
      <FlatList
        data={expensesData}
        renderItem={renderExpenses}
        keyExtractor={(item, index) => keyExtractor(index)}
      />
    </View>
  </View>
);
}
const styles = StyleSheet.create({
container: {
  height: Metrics.screenHeight,
  flex:1,
  backgroundColor: Colors.white,
  alignItems: 'center',
  justifyContent: 'center',
},
titleContainer: {
  flex:1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80%',
  zIndex: 1,
},
historyContainer: {
  flex:5,
  padding:Metrics.screenHeight*0.01,
  backgroundColor: Colors.bgBlue,
  alignItems: 'center'
},
});
