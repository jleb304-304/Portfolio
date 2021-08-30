import React, {useState} from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Modal, Switch } from "react-native";
import { Metrics, Colors } from '../../Themes';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { SimpleLineIcons, Feather } from '@expo/vector-icons';

export default function ProfileButton() {
  const [modalVisible, setModalVisible] = useState(false);
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
          <View style={styles.modalView}>
            <Text style={styles.heading}>FAQ</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>DONE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsView}>
            <View style={styles.detailsText}>
              <Text style={styles.details}>Here are some frequently asked questions on how to use the app!</Text>
            </View>
          </View>

        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <SimpleLineIcons
          name="question"
          size={Metrics.icons.medium*1.2}
          color={Colors.black}
          style={{left: Metrics.screenWidth*0.06,}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.white,
    flex:1,
  },
  modalView: {
    height:110,
    flexDirection: 'row',
    flex:0,
    borderRadius: 20,
    padding: 35,
    marginTop: 30,
    alignContent: 'space-around'
  },
  switches: {
    flex:2,
  },
  button: {
    width: 50,
    flex:1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: Colors.buttonBlue,
  },
  textStyle: {
    color: Colors.white,
    fontWeight: "bold",
  },
  heading: {
    flex:4,
    fontSize: 30,
  },
  detailsView: {
    flex: 0,
    flexDirection: 'row',
    margin: 30,
  },
  detailsText: {
    flex: 7,
  },
  detailsPhoto: {
    flex: 3,
    alignItems: 'flex-end',
  },
  details: {
    fontSize: 25,
    marginBottom: 20,
  },
  photo: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 45,
  },
  edit: {
    marginRight: 15,
  }
});
