import * as React from "react";
import {
  ImageBackground,
  Animated,
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import SegmentedRoundDisplay from "react-native-segmented-round-display";
import CircularProgress from "./circleProgress";
import metrics from "../../Themes/Metrics";
import AddButton from "../Buttons/AddButton";
// import DeleteButton from "../Buttons/Button";

export default function TopCard(props) {
   console.log(props.remaining/props.budget);
  var percent =
    (
      (parseFloat(props.remaining) / parseFloat(props.budget)) *
      100
    ).toString() + "%";
  var perc;
  if((props.remaining === 0) && (props.budget === 0)) {
    perc = 0;
  }
  else {perc = (props.remaining / props.budget) * 100;}
  console.log("Perc: " + perc)
  return (
    <View style={styles.card}>
      <View style={styles.progress}>
        <ImageBackground
          source={require("../../../assets/piggy.png")}
          style={styles.imagebackground}
          imageStyle={{
            resizeMode: "contain",
            width: "90%",
            marginLeft: "40%",
          }}
        >
          <CircularProgress
            percent={perc}
            radius={metrics.screenWidth / 10}
            bgRingWidth={0.015 * metrics.screenWidth}
            progressRingWidth={0.015 * metrics.screenWidth}
            ringBgColor="#DDDDDD"
            ringColor="#feb4ae"
            clockwise={true}
            startDegrees={0}
            bgColor="#ffffff"
          />
        </ImageBackground>
      </View>
      <View style={styles.container}>
        <Text style={styles.remaining}>Remaining: {props.remaining}</Text>
        <Text style={styles.budget}>Your Budget: {props.budget}</Text>
        <View style={styles.top}>
          {!props.individual && (
            <TouchableOpacity style={styles.button2} onPress={props.onPressSettings}>
              <Image
                style={styles.image2}
                source={require("../../../assets/settings-64.png")}
              />
            </TouchableOpacity>
          )}
          <View style={props.individual ? styles.buttonIndividual : styles.button}>
            <AddButton disabled={props?.disabled} title={props.buttonTitle} onPress={props.onPress} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "space-between",
    width: metrics.screenWidth,
    height: "100%",
    paddingLeft: metrics.screenWidth*0.08,
    borderRadius: 20,
    backgroundColor: "#f7fcfc",
    flexDirection: "row",
  },
  container: {
    height: "100%",
    flexDirection: "column",
    flex: 4,
    padding: "1%",
  },
  top: {
    flexDirection: "row",
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  remaining: {
    flex: 1,
    fontSize: metrics.fontsize.M,
    textAlign: "right",
    fontFamily: "JosefinSans",
    marginTop: 20,
    color: "#feb4ae",
  },
  budget: {
    flex: 1,
    fontSize: metrics.fontsize.M,
    fontFamily: "JosefinSans",
    textAlign: "right",
    paddingLeft: metrics.screenWidth*0.08,
    color: "#444545",
  },
  button: {
    flex: 0,
    alignItems: "flex-end",
  },
  buttonIndividual: {
    flex: 0,
    alignItems: "flex-end",
  },
  image: {
    resizeMode: "contain",
    margin: "10%",
    flex: 2,
  },
  image2: {
    resizeMode: "contain",
    height: "80%",
    width: "80%",
  },
  button2: {
    backgroundColor: "#4281a4",
    alignItems: "center",
    justifyContent: "center",
    flex: 0,
    borderRadius: 5,
    padding: 5,
    height: 33,
    width: 33,
    margin: 3,
  },
  imagebackground: {
    width: "100%",
    flexDirection: "row",
    padding: "18%",
    resizeMode: "contain",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  progress: {
    flex: 2,
    height: "90%",
    padding: "5%",
    resizeMode: "contain",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
