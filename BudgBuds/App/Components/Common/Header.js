import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Colors, Metrics } from '../../Themes';

export default function Header(props) {
  const { title, dropdown, budgets, selectedBudgetValue, setSelectedBudgetValue } = props;
  const [selectedPeriodValue, setSelectedPeriodValue] = useState("weekly");
  
  const budgetList = (budgets) ? budgets.map((item) => {
    return {label: item.title, value: item.title.toLowerCase()}
  }) : [];
  budgetList.push({label: "All", value: "all"})
  
  return (
    <View style={dropdown ? styles.container : styles.containerTitleOnly}>
      <Text style={styles.title}>{title}</Text>
      {dropdown === "timePeriod" && (
        <DropDownPicker
          items={[
            { label: "Weekly", value: "weekly" },
            { label: "Daily", value: "daily" },
            { label: "BiWeekly", value: "biweekly" },
            { label: "Monthly", value: "monthly" },
          ]}
          defaultValue={selectedPeriodValue}
          containerStyle={{ height: 50, width: 150 }}
          style={{
            backgroundColor: Colors.white,
            color: Colors.black,
            
          }}
          itemStyle={{
            backgroundColor: Colors.white,
            justifyContent: "flex-start",
          }}
          dropDownStyle={{
            backgroundColor: Colors.white,
            
          }}
          onChangeItem={(item) => setSelectedPeriodValue(item.value)}
        />
      )}
      {dropdown === "budget" && budgetList!== [] && (
        <DropDownPicker
          
          items={budgetList}
          defaultValue={selectedBudgetValue}
          containerStyle={{ height: 50, width: 150 }}
          style={{ backgroundColor: Colors.white }}
          itemStyle={{
            justifyContent: "flex-start",
          }}
          dropDownStyle={{ backgroundColor: Colors.white}}
          onChangeItem={(item) => setSelectedBudgetValue(item.value)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    color: Colors.black,
  },
  containerTitleOnly: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    fontFamily: "JosefinSans",
    color: Colors.black,
  },
  title: {
    fontFamily: "JosefinSans",
    fontSize: Metrics.fontsize.L,
    color: Colors.black,
  },
  // dropdown: {
  //   fontFamily: "JosefinSans",
  //   fontSize: Metrics.fontsize.XL,
  // },
});
