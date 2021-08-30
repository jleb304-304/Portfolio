import React, {useState, useEffect} from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, Button, ScrollView, FlatList } from 'react-native';
import { material } from 'react-native-typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Colors, Metrics } from '../../Themes';
import AddButton from '../../Components/Buttons/AddButton';
import Header from '../../Components/Common/Header';
import Overlay from '../../Components/Common/Overlay';
import TopCard from '../../Components/Cards/TopCard'
import AddExpenseContent from '../../Components/Content/AddExpenseContent';
import AddSubBudgetContent from '../../Components/Content/AddSubBudgetContent';
import SubBudget from '../../Components/Cards/SubBudget'
import DeleteButton from '../../Components/Buttons/DeleteButton'
import EditButton from '../../Components/Buttons/EditButton'
import ConfirmDeleteModal from '../../Components/Cards/ConfirmDeleteModal'
import AddGroupContent from '../../Components/Content/AddGroupContent';
import {LinearGradient} from 'expo-linear-gradient'

export default function GroupScreen({ route, navigation }) {
  const [budgets, setBudgets] = useState([]);
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(0);
  const [subBudgets, setSubBudgets] = useState([]);
  const [addExpenseModalVisible, setAddExpenseModalVisible] = useState(false);
  const [addSubBudgetModalVisible, setAddSubBudgetModalVisible] = useState(false);
  const [editSubBudgetModalVisible, setEditSubBudgetModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editGroupModalVisible, setEditGroupModalVisible] = useState(false);
  const [selectedSubBudget, setSelectedSubBudget] = useState({});
  const { groupBudget } = route.params;

  const keyExtractor = (index) => {
    return index.toString();
  };

  const changeScreenSub = (item) => {
    navigation.navigate('SubBudget', {budget: budgets[selectedBudgetIndex], subBudget: item, editSubBudget: editSubBudget});
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
      }
    } catch (e) {
      console.error(e);
    }
  }

  const setBudgetsFromStorage = (budgets_string) => {
    let budgetList = JSON.parse(budgets_string);
    setBudgets(budgetList);
    let budgetIndex = budgetList.findIndex((budget) => {return budget.title === groupBudget.title});
    setSubBudgets(budgetList[budgetIndex].subBudgets);
    setSelectedBudgetIndex(budgetIndex);
  }

  useEffect(() => {
    readBudgets();
  }, [])

  const updateSubBudget = (newSubBudgets) => {
    let newBudgets = [...budgets];
    let selectedBudget = newBudgets[selectedBudgetIndex];
    selectedBudget.subBudgets = newSubBudgets;
    selectedBudget.budgetAmount = calculateBudgetAmount(newSubBudgets);
    selectedBudget.remaining = calculateRemaining(newSubBudgets);
    newBudgets.splice(selectedBudgetIndex, 1, selectedBudget);
    setSubBudgets(newSubBudgets);
    setBudgets(newBudgets);
    setStorage(newBudgets);
  };

  const addSubBudget = (newSubBudget) => {
    let newSubBudgets = [...subBudgets];
    newSubBudgets.push(newSubBudget);
    updateSubBudget(newSubBudgets);
  };

  const editSubBudget = (index, newSubBudget) => {
    let newSubBudgets = [...subBudgets];
    newSubBudgets.splice(index, 1, newSubBudget);
    updateSubBudget(newSubBudgets);
  };

  const deleteSubBudget = (index) => {
    let newSubBudgets = [...subBudgets];
    newSubBudgets.splice(index, 1);
    updateSubBudget(newSubBudgets);
  };

  const addExpense = (newExpense) => {
    let subBudgetAffected = newExpense.selectedSubBudget;
    let newSubBudgets = subBudgets.map((item) => {
      if (item.title.toLowerCase() === subBudgetAffected) {
        let remaining = Number.parseFloat(item.remaining) - Number.parseFloat(newExpense.expenseTotal)
        item.remaining = remaining.toString()
        let subBudgetExpenses = [];
        if (item.expenses !== undefined) {
          subBudgetExpenses = item.expenses;
        }
        subBudgetExpenses.push(newExpense);
        item.expenses = subBudgetExpenses;
      }
      return item;
    })
    updateSubBudget(newSubBudgets);
  };

  const calculateRemaining = (subBudgets) => {
    let totalRemaining = 0;
    subBudgets?.forEach(item => {
      totalRemaining += Number.parseFloat(item.remaining)
    })
    return totalRemaining
  }

  const calculateBudgetAmount = (subBudgets) => {
    let totalBudget = 0;
    subBudgets?.forEach(item => {
      totalBudget += Number.parseFloat(item.budget)
    })
    return totalBudget
  }

  const editBudget = (index, newBudget) => {
    let newBudgets = [...budgets];
    newBudgets.splice(index, 1, newBudget);
    updateBudgets(newBudgets);
  }

  const updateBudgets = (newBudgets) => {
    setBudgets(newBudgets);
    setStorage(newBudgets);
  }

  let totalRemaining = calculateRemaining(subBudgets);
  let totalBudget = calculateBudgetAmount(subBudgets);

  const renderSub = (budgetList) => {
    const item = budgetList.item;
    return (
      <View style={{width:'100%', flexDirection:'row'}} >
        <TouchableOpacity style={{flex:5}} onPress={() => changeScreenSub(budgetList)}>
          <SubBudget title={item.title} budget={item.budget} remaining={item.remaining}/>
        </TouchableOpacity>
        <View style={{flex:1}}>
          <View style={{flex:1}}>
            <EditButton
              onPress={() => {
                setSelectedSubBudget(budgetList)
                setEditSubBudgetModalVisible(true)
              }}
            />
          </View>
          <View style={{flex:1, justifyContent:'flex-end'}}>
            <DeleteButton onPress={() => {
              setSelectedSubBudget(budgetList)
              setConfirmDeleteVisible(true)
              }}/>
          </View>
        </View>
      </View>
      );
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <View style={styles.headerRow1}>
            <Header title={groupBudget.title.toUpperCase()} dropdown="timePeriod"/>
          </View>
          <View style={styles.headerRow2}>
            <TopCard disabled={subBudgets?.length === 0} remaining={totalRemaining} budget={totalBudget} buttonTitle="ADD EXPENSE" onPress={() => {setAddExpenseModalVisible(true)}} onPressSettings={() => {setEditGroupModalVisible(true)}}/>
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
            <View style={styles.subBudgetsHeader}>
              <View style={styles.subBudgetSpan}>
                <Text style={styles.budgetHeader}>SUB BUDGETS</Text>
                <AddButton onPress={() => {setAddSubBudgetModalVisible(true)}} title="ADD BUDGET"/>
              </View>
            </View>
            <View style={styles.subBudgetCards}>
              <FlatList
                data={subBudgets}
                renderItem={renderSub}
                keyExtractor={(item, index) => keyExtractor(index)}
              />
            </View>
          </View>
        </LinearGradient>
        </View>
      </View>
      <Overlay
        title={`ADD ${groupBudget.title.toUpperCase()} EXPENSE`}
        content={(<AddExpenseContent budget={budgets[selectedBudgetIndex]} subBudgets={subBudgets} onSave={addExpense} setModalVisible={setAddExpenseModalVisible}/>)}
        modalVisible={addExpenseModalVisible}
        setModalVisible={setAddExpenseModalVisible}
      />
      <Overlay
        title={`ADD ${groupBudget.title.toUpperCase()} SUB BUDGET`}
        content={(<AddSubBudgetContent onSave={addSubBudget} setModalVisible={setAddSubBudgetModalVisible}/>)}
        modalVisible={addSubBudgetModalVisible}
        setModalVisible={setAddSubBudgetModalVisible}
      />
      <Overlay
        title={`EDIT ${groupBudget.title.toUpperCase()} SUB BUDGET`}
        content={(<AddSubBudgetContent edit selectedSubBudget={selectedSubBudget} onSave={editSubBudget} setModalVisible={setEditSubBudgetModalVisible}/>)}
        modalVisible={editSubBudgetModalVisible}
        setModalVisible={setEditSubBudgetModalVisible}
      />
      <Overlay
        title="EDIT GROUP"
        content={(<AddGroupContent edit selectedBudget={groupBudget} selectedBudgetIndex={selectedBudgetIndex} onSave={editBudget} setModalVisible={setEditGroupModalVisible}/>)}
        modalVisible={editGroupModalVisible}
        setModalVisible={setEditGroupModalVisible}
      />
      <ConfirmDeleteModal
        modalVisible={confirmDeleteVisible}
        setModalVisible={setConfirmDeleteVisible}
        index={selectedSubBudget.index}
        deleteItem={deleteSubBudget}
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
    flex: 1.5,
    flexDirection: 'column',
    justifyContent: 'center',
    zIndex: 1,
    marginLeft: Metrics.screenWidth*0.03,
  },
  headerRow1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1,
  },
  headerRow2: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    zIndex: 0,

  },
  main: {
    flex: 4,
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
  },
  subBudgetsHeader: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 25,
    flex:1,
    zIndex: 0,
  },
  subBudgetSpan: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subBudgetCards: {
    width: '100%',
    flex: 8,
    paddingHorizontal: 20,
    paddingVertical: 25,
    zIndex: 0,
  },
  budgetHeader: {
    fontSize: Metrics.fontsize.L,
    color: Colors.black,
    fontFamily: "JosefinSans",
  }

});
