import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Metrics, Colors } from '../../Themes'
import AddButton from '../Buttons/AddButton';
import CircularProgress from "./circleProgress.js";
import HistoryCardProgress from "./HistoryCardProgress.js";

export default function HistoryCard(props) {
  var percent = (parseFloat(props.remaining) / parseFloat(props.budget) * 100).toString() + "%";
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {props.month} {props.year}
      </Text>
      <View style={styles.container}>
        <View style={styles.progressCircles}>
          <HistoryCardProgress percent={props.percent[0]} week={1}/>
          <HistoryCardProgress percent={props.percent[1]} week={2}/>
          <HistoryCardProgress percent={props.percent[2]} week={3}/>
          <HistoryCardProgress percent={props.percent[3]} week={4}/>
        </View>
      </View>
      <View style={{flex:1}}>
        <AddButton title="VIEW EXPENSES" customWidth={{width:Metrics.screenWidth * 0.85}}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight>800? Metrics.screenHeight / 4: Metrics.screenHeight/3,
    width: Metrics.screenWidth * 0.93,
    borderRadius: 10,
    backgroundColor:"#f7fcfc",
    margin:10,
    padding:"3%",
    flexDirection: 'column',

  },
  container: {
    height: '100%',
    flexDirection: 'column',
    flex:2,
    alignContent: 'center',
    justifyContent: 'center',
    padding: '4%',
  },
  top: {
     flexDirection:"row",
     flex:5,
     alignItems:'flex-start',
     padding: "1%",
  },
  title: {
    flex:1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#444545',
    fontFamily: 'JosefinSans',
    paddingVertical: 10
  },
  progressCircles: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  imagebackground: {
    width: "50%",
    flexDirection: "row",
    padding: "10%",
    resizeMode: "contain",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },

});
