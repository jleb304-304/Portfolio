import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image } from 'react-native';
import Metrics from '../../Themes/Metrics'

export default function SubBudget(props) {
  var percent = (parseFloat(props.remaining) / parseFloat(props.budget) * 100).toString() + "%";
  
  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>
          {props.title}
        </Text>
        <View style={styles.container}>
          <Text style={styles.remaining}>
            Remaining: ${props.remaining}
          </Text>
        <Text style={styles.budget}>
            Your Budget: ${props.budget}
          </Text>
        </View>
      </View>
      <View style={styles.progress}>
        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: '#feb4ae', width: percent}}/>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 8,
    borderRadius: 10,
    backgroundColor:"#f7fcfc",
    margin:10,
    padding:"3%",
    flexDirection: 'column',

  },
  container: {
    height: '100%',
    flexDirection: 'column',
    flex:5,
    alignContent: 'center',
    justifyContent: 'center',
    padding: '1%',
  },
  top: {
     flexDirection:"row",
     flex:5,
     alignItems:'flex-start',
     padding: "1%",
  },
  title: {
    flex:5,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#444545',
    fontFamily: 'JosefinSans',
    padding:10
  },
  remaining: {
    flex:1,
    fontSize: 14,
    fontFamily: "JosefinSans",
    marginTop:10,
    textAlign: 'right',
    color: '#feb4ae'
  },
  budget: {
    flex:1,
    fontSize: 14,
    fontFamily: "JosefinSans",
    textAlign: 'right',
    color: '#444545'
  },
  progress: {
    flex:1,
    flexDirection: 'row',
    height: 10,
    width: '97%',
    backgroundColor: '#e7ecee',
    borderRadius: 5,
    margin: "2%",
  },

});
