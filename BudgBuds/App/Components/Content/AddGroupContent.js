import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics, PeopleList } from '../../Themes';
import StyledTextInput from '../../Components/Common/StyledTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import AddButton from '../../Components/Buttons/AddButton';

export default function AddGroupContent(props) {
  const { onSave, setModalVisible } = props;
  const budgetIndex = props.edit ? props.selectedBudgetIndex : -1;
  const budgetItem = props.edit ? props.selectedBudget : null;
  const [name_value, name_onChangeText] = useState(props.edit  ? budgetItem?.title : '');
  const [description_value, description_onChangeText] = useState(props.edit  ? budgetItem?.description : '');
  const [friend1_value, friend1_onChangeText] = useState(props.edit  ? budgetItem?.friends[0] : '');
  const [friend2_value, friend2_onChangeText] = useState(props.edit  ? budgetItem?.friends[1] : '');
  const [friend3_value, friend3_onChangeText] = useState(props.edit  ? budgetItem?.friends[2] : '');
  const [count, setCount] = useState(props.edit ? budgetItem.friends.length : 1);
  const people = PeopleList.users;

  {console.log(PeopleList)}

  const onPressCancel = () => {
    setModalVisible(false);
  }

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
    if (props.edit) {
      const newBudget = {
        title: name_value,
        description: description_value,
        friends: friendsList,
        subBudgets: budgetItem.subBudgets,
        budgetAmount: budgetItem.budgetAmount,
        remaining: budgetItem.remaining,
      }
      onSave(budgetIndex, newBudget);
    } else {
      const newBudget = {
        title: name_value,
        description: description_value,
        friends: friendsList,
        subBudgets: [],
        budgetAmount: 0,
        remaining: 0,
      }
      onSave(newBudget);
    }
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="NAME:"
          placeholder="Name of Group Budget"
          value={name_value}
          onChangeText={name_onChangeText}
        />
      </View>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="DESCRIPTION:"
          placeholder="Description of Group Budget"
          value={description_value}
          onChangeText={description_onChangeText}
        />
      </View>
      <View style={styles.inputRow}>
        <Text>ADD FRIENDS: (Add by username)</Text>
      </View>
      <View style={[styles.inputRow, {zIndex: 1000}]}>
        <View style={styles.inputDropdownRow}>
          <DropDownPicker
            items={people}
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
              items={people}
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
              items={people}
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
    marginBottom: 15,
    zIndex: 1,
  },
  textDropdown: {
    flex: 0,
  },
  inputDropdownRow: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    marginBottom: 8,
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
    marginTop: 15,
    marginBottom: 15,
    zIndex: 0,
  },
});
