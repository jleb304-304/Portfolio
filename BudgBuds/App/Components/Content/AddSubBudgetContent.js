import React, { useState } from "react";
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Metrics } from '../../Themes';
import StyledTextInput from '../../Components/Common/StyledTextInput';
import DropDownPicker from 'react-native-dropdown-picker';
import AddButton from '../../Components/Buttons/AddButton';

export default function AddSubBudgetContent(props) {
  const { onSave, setModalVisible } = props;
  const subBudgetIndex = props.edit ? props.selectedSubBudget.index : -1;
  const subBudgetItem = props.edit ? props.selectedSubBudget.item : null;
  const [name_value, name_onChangeText] = useState(props.edit  ? subBudgetItem?.title : '');
  const [description_value, description_onChangeText] = useState(props.edit  ? subBudgetItem?.description : '');
  const [budgetTotal_value, budgetTotal_onChangeText] = useState(props.edit  ? subBudgetItem?.budget : '');
  const [selectedPeriodValue, setSelectedPeriodValue] = useState(props.edit  ? subBudgetItem?.selectedPeriodValue : "weekly");
  const expenses = props.edit ? subBudgetItem?.expenses : [];

  const onPressCancel = () => {
    setModalVisible(false);
  }

  const onPressSave = () => {
    if (props.edit) {
      const newSubBudget = {
        title: name_value,
        description: description_value,
        budget: budgetTotal_value,
        remaining: (Number.parseFloat(subBudgetItem.remaining) > Number.parseFloat(budgetTotal_value)) ? budgetTotal_value : subBudgetItem.remaining,
        selectedPeriodValue: selectedPeriodValue,
        expenses: expenses,
      }
      onSave(subBudgetIndex, newSubBudget);
    } else {
      const newSubBudget = {
        title: name_value,
        description: description_value,
        budget: budgetTotal_value,
        remaining: budgetTotal_value,
        selectedPeriodValue: selectedPeriodValue,
        expenses: expenses,
      }
      onSave(newSubBudget);
    }
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="NAME:"
          placeholder="Name of Sub Budget"
          value={name_value}
          onChangeText={name_onChangeText}
        />
      </View>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="DESCRIPTION:"
          placeholder="Description of Sub Budget"
          value={description_value}
          onChangeText={description_onChangeText}
        />
      </View>
      <View style={styles.inputRow}>
        <StyledTextInput
          label="BUDGET TOTAL: $"
          placeholder="Budget Total"
          value={budgetTotal_value}
          onChangeText={budgetTotal_onChangeText}
        />
        <DropDownPicker
          items={[
              {label: 'Weekly', value: 'weekly'},
              {label: 'Daily', value: 'daily'},
              {label: 'BiWeekly', value: 'biweekly'},
              {label: 'Monthly', value: 'monthly'},
          ]}
          defaultValue={selectedPeriodValue}
          containerStyle={{height: 40, width:130}}
          style={styles.inputDropdown}
          itemStyle={{
            backgroundColor: Colors.white,
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{
            backgroundColor: Colors.white,
          }}
          onChangeItem={(item) => setSelectedPeriodValue(item.value)}
        />
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
    marginVertical: 17,
    zIndex: 1,
  },
  textDropdown: {
    flex: 0,
    
  },
  inputDropdown: {
    backgroundColor: Colors.white,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    zIndex: 1,
  },
  buttonsRow: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 50,
    marginBottom: 15,
    zIndex: 0,
  },
});
