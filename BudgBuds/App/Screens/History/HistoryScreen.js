import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../../Themes';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import HistoryCard from '../../Components/Cards/HistoryCard';
import Header from '../../Components/Common/Header.js';

export default function HistoryScreen({navigation}) {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetValue, setSelectedBudgetValue] = useState("all");

  const historyData = [
    {
      month:"Feb",
      year:"2021",
      percent:[50,60,30,80],
    },
    {
      month:"Jan",
      year:"2021",
      percent:[80,60,70,40],
    },
    {
      month:"Dec",
      year:"2020",
      percent:[65,54,80,90],
    },
  ]

  const keyExtractor = (index) => {
    return index.toString();
  };

  const readBudgets = async () => {
    try {
      const storage_budgets = await AsyncStorage.getItem('budgets');
      if (storage_budgets !== null) {
        const parsedBudgets = storage_budgets;
        setBudgetsFromStorage(parsedBudgets);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const setBudgetsFromStorage = (budgets_string) => {
    let budgetList = JSON.parse(budgets_string);
    setBudgets(budgetList);
  }

  useEffect(() => {
    readBudgets();
  }, [])


  const renderHistory = ({item, index}) => {
    return (
      <View>
        <View>
          <HistoryCard
            month={item.month}
            year={item.year}
            percent={item.percent}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Header
          title="HISTORY"
          dropdown="budget"
          budgets={budgets}
          selectedBudgetValue={selectedBudgetValue}
          setSelectedBudgetValue={setSelectedBudgetValue}
        />
      </View>
      <View style={styles.historyContainer}>
        <FlatList
          data={historyData}
          renderItem={renderHistory}
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
