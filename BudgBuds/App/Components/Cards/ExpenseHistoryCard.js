import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Metrics, Colors, Images } from '../../Themes'
import AddButton from '../Buttons/AddButton';
import CircularProgress from "./circleProgress.js";
import HistoryCardProgress from "./HistoryCardProgress.js";

export default function HistoryCard(props) {
  const people = props.people;

  return (
    <View style={styles.card}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>{props.name}</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.date}>{props.date}</Text>
          </View>
        </View>

        <View style={styles.mid}>
          <View style={styles.profilePhotos}>
            {
              people.map((item, index) => {
                return(
                  <Image
                    key={item}
                    style={styles.profilePhoto}
                    source={Images[item]}
                  />
                );
              })
            }
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>${props.amount}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.budgetName}>{props.budget} - {props.subbudget} </Text>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 5,
    width: Metrics.screenWidth * 0.92,
    borderRadius: 10,
    backgroundColor:"#f7fcfc",
    margin:10,
    paddingHorizontal:"3%",
    paddingVertical:"1.5%",
    flexDirection: 'column',

  },
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    flex:1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: '1%',
  },
  header: {
    flexDirection:"row",
    flex:1,
    paddingHorizontal: "1%",
  },
  name: {
    flex:3,
    fontSize: Metrics.fontsize.XL,
    fontWeight: 'bold',
    fontFamily: 'JosefinSans',
    paddingVertical: 10
  },
  date: {
    flex:1.5,
    fontSize: Metrics.fontsize.L,
    fontFamily: 'JosefinSans',
    paddingVertical: 10
  },
  profilePhoto: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 17,
    width: Metrics.screenHeight / 17,
    marginRight: Metrics.screenWidth / 40,
    borderRadius: 50,
  },
  mid:{
    flex:2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePhotos: {
    flex: 3,
    flexDirection: 'row'
  },
  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontSize: Metrics.fontsize.XL*1.2,
    fontFamily: 'JosefinSans',
  },
  footer: {
    flex:1,
    justifyContent:'center',
  },
  budgetName: {
    fontSize: Metrics.fontsize.L,
    fontFamily: 'JosefinSans',
  },


});
