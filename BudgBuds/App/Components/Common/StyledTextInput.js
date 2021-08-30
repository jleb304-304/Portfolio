import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";
import { Colors, Metrics } from "../../Themes";

export default function StyledTextInput(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.label}</Text>
      <TextInput
        placeholder={props?.placeholder}
        style={styles.input}
        onChangeText={props?.onChangeText}
        value={props?.value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    flex: 0,
    
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: Colors.white,
    color: Colors.black,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});

// Add the following line when adding a TextInput
// const [value, onChangeText] = React.useState('');
