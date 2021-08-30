import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image } from 'react-native';
import { Colors, Metrics, Images } from '../../Themes';

export default function FriendCard(props) {

  var cardColor = Colors.white;

   return (
    <View style={[styles.card,{ backgroundColor: cardColor}]}>
        <View style={styles.container}>
          <Image
            style={styles.profilePhoto}
            source={Images[props.photoURL]}
          />
        </View>
        <View style={styles.profileDetails}>
            <Text style={styles.name}>
                {props.name}
            </Text>
            <Text >
                {props.group}
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 10,
    width:'100%',
    padding:"3%",
    borderRadius: 15,
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection:"row",
  },

  container: {
    height: '100%',
    flex:1,
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: '1%',
    alignItems: 'center'
  },

  profilePhoto: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 15,
    width: Metrics.screenHeight / 15,
    marginRight: Metrics.screenWidth / 40,
    borderRadius: 50,
  },
  profileDetails: {
    flexDirection: 'column',
    flex:3,
  },
  name: {
    fontSize: Metrics.fontsize.XL,
    fontFamily: 'JosefinSans'
  },
  group: {
    fontSize: Metrics.fontsize.XL,
    fontFamily: 'JosefinSans'
  },

  badges: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: Metrics.screenHeight / 120,
  }

});
