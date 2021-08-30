import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { material } from 'react-native-typography';
import { Colors, Metrics } from '../../Themes';
import { Entypo } from '@expo/vector-icons';
import AddButton from '../../Components/Buttons/AddButton';
import fireAuth from '../../../firebase';
import firebase from 'firebase';

export default function StartScreen({ navigation }) {
const changeScreen = () => {
  navigation.navigate('Home');
}
const logout = () => {
    fireAuth.signOut();
    navigation.navigate("login")
}
return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
      <Text style={styles.appName}>BudgBuds</Text>
      </View>
      <View style={styles.container2}>
        <Button onPress={changeScreen} title="Get Started"/>
        <Button onPress={logout} title="Log Out"/>
      </View>
    </View>

  );
}
  const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    flex: 0,
    paddingBottom: 25,
    backgroundColor: Colors.white,
  },
  logo: {
    resizeMode: 'contain',
    height: 180,
    width: 180,
  },
  appName: {
    paddingVertical: 15,
    fontSize: 35,
    fontWeight: 'bold',
  }
});
