import React from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Metrics, Colors } from "../../Themes";
import {
  useFonts,
  JosefinSans_400Regular,
} from "@expo-google-fonts/josefin-sans";

export default function PageViewSwitch({
  category,
  title1,
  title2,
  onClick1,
  onClick2 }) {

  return (
    <View style={styles.addButtonContainer}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={onClick1} style={
            [styles.tabContainer,
              (category === title1)? styles.selected:styles.unselected]
        }>
          <Text style={[styles.tabContainerText,
            (category === title1)? styles.selectedText:styles.unselectedText]}>
            {title1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClick2} style={
            [styles.tabContainer,
            (category === title2)? styles.selected:styles.unselected]
        }>
          <Text style={[styles.tabContainerText,
              (category === title2)? styles.selectedText:styles.unselectedText]
          }>{title2}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    elevation: 8,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrics.screenHeight * 0.035,
    width: Metrics.screenWidth * 0.9,
  },
  tabsContainer: {
    borderWidth: Metrics.screenWidth * 0.006,
    borderColor: Colors.black,
    borderRadius: 5,
    flexDirection: 'row',
  },
  tabContainer: {
    backgroundColor: Colors.white,
    height: Metrics.screenHeight * 0.035,
    width: Metrics.screenWidth * 0.38,
    justifyContent: 'center',
  },
  selected: {
    backgroundColor: Colors.black,
  },
  unselectedTab: {
    backgroundColor: Colors.white,
  },
  selectedText: {
    color: Colors.white,
  },
  unselectedText: {
    color: Colors.black,
  },
  tabContainerText: {
    padding: 10,
    fontSize: Metrics.fontsize.M,
    color: Colors.black,
    fontFamily: "JosefinSans",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
