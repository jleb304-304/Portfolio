import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Metrics, Colors, Images } from '../../Themes'
import {LinearGradient} from 'expo-linear-gradient'

export default function SpendingHistoryCard(props) {
  console.log("Props");
  console.log(props);
  const date = props.date;

  const formatSelectedDate = (year, month, day)=>{
    return `${month}/${day}/${year}`
  }

  const keyExtractor = (index) => {
    return index.toString();
  };
  const renderPhoto = ({item, index}) => {
    if(item) {
      return (
        <View>
          <View style={{height: Metrics.screenHeight / 15,
          width: Metrics.screenHeight / 15,}}>
            {<Image
              style={styles.profilePhoto}
              source={Images[item]}
            />}
          </View>
        </View>);
      }
      else {
        return null;
      }
  }

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.name}>
          {props.expenseTitle}
        </Text>
        <View style={{flex: 1}}>
          <FlatList
            data={props.friends}
            renderItem={renderPhoto}
            keyExtractor={(item, index) => keyExtractor(index)}
            horizontal={true}
            contentContainerStyle={{paddingBottom:0}}
          />
        </View>
      </View>
      <View style={styles.right}>
        <Text style={styles.date}>
          {date}
        </Text>
        <Text style={styles.amount}>
          {props.amount}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Metrics.screenHeight / 7,
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding:"3%",
    width: "100%",
    marginRight: 30,
    marginTop: 10,
  },
  left: {
     flexDirection:"column",
     flex:1.5,
     alignItems:'flex-start',
     padding: "1%",
  },
  name: {
    flex:0.7,
    fontSize: Metrics.fontsize.L,
    textAlign: 'left',
    color: Colors.black,
    fontFamily: 'JosefinSans',
    paddingTop:10,
    paddingLeft:10
  },
  amount: {
    flex:1,
    fontSize: Metrics.fontsize.L,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'JosefinSans',
    padding:10
  },
  date: {
    flex:1,
    fontSize: Metrics.fontsize.S,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'JosefinSans',
    padding:10
  },
  right: {
    flexDirection:"column",
    flex:1,
    alignItems:'flex-end',
    padding: "1%",
  },
  image: {
    resizeMode: "contain",
    height: "80%",
    width: "80%",
  },
  profilePhoto: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 19,
    width: Metrics.screenHeight / 19,
    marginRight: Metrics.screenWidth / 40,
    borderRadius: 50,
  },

});
