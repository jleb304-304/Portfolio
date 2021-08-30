import * as React from 'react';
import { Animated, Text, View, StyleSheet, Image } from 'react-native';
import { Colors, Metrics, Images } from '../../Themes';

export default function LeaderboardCard(props) {

  var percent = "100%"
  var cardColor = Colors.white;
  if(props.position == "1") { cardColor = '#ffec8a';}
  else if(props.position == "2") {cardColor = '#e8e8e8';}
  else if(props.position == "3") {cardColor = '#f7dabe';}
   return (
    <View style={[styles.card,{ backgroundColor: cardColor}]}>
        <View style={styles.position}>
          <Text style={styles.positionText}>
            #{props.position}
          </Text>
        </View>
        <View style={styles.container}>
          <Image
            style={styles.profilePhoto}
            source={Images[props.photoURL]}
          />
        <View style={styles.profileDetails}>
            <Text style={styles.name}>
                {props.name}
            </Text>
            <View style={styles.badges}>
              {props.badges[0] && <Image
                style={styles.badge}
                source={require('../../../assets/badges/badge1.png')}
              />}
              {props.badges[1] && <Image
                style={styles.badge}
                source={require('../../../assets/badges/badge2.png')}
              />}
              {props.badges[2] && <Image
                style={styles.badge}
                source={require('../../../assets/badges/badge3.png')}
              />}
              {props.badges[3] && <Image
                style={styles.badge}
                source={require('../../../assets/badges/badge4.png')}
              />}
            </View>
          </View>
        </View>
      <View style={styles.score}>
        <Text style={styles.scoreText}>
          {props.score}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 9.5,
    padding:"3%",
    flexDirection: 'column',
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection:"row",
  },
  cardNum1: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 10,
    backgroundColor:'gold',
    padding:"3%",
    flexDirection: 'column',
    borderColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection:"row",
  },
  container: {
    height: '100%',
    flexDirection: 'row',
    flex:5,
    alignContent: 'center',
    justifyContent: 'flex-start',
    padding: '1%',
    alignItems: 'center'
  },
  position: {
     flex:1.2,
     padding: "1.5%",
  },
  positionText: {
     fontSize: Metrics.fontsize.XL*1.4,
     color: Colors.pewter,
    fontFamily: 'JosefinSans-SemiBold',
  },
  score: {
    flex:1.5,
    textAlign: 'right',
    color: '#444545',
    padding: '1%',
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: Metrics.fontsize.XL,
    fontFamily: 'JosefinSans-SemiBold',
    color: Colors.buttonBlue,
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
    flex:1,
  },
  name: {
    fontSize: Metrics.fontsize.L,
    fontFamily: 'JosefinSans'
  },
  badge: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 40,
    width: Metrics.screenHeight / 40,
    marginRight: Metrics.screenWidth / 60,
  },
  badges: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: Metrics.screenHeight / 120,
  }

});
