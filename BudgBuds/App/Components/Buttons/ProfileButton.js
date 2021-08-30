import React, {useState} from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Modal, Image, Switch } from "react-native";
import { Metrics, Colors } from '../../Themes';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { Feather } from '@expo/vector-icons';
import SwitchComponent from '../Common/SwitchComponent';
import fireAuth from '../../../firebase';
import firebase from 'firebase';

export default function ProfileButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const [isGoalsEnabled, setIsGoalsEnabled] = useState(true);
  const toggleSwitch1 = () => setGoalsIsEnabled(previousState => !previousState);

  const [isBudgetEditsEnabled, setIsBudgetEditsEnabled] = useState(true);
  const toggleSwitch2 = () => setBudgetEditsIsEnabled(previousState => !previousState);

  const [isShareFriendsEnabled, setIsShareFriendsEnabled] = useState(false);
  const toggleSwitch3 = () => setShareFriendsIsEnabled(previousState => !previousState);

  const [isRankingEnabled, setIsRankingEnabled] = useState(false);
  const toggleSwitch4 = () => setRankingIsEnabled(previousState => !previousState);
  const logout = () => {
    fireAuth.signOut();
    setModalVisible(!modalVisible);
  }
  var user = fireAuth.currentUser;
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
            <Text style={styles.heading}>PROFILE</Text>



            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>DONE</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.detailsView}>
            <View style={styles.detailsText}>
              <Text style={styles.details}>Hi {user.displayName}</Text>
              <Text style={styles.details}>{"Phone: \n333-333-3333"}</Text>
              <Text style={styles.details}>{"Email: " + user.email}</Text>
            </View>
            <View>
              <Feather
                name="edit-2"
                size={Metrics.icons.large*0.6}
                color={Colors.black}
                style={styles.edit}/>
            </View>
            <View style={styles.detailsPhoto}>
              <Image
                style={styles.photo}
                source={require('../../../assets/profilePhotos/beyonce.jpg')}
              />
            </View>
          </View>
          <Text style={styles.heading2}>PREFERENCES</Text>
          <View style={styles.switchesContainer}>
            <SwitchComponent title="Budgeting goals met" isSwitchOn={isGoalsEnabled} setIsSwitchOn={setIsGoalsEnabled}/>
            <SwitchComponent title="Edits to Budget" isSwitchOn={isBudgetEditsEnabled} setIsSwitchOn={setIsBudgetEditsEnabled}/>
            <SwitchComponent title="Share activity with friends" isSwitchOn={isShareFriendsEnabled} setIsSwitchOn={setIsShareFriendsEnabled}/>
            <SwitchComponent title="Leaderboard ranking" isSwitchOn={isRankingEnabled} setIsSwitchOn={setIsRankingEnabled} />
          </View>
        </View>
      </Modal>
      <TouchableOpacity>
        <Feather
          name="user"
          size={Metrics.icons.medium*1.2}
          color={Colors.black}
          onPress={() => setModalVisible(true)}
          style={{right: Metrics.screenWidth*0.06,}}/>
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
    fontFamily: "JosefinSans-Bold"
  },
  heading: {
    flex:4,
    fontSize: 30,
    fontFamily: "JosefinSans",
    color: Colors.black,
  },
  heading2: {
    fontSize: 30,
    marginLeft: 30,
    marginVertical: 25,
    color: Colors.black,
  },
  detailsView: {
    flex: 0,
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  detailsText: {
    flex: 7,
  },
  detailsPhoto: {
    flex: 3,
    alignItems: 'flex-end',
  },
  details: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "JosefinSans-Light",
  },
  photo: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 8,
    width: Metrics.screenHeight / 8,
    marginRight: Metrics.screenWidth / 40,
    borderRadius: Metrics.screenWidth / 4,
  },
  edit: {
    marginRight: 40,
  }
});
