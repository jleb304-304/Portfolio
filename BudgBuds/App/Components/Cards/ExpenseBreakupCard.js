import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Metrics, Colors, Images, People } from '../../Themes'

export default function ExpenseBreakupCard(props) {
  var people = People.users;
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Image
          style={styles.profilePhoto}
          source={Images[props.name]}
        />
      </View>
      <View style={styles.right}>
        <Text style={styles.name}>
          {people.filter(item => item.photoURL.includes(props.name))[0].name}
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
    height: Metrics.screenHeight / 8,
    borderRadius: 10,
    backgroundColor: Colors.white,
    padding:"3%",
    marginVertical: "3%",
    width: "100%",
    marginRight: 30,
  },
  left: {
     flexDirection:"row",
     flex:1,
     alignItems:'center',
     justifyContent: 'center',
     padding: "1%",
  },
  name: {
    fontSize: Metrics.fontsize.XL,
    textAlign: 'left',
    color: Colors.black,
    fontFamily: 'JosefinSans-SemiBold',
    padding:10
  },
  amount: {
    fontSize: Metrics.fontsize.L,
    textAlign: 'center',
    color: Colors.black,
    fontFamily: 'JosefinSans',
    padding:10
  },
  right: {
    flexDirection:"column",
    flex:3,
    alignItems:'flex-start',
    padding: "1%",
  },
  image: {
    resizeMode: "contain",
    height: "80%",
    width: "80%",
  },
  profilePhoto: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 16,
    width: Metrics.screenHeight / 16,
    marginRight: Metrics.screenWidth / 40,
    borderRadius: 50,
  },

});
