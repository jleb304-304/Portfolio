import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Colors, Metrics, PeopleList } from '../../Themes';
import StyledTextInput from '../../Components/Common/StyledTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import AddButton from '../../Components/Buttons/AddButton';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddExpenseContent(props) {
  const { setModalVisible, budget, subBudgets, onSave } = props;
  const [expenses, setExpenses] = useState([]);
  const [name_value, name_onChangeText] = useState('');
  const [description_value, description_onChangeText] = useState('');
  const [expensetotal_value, expensetotal_onChangeText] = useState('');
  const [dateValue, setDateValue] = useState(new Date);
  const [selectedSubBudget, setSelectedSubBudget] = useState('');
  const [friend1_value, friend1_onChangeText] = useState(props.edit  ? budgetItem?.friends[0] : '');
  const [friend2_value, friend2_onChangeText] = useState(props.edit  ? budgetItem?.friends[1] : '');
  const [friend3_value, friend3_onChangeText] = useState(props.edit  ? budgetItem?.friends[2] : '');
  const [count, setCount] = useState(props.edit ? budgetItem.friends.length : 1);
  const people = PeopleList.users;

  const getFriendsList = () => {
    let friendsList = people.filter((item) => {
      let isInGroup = false;
      for (var i=0; i < budget.friends.length; i++) {
        if (item.value === budget.friends[i]) {
          isInGroup = true
        }
      }
      return isInGroup
    });

    return friendsList;
  }

  const friendsList = getFriendsList();

  const onPressCancel = () => {
    setModalVisible(false);
  }

  const setStorage = async (newValue) => {
    try {
      await AsyncStorage.setItem('expenses', JSON.stringify(newValue) )
    } catch (e) {
      console.error(e)
    }
  }

  const readExpenses = async () => {
    try {
      const storage_expenses = await AsyncStorage.getItem('expenses');
      if (storage_expenses !== null) {
        const parsedExpenses = storage_expenses;
        setExpensesFromStorage(parsedExpenses);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const setExpensesFromStorage = (expenses_string) => {
    let expensesList = JSON.parse(expenses_string);
    setExpenses(expensesList);
  }

  useEffect(() => {
    readExpenses();
  }, [])


  const addExpense = (newExpense) => {
    let newExpenses = [...expenses];
    newExpenses.push(newExpense);
    setExpenses(newExpenses);
    setStorage(newExpenses);
    // console.log(newExpenses);
  };

  const onPressSave = () => {
    const friendsList = [];
    if (friend1_value !== '') {
      friendsList.push(friend1_value)
    }
    if (friend2_value !== '') {
      friendsList.push(friend2_value)
    }
    if (friend3_value !== '') {
      friendsList.push(friend3_value)
    }
    const newExpense = {
      title: name_value,
      budgetTitle: budget.title,
      description: description_value,
      expenseTotal: expensetotal_value,
      date: dateValue.toDateString(),
      selectedSubBudget: selectedSubBudget,
      friends: friendsList,
    }
    addExpense(newExpense);
    onSave(newExpense);
    setModalVisible(false);
  }

  const subBudgetList = subBudgets.map((item) => {
    return {label: item.title, value: item.title.toLowerCase()}
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="NAME:"
          placeholder="Name of Expense"
          value={name_value}
          onChangeText={name_onChangeText}
        />
      </View>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="DESCRIPTION:"
          placeholder="Description of Expense"
          value={description_value}
          onChangeText={description_onChangeText}
        />
      </View>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="EXPENSE TOTAL: $"
          placeholder="Expense Total"
          value={expensetotal_value}
          onChangeText={expensetotal_onChangeText}
        />
      </View>
      <View style={styles.inputRow}>
        <View style={styles.dateContainer}>
          <Text style={styles.text}>DATE:</Text>
          <TouchableOpacity style={styles.input}>
            <DateTimePicker
              value={dateValue}
              mode="date"
              display="default"
              onChange={(e, d) => {
                setDateValue(d)
              }}
              style={{ backgroundColor: Colors.white}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.inputRow, {zIndex: 999}]}>
        <Text style={styles.textDropdown}>SUB BUDGET:</Text>
        <DropDownPicker
          items={subBudgetList}
          defaultValue={selectedSubBudget}
          containerStyle={{height: 40, flex: 1}}
          style={styles.inputDropdown}
          itemStyle={{
            backgroundColor: Colors.white,
            justifyContent: 'flex-start',
            marginLeft: 10,
            zIndex: 999,
            marginRight: 10,
          }}
          dropDownStyle={{
            backgroundColor: Colors.white,
            marginLeft: 10,
            zIndex: 999,
            marginRight: 10,
            width: Metrics.screenWidth*0.6,
          }}
          onChangeItem={(item) => setSelectedSubBudget(item.value)}
        />
      </View>
      {(budget.title !== 'Individual') && (
        <>
          <View style={styles.inputRow}>
            <Text>ADD FRIENDS: (Add by username)</Text>
          </View>
          <View style={[styles.inputRow, {zIndex: 1000}]}>
            <View style={styles.inputDropdownRow}>
              <DropDownPicker
                items={friendsList}
                defaultValue={friend1_value}
                containerStyle={{height: 40, flex: 1}}
                style={[styles.inputDropdown,  {zIndex: 990}]}
                itemStyle={{
                  zIndex: 990,
                  backgroundColor: Colors.white,
                  justifyContent: 'flex-start',

                }}
                dropDownStyle={{
                  backgroundColor: Colors.white,
                  zIndex: 990,
                  marginLeft: 10,
                  marginRight: 10,
                  width: Metrics.screenWidth*0.815,
                }}
                onChangeItem={(item) => friend1_onChangeText(item.value)}
              />
            </View>
          </View>
          {(count > 1) && (
            <View style={[styles.inputRow, {zIndex: 990}]}>
              <View style={styles.inputDropdownRow}>
                <DropDownPicker
                  items={friendsList}
                  defaultValue={friend2_value}
                  containerStyle={{height: 40, flex: 1}}
                  style={[styles.inputDropdown,  {zIndex: 990}]}
                  itemStyle={{
                    zIndex: 990,
                    backgroundColor: Colors.white,
                    justifyContent: 'flex-start',

                  }}
                  dropDownStyle={{
                    backgroundColor: Colors.white,
                    zIndex: 990,
                    marginLeft: 10,
                    marginRight: 10,
                    width: Metrics.screenWidth*0.815,
                  }}
                  onChangeItem={(item) => friend2_onChangeText(item.value)}
                />
              </View>
            </View>
          )}
          {(count > 2) && (
            <View style={[styles.inputRow, {zIndex: 980}]}>
              <View style={styles.inputDropdownRow }>
                <DropDownPicker
                  items={friendsList}
                  defaultValue={friend3_value}
                  containerStyle={{height: 40, flex: 1}}
                  style={[styles.inputDropdown,  {zIndex: 990}]}
                  itemStyle={{
                    zIndex: 980,
                    backgroundColor: Colors.white,
                    justifyContent: 'flex-start',

                  }}
                  dropDownStyle={{
                    backgroundColor: Colors.white,
                    zIndex: 980,
                    marginLeft: 10,
                    marginRight: 10,
                    width: Metrics.screenWidth*0.815,
                  }}
                  onChangeItem={(item) => friend3_onChangeText(item.value)}
                />
              </View>
            </View>
          )}
          <View style={{width:Metrics.screenWidth*0.8, alignItems: 'center', justifyContent: 'center'}}>
            <AddButton onPress={() => {setCount(count + 1)}} title="ADD MORE FRIENDS"/>
          </View>
        </>
      )}
      <View style={styles.buttonsRow}>
        <AddButton onPress={onPressCancel} title="CANCEL"/>
        <AddButton onPress={onPressSave} title="SAVE"/>
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
  inputRow: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 25,
    
  },
  inputDropdownRow: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 8,
    
  },
  textDropdown: {
    flex: 0,
  },
  inputDropdown: {
    backgroundColor: Colors.white,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonsRow: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  dateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    flex: 0,
  },
});
