import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, Alert, TouchableOpacity, StyleSheet, Text, View, Image, Button, ScrollView, FlatList } from 'react-native';
import { material } from 'react-native-typography';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Colors, Metrics } from '../../Themes';
import { Entypo } from '@expo/vector-icons';
import AddButton from '../../Components/Buttons/AddButton';
import HomeTotalBudget from '../../Components/Home/HomeTotalBudget';
import HomePageBudget from '../../Components/Cards/HomePageBudgets';
import DeleteButton from '../../Components/Buttons/DeleteButton';
import EditButton from '../../Components/Buttons/EditButton'
import Header from '../../Components/Common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmDeleteModal from '../../Components/Cards/ConfirmDeleteModal'
import Overlay from '../../Components/Common/Overlay';
import AddGroupContent from '../../Components/Content/AddGroupContent';
import {LinearGradient} from 'expo-linear-gradient'


export default function HomeScreen({ navigation }) {

  const DATA = [
    {
      title: 'Individual',
      description: 'Individual budget',
      friends: [],
      subBudgets: [],
      budgetAmount: 0,
      remaining: 0,
    },
    {
      title: 'Stanny Squad',
      description: 'Stanny Squad budget',
      friends: ["beyonce", "federer", "keanu"],
      subBudgets: [
        {
          "title": "Food",
          "description": "Panda Express mostly",
          "budget": "110",
          "remaining": "110",
          "selectedPeriodValue": "weekly",
        },
      ],
      budgetAmount: 110,
      remaining: 110,
    },
    {
      title: 'Louisiana Legends',
      description: 'Louisiana Legends budget',
      friends: [],
      subBudgets: [
        {
          "title": "Food",
          "description": "Food and food",
          "budget": "50",
          "remaining": "45",
          "selectedPeriodValue": "weekly",
        },
        {
          "title": "Sports",
          "description": "Sports related expenses",
          "budget": "50",
          "remaining": "15",
          "selectedPeriodValue": "weekly",
        },
      ],
      budgetAmount: 100,
      remaining: 60,
    },
    {
      title: 'WestCoast',
      description: 'WestCoast budget',
      friends: [],
      subBudgets: [
        {
          "title": "Food",
          "description": "Things we eat",
          "budget": "30",
          "remaining": "30",
          "selectedPeriodValue": "weekly",
        },
      ],
      budgetAmount: 30,
      remaining: 30,
    }
  ];

  const [budgets, setBudgets] = useState(DATA);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState({});
  const [addGroupModalVisible, setAddGroupModalVisible] = useState(false);
  const [editGroupModalVisible, setEditGroupModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('refreshed')
      readBudgets();
    });
    return unsubscribe;
  }, [navigation]);

  const changeScreenAddGroup = () => {
    navigation.navigate('Start');
  }

  const changeScreenIndividual = () => {
    navigation.navigate('Individual');
  }
  const changeScreenGroup = (item) => {
    navigation.navigate('Group', {groupBudget: item});
  }

  const setStorage = async (newValue) => {
    try {
      await AsyncStorage.setItem('budgets', JSON.stringify(newValue) )
    } catch (e) {
      console.error(e)
    }
  }

  const readBudgets = async () => {
    try {
      const storage_budgets = await AsyncStorage.getItem('budgets');
      if (storage_budgets !== null) {
        const parsedBudgets = storage_budgets;
        setBudgetsFromStorage(parsedBudgets);
      } else {
        // Hard-coded (to add budget data)
        setStorage(budgets);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const setBudgetsFromStorage = (budgets_string) => {
    setBudgets(JSON.parse(budgets_string));
  }

  const updateBudgets = (newBudgets) => {
    setBudgets(newBudgets);
    setStorage(newBudgets);
  }

  const addBudget = (newBudget) => {
    let newBudgets = [...budgets];
    newBudgets.push(newBudget);
    updateBudgets(newBudgets);
  };

  const editBudget = (index, newBudget) => {
    let newBudgets = [...budgets];
    newBudgets.splice(index, 1, newBudget);
    updateBudgets(newBudgets);
  };

  const deleteBudget = (index) => {
    let newBudgets = [...budgets];
    newBudgets.splice(index, 1);
    updateBudgets(newBudgets);
  };

  const calculateBudgetAmount = (budgets) => {
    let totalBudget = 0;
    budgets?.forEach(item => {
      totalBudget += Number.parseFloat(item.budgetAmount)
    })
    return totalBudget
  }

  const totalBudget = calculateBudgetAmount(budgets);

  const individualBudgetIndex = budgets.findIndex((budget) => {return budget.title === 'Individual'});

  const renderList = (budgetList) => {
    if (budgetList.item.title !== 'Individual') {
      const item = budgetList.item;
      return (
        <View style={{width:'100%', flexDirection:'row'}} >
          <TouchableOpacity style={{flex:5}} onPress={() => changeScreenGroup(item)}>
            <HomePageBudget title={item.title} budget={item.budgetAmount} remaining={item.remaining}/>
          </TouchableOpacity>
          <View style={{flex:1}}>
              <View style={{flex:1}}>
                <EditButton
                  onPress={() => {
                    setSelectedBudget(budgetList)
                    setEditGroupModalVisible(true)
                  }}
                />
              </View>
              <View style={{flex:1, justifyContent:'flex-end'}}>
                <DeleteButton
                  onPress={() => {
                    setSelectedBudget(budgetList)
                    setConfirmDeleteVisible(true)
                  }}
                />
              </View>
            </View>
        </View>
      );
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.headerRow1}>
            <Header title="TOTAL BUDGET" dropdown="timePeriod"/>
          </View>
          <View style={styles.headerRow2}>
            <HomeTotalBudget amount={`$${totalBudget}`}/>
          </View>
        </View>
        <View style={styles.main}>
          <LinearGradient
          colors={[ "#BADBDE", "#AFD2E5"]}
          locations={[0, 0.7]}
          start={{ x: 0.1, y: 0.2 }}
          style={styles.container}
        >
          <View style={styles.mainScroll}>
            <View style={styles.individualCards}>
              <TouchableOpacity style={{flex:5}} onPress={changeScreenIndividual}>
                <HomePageBudget
                  title="Individual"
                  budget={budgets[individualBudgetIndex].budgetAmount}
                  remaining={budgets[individualBudgetIndex].remaining}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.budgetHeader2}>
              <View style={styles.groupSpan}>
                <Text style={styles.groupHeader}>GROUPS</Text>
                <AddButton onPress={() => {setAddGroupModalVisible(true)}} title="ADD GROUP"/>
              </View>
              <FlatList
                    data = {budgets}
                    renderItem = {renderList}
                    keyExtractor = {item => item.title}
                />
            </View>
          </View>
        </LinearGradient>
        </View>
      </View>
      <ConfirmDeleteModal
        modalVisible={confirmDeleteVisible}
        setModalVisible={setConfirmDeleteVisible}
        index={selectedBudget.index}
        deleteItem={deleteBudget}
      />
      <Overlay
        title="ADD GROUP"
        content={(<AddGroupContent onSave={addBudget} setModalVisible={setAddGroupModalVisible}/>)}
        modalVisible={addGroupModalVisible}
        setModalVisible={setAddGroupModalVisible}
      />
      <Overlay
        title="EDIT GROUP"
        content={(<AddGroupContent edit selectedBudget={selectedBudget.item} selectedBudgetIndex={selectedBudget.index} onSave={editBudget} setModalVisible={setEditGroupModalVisible}/>)}
        modalVisible={editGroupModalVisible}
        setModalVisible={setEditGroupModalVisible}
      />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRow: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerRow1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '80%',
    zIndex: 1,
  },
  headerRow2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    zIndex: 0,
  },
  main: {
    flex: 7,
    backgroundColor: Colors.bgBlue,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    zIndex: 0,
  },
  mainScroll: {
    width: '100%',
    height: '100%',
    flex: 4,
  },
  budgetHeader: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex:1,
    zIndex: 0,
  },
  budgetHeader2: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 10,
    flex:5,
    zIndex: 0,
    flexDirection:'column',

  },
  individualCards: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    flex:2,
    flexDirection:'row',
    zIndex: 0,
  },
  groupSpan: {
    height: '20%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupHeader:{
    fontSize: Metrics.fontsize.L,
    color: Colors.black,
    fontFamily: "JosefinSans"
  }
});
