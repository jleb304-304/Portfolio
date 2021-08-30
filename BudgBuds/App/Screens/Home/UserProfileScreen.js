import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../../Themes';
import { Entypo } from '@expo/vector-icons';
import HomePageBudget from '../../Components/Cards/HomePageBudgets'

export default function UserProfileScreen({ navigation, route }) {
  return (
    <View style={styles.cont}>
      <HomePageBudget budget="300" remaining="400"/>
    </View>
  );
}
  const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.bgBlue,
  },
});
