import React, {useState} from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Modal, Switch, Image, FlatList } from "react-native";
import { Metrics, Colors, Images, Badges } from '../../Themes';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import AddButton from '../../Components/Buttons/AddButton';

export default function ConfirmDeleteModal(props) {
  const { modalVisible, setModalVisible } = props;

  return (
    <View>
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => {setModalVisible(!modalVisible)}}
          >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.topBar}>
                <Text style={styles.heading}>Confirm Delete?</Text>
              </View>
              <View style={styles.midBar}>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={styles.addButtonContainer}>
                  <Text style={styles.addButtonText}>NO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {props.deleteItem(props.index); setModalVisible(!modalVisible)}} style={styles.addButtonContainer}>
                  <Text style={styles.addButtonText}>YES</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    width:Metrics.screenWidth*0.35,
    height:Metrics.screenHeight*0.5,
  },
  container: {
    flex:5,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    height: Metrics.screenHeight*0.35,
  },
  centeredView: {
    flex:5,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    height: Metrics.screenHeight*0.35,
  },
  modalView: {
    marginVertical: Metrics.screenHeight*0.4,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: Colors.bgBlue,
    borderWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 4
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 7,
    width:Metrics.screenWidth*0.85,
    height:Metrics.screenHeight*0.2,
  },
  topBar: {
    flexDirection: 'row',
    paddingBottom: 30,
    paddingHorizontal: 15,
    flex:1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: Metrics.screenHeight*0.01,
  },
  heading: {
    fontFamily: 'JosefinSans',
    fontSize: Metrics.fontsize.XL,
  },
  midBar: {
    flexDirection: 'row',
    width: "100%",
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  addButtonContainer: {
    elevation: 8,
    backgroundColor: Colors.buttonBlue,
    borderRadius: 4,
    paddingVertical: 9,
    paddingHorizontal: 6,
    width: Metrics.screenWidth * 0.25,
  },
  addButtonText: {
    fontSize: Metrics.fontsize.S,
    color: Colors.white,
    fontFamily: "JosefinSans",
    alignSelf: "center",
    textTransform: "uppercase",
  },

});
