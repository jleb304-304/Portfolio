import React, {useState} from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Modal, Switch } from "react-native";
import { Metrics, Colors } from '../../Themes';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { Feather, SimpleLineIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient'

export default function AddExpense(props) {
  const { title, content, modalVisible, setModalVisible } = props;

  return (
    <View>
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modal}>
          <LinearGradient
          colors={[ "#BADBDE", "#AFD2E5"]}
          locations={[0, 0.7]}
          start={{ x: 0.1, y: 0.2 }}
          style={styles.container}
        >
          <View style={styles.modalView}>
            <Text style={styles.heading}>{title}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Feather name={'x'} size={Metrics.icons.small} color={Colors.buttonBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsView}>
            {content}
          </View>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex:1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: Metrics.screenHeight,
  },
  modalView: {
    flexDirection: 'row',
    flex:0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 10,
    alignContent: 'center',
    backgroundColor: Colors.white,
  },
  button: {
    width: 30,
    flex:1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
  },
  heading: {
    flex:4,
    fontSize: Metrics.fontsize.M*0.9,
    fontFamily: "JosefinSans",
    color: Colors.black,
    justifyContent: 'center',
    paddingTop: 10,
  },
  detailsView: {
    flex: 0,
    flexDirection: 'column',
    margin: 30,
  },
});
