import React, {useState, useEffect} from "react";
import { TouchableOpacity, StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Colors, Metrics, Images } from '../../Themes';
import Header from '../../Components/Common/Header';
import Overlay from '../../Components/Common/Overlay';
import Card from '../../Components/Cards/CommonCard';
import AddSubBudgetContent from '../../Components/Content/AddSubBudgetContent';
import ExpenseBreakupContent from '../../Components/Content/ExpenseBreakupContent';
import SpendingHistoryContent from '../../Components/Content/SpendingHistoryContent';
import {LinearGradient} from 'expo-linear-gradient'

export default function SubBudgetScreen({ route, navigation }) {
  const { budget, subBudget, editSubBudget } = route.params;
  const [expenseBreakdownModalVisible, setExpenseBreakdownModalVisible] = useState(false);
  const [spendingHistoryModalVisible, setSpendingHistoryModalVisible] = useState(false);
  const [editSubBudgetModalVisible, setEditSubBudgetModalVisible] = useState(false);

  const breakdownModalVisible = (vis) => {
    if(subBudget.item.expenses != undefined && subBudget.item.expenses.length>0) {
      setExpenseBreakdownModalVisible(vis);
    }
    else {
      Alert.alert(
        "No Expenses Yet",
        "Spend some money to use this feature",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  const historyModalVisible = (vis) => {
    if(subBudget.item.expenses != undefined && subBudget.item.expenses.length>0) {
      setSpendingHistoryModalVisible(vis);
    }
    else {
      Alert.alert(
        "No Expenses Yet",
        "Spend some money to use this feature",
        [
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );
    }
  }

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <Header title={budget.title}/>
        </View>
        <View style={styles.main}>
          <LinearGradient
          colors={[ "#BADBDE", "#AFD2E5"]}
          locations={[0, 0.7]}
          start={{ x: 0.1, y: 0.2 }}
          style={styles.container}
        >
          <View style={styles.mainScroll}>
            <Text style={styles.subBudgetsHeader}>{subBudget.title}</Text>
            <View style={styles.subBudgetCards}>
              {(budget.title !== "Individual") && (
                <Card
                  disabled={subBudget.item.expenses == undefined}
                  title="GROUP'S SPENDING"
                  image={require('../../../assets/pie-chart.png')}
                  onPress={() => breakdownModalVisible(true)}
                />
              )}
              <Card
                disabled={subBudget.item.expenses == undefined}
                title="SPENDING HISTORY"
                image={require('../../../assets/clock.png')}
                onPress={() => historyModalVisible(true)}
              />
              <Card
                title="ADJUST BUDGET"
                image={require('../../../assets/credit-card.png')}
                onPress={() => setEditSubBudgetModalVisible(true)}
              />
            </View>
          </View>
          </LinearGradient>
        </View>
      </View>
      <Overlay
        title={`${budget.title.toUpperCase()} GROUP'S SPENDING`}
        content={<ExpenseBreakupContent budget={budget} subBudget={subBudget}/>}
        modalVisible={expenseBreakdownModalVisible}
        setModalVisible={breakdownModalVisible}
      />
      <Overlay
        title={`${budget.title.toUpperCase()} SPENDING HISTORY`}
        content={<SpendingHistoryContent budget={budget} subBudget={subBudget}/>}
        modalVisible={spendingHistoryModalVisible}
        setModalVisible={historyModalVisible}
      />
      <Overlay
        title={`EDIT ${budget.title.toUpperCase()} SUB BUDGET`}
        content={<AddSubBudgetContent edit selectedSubBudget={subBudget} onSave={editSubBudget} setModalVisible={setEditSubBudgetModalVisible}/>}
        modalVisible={editSubBudgetModalVisible}
        setModalVisible={setEditSubBudgetModalVisible}
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '80%',
    zIndex: 1,

  },
  main: {
    flex: 6,
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
    paddingVertical: Metrics.screenHeight*0.05,
    zIndex: 0,
  },
  subBudgetsHeader: {
    fontSize: Metrics.fontsize.L,
    paddingHorizontal: 20,
    paddingTop: 25,
    width: '100%',
  }

});
