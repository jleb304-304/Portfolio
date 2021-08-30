import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, ActivityIndicator, Image } from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../../Themes';
import { Entypo } from '@expo/vector-icons';

export default function FriendListScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text style={material.display1}>Implement Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.bgBlue,
  },
});
