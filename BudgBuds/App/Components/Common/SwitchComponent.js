import React from "react";
import { Switch,  } from 'react-native-paper';
import { View, Button, Text, StyleSheet } from "react-native";
import { Metrics, Colors } from '../../Themes';

export default function SwitchComponent(props) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(props.isSwitchOn);
  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    props.setIsSwitchOn(!isSwitchOn);
  }

  return (
    <View style={styles.switchContainer}>
      <View style={styles.switch}>
        <Switch
          trackColor={{ false: Colors.black, true: Colors.buttonBlue }}
          ios_backgroundColor="#3e3e3e"
          value={isSwitchOn}
          onValueChange={onToggleSwitch}
        />
      </View>
      <View style={styles.switchTitle}>
        <Text style={styles.switchTitleText}>{props.title}</Text>
      </View>

    </View>
  )
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    marginHorizontal: 40,
    marginVertical: 10
  },
  switch: {
    flex: 1,
  },
  switchTitle: {
    flex: 4,
  },
  switchTitleText: {
    fontSize: Metrics.fontsize.L,
    fontFamily: "Josefins",
  },

});
