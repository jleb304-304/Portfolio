import * as React from "react";
import { Colors, Metrics } from '../../Themes';
import {
  ImageBackground,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather, SimpleLineIcons} from '@expo/vector-icons';

import * as BBStyles from "../../../App/Themes/index.js";

export default function DeleteButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.card}>
        <ImageBackground
          // source={require("../../../assets/trash-1.png")}
          style={styles.imagebackground}
          imageStyle={{
            resizeMode: "contain",
            width: BBStyles.Metrics.icons.medium,
          }}
        >
          <Feather name={'trash-2'} size={Metrics.icons.medium} color={Colors.black} />
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    width: Metrics.screenWidth/ 8,
    height: "80%",
    borderRadius: 10,
    backgroundColor: BBStyles.Colors.white,
    marginBottom: 10,
    marginLeft: 10,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  // top: {
  //   flexDirection: "row",
  //   flex: 3,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: "1%",
  // },
  // budget: {
  //   flex: 1,
  //   fontSize: 14,
  //   textAlign: "right",
  //   color: "#444545",
  // },
  // button: {
  //   flex: 4,
  //   backgroundColor: "#4281a4",
  //   margin: "1%",
  //   height: 40,
  // },
  // image: {
  //   resizeMode: "contain",
  //   margin: "10%",
  //   flex: 2,
  // },
  // image2: {
  //   resizeMode: "contain",
  //   height: "80%",
  //   width: "80%",
  // },
  // button2: {
  //   backgroundColor: "#4281a4",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   alignContent: "center",
  //   flex: 1,
  //   height: 40,
  //   margin: "2%",
  // },
  imagebackground: {
    padding: "10%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
