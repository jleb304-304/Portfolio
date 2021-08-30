import * as React from "react";
import { ImageBackground, Text, View, StyleSheet, Image } from "react-native";
import CircularProgress from "./circleProgress.js";
import { Metrics, Colors } from "../../Themes";

export default function HomePageBudget(props) {
  var perc;
  if((props.remaining === 0) && (props.budget === 0)) {
    perc = 0;
  }
  else {perc = (props.remaining / props.budget) * 100;}
  return (
    <View style={styles.card}>
      <View style={styles.progress}>
        <ImageBackground
          source={require("../../../assets/piggy.png")}
          style={styles.imagebackground}
          imageStyle={{
            resizeMode: "contain",
            width: "100%",
            marginLeft: "40%",
          }}
        >
          <CircularProgress
            percent={perc}
            radius={Metrics.screenWidth / 12}
            bgRingWidth={0.015 * Metrics.screenWidth}
            progressRingWidth={0.015 * Metrics.screenWidth}
            ringBgColor="#DDDDDD"
            ringColor={Colors.melon}
            clockwise={true}
            startDegrees={0}
            bgColor="#ffffff"
          />
        </ImageBackground>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.remaining}>Remaining: ${props.remaining}</Text>
        <Text style={styles.budget}>Your Budget: ${props.budget}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    height: Metrics.screenHeight>800? Metrics.screenHeight / 8: Metrics.screenHeight/6,
    borderRadius: 10,
    backgroundColor: Colors.white,
    width: '95%',
    margin: 10,
    padding: "3%",
    flexDirection: "row",
  },
  imagebackground: {
    width: "110%",
    flexDirection: "row",
    padding: "20%",
    resizeMode: "contain",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  container: {
    alignItems: "flex-end",
    justifyContent: "center",
    paddingVertical: 24,
    paddingRight: 10,
    flex: 3,
    flexDirection: "column",
  },
  progress: {
    flex: 1,
    height: "100%",
    padding: "5%",
    resizeMode: "contain",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  title: {
    marginBottom: "5%",
    marginTop: 0,
    textAlign: "right",
    fontFamily: "JosefinSans-SemiBold",
    fontSize: Metrics.fontsize.L,
    color: Colors.black,
  },
  remaining: {
    textAlign: "right",
    fontFamily: "JosefinSans",
    marginBottom: "3%",
    fontSize: Metrics.fontsize.M,
    color: Colors.melon,
  },
  budget: {
    textAlign: "right",
    fontFamily: "JosefinSans",
    fontSize: Metrics.fontsize.M,
    color: Colors.black,
  },
});
