import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Metrics, Colors } from "../../Themes";
import {
  useFonts,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";

export default function AddButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[props.disabled?styles.addButtonDisabledContainer:styles.addButtonContainer,
              props.customWidth? props.customWidth:styles.regularWidth]}
    >
      <Text style={styles.addButtonText}>{props.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    elevation: 0,
    backgroundColor: Colors.buttonBlue,
    borderRadius: 4,
    paddingVertical: 9,
    paddingHorizontal: 6,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  addButtonDisabledContainer: {
    elevation: 8,
    backgroundColor: Colors.pewter,
    borderRadius: 4,
    paddingVertical: 9,
    paddingHorizontal: 6,

  },
  addButtonText: {
    fontSize: Metrics.fontsize.S,
    color: Colors.white,
    fontFamily: "JosefinSans",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  regularWidth: {
    width: Metrics.screenWidth * 0.37,
  }
});
