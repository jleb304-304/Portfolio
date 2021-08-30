import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { Colors, Metrics, Images } from '../../Themes';
import ExpenseBreakupCard from '../../Components/Cards/ExpenseBreakupCard';
import Header from '../../Components/Common/Header';

export default function ExpenseBreakupContent(props) {
  const { budget, subBudget } = props;

  const keyExtractor = (index) => {
    return index.toString();
  };

  const expenseList = subBudget.item.expenses;

  const getFriendsExpenseList = () => {
    let friendsExpenseList = budget.friends.map((item) => {
      let friendsExpense = {
        name: item,
        amount: 0,
      }
      return friendsExpense;
    });

    friendsExpenseList = friendsExpenseList.filter((item) => {
      return item.name !== null;
    })

    expenseList.forEach((item) => {
      for (var i = 0; i < item.friends.length; i++){
        for (var j = 0; j < friendsExpenseList.length; j++)  {
          if (friendsExpenseList[j].name === item.friends[i]) {
            friendsExpenseList[j].amount += parseFloat(item.expenseTotal);
          }
        }
      }
    })
    return friendsExpenseList;
  }

  const friendsExpenseList = getFriendsExpenseList();


  const renderSub = (friendsExpenseList) => {
    return (
      <ExpenseBreakupCard name={friendsExpenseList.item.name} amount={`Spent: $${friendsExpenseList.item.amount}`}/>
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
            data={friendsExpenseList}
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
