import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Metrics, Images } from '../../Themes';
import SpendingHistoryCard from '../../Components/Cards/SpendingHistoryCard';
import Header from '../../Components/Common/Header';

export default function SpendingHistoryContent(props) {
  const { budget, subBudget } = props;
  const keyExtractor = (index) => {
    return index.toString();
  };

  const expenseList = subBudget.item.expenses;

  const renderSub = (expense) => {
    console.log("EXPENSE LIST");
    console.log(expense);
    return (
      <SpendingHistoryCard
        expenseTitle={expense.item.title}
        friends={expense.item.friends}
        date={expense.item.date}
        amount={`$${expense.item.expenseTotal}`}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Header title={subBudget.title} dropdown="timePeriod"/>
      </View>
      <View style={styles.main}>
        <View style={styles.mainScroll}>
          <FlatList
            data={expenseList}
            renderItem={renderSub}
            keyExtractor={(item, index) => keyExtractor(index)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%'
  },
  headerRow: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 25,
    zIndex: 1,
  },
  main: {
    flex: 0,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  mainScroll: {
    width: '100%',
    height: '100%',
  },
});
