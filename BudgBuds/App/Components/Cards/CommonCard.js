import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Metrics, Colors, Images } from '../../Themes'

export default function Card(props) {
  var disab = (props.disabled==true)?true:false;
  return (
    <TouchableOpacity style={disab?styles.disCard:styles.card} onPress={() => props.onPress()}>
      <View style={styles.left}>
        <Text style={styles.title}>
          {props.title}
        </Text>
      </View>
      <View style={styles.right}>
        <Image
          style={styles.image}
          source={props.image}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Metrics.screenHeight / 8,
    borderRadius: 10,
    backgroundColor:'#e3e3e3',
    margin:10,
    padding:"3%",
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: Metrics.screenHeight / 8,
    borderRadius: 10,
    backgroundColor: Colors.white,
    margin:10,
    padding:"3%",
  },
  left: {
     flexDirection:"row",
     flex:1.5,
     alignItems:'flex-start',
     padding: "1%",
  },
  title: {
    flex:1,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
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
    height: "100%",
    width: "100%",
  },

});
