import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Metrics, Colors } from '../../Themes'
import AddButton from '../Buttons/AddButton';
import CircularProgress from "./circleProgress.js";

export default function HistoryCardProgress(props) {
  var percent = (parseFloat(props.remaining) / parseFloat(props.budget) * 100).toString() + "%";
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground
        source={require("../../../assets/piggy.png")}
        style={styles.imagebackground}
        imageStyle={{
          resizeMode: "contain",
        }}
      >
        <CircularProgress
          percent={props.percent}
          radius={Metrics.screenWidth>600? Metrics.screenWidth / 20: Metrics.screenWidth/13}
          bgRingWidth={0.015 * Metrics.screenWidth}
          progressRingWidth={0.015 * Metrics.screenWidth}
          ringBgColor="#DDDDDD"
          ringColor={Colors.melon}
          clockwise={true}
          startDegrees={0}
          bgColor="#ffffff"
        />
      </ImageBackground>
      <Text style={styles.date}>Week {props.week}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  imagebackground: {
    justifyContent: 'center',
    resizeMode: "contain",
    alignItems: "center",
    height: "90%",
    paddingBottom: '24%',
    marginHorizontal:0.03 * Metrics.screenWidth,
  },
  date: {
    fontFamily: 'JosefinSans'
  }

});
