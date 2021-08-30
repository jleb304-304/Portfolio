import React, {useState} from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text, Modal, Switch, Image, FlatList } from "react-native";
import { Metrics, Colors, Images, Badges } from '../../Themes';
import { useFonts, JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { Feather, SimpleLineIcons} from '@expo/vector-icons';

export default function LeaderboardProfileModal(props) {
  const { profile, modalVisible, setModalVisible } = props;
  const keyExtractor = (index) => {
    return index.toString();
  };
  const renderBadge = ({item, index}) => {
    if(item) {
      return (
        <View>
          <View style={styles.badges}>
            {<Image
              style={styles.badge}
              source={Badges[index].badge}
            />}{item && <Text style={styles.badgeName}>{Badges[index].name}</Text>}
          </View>
        </View>);
      }
      else {
        return null;
      }

  }

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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.topBar}>
              <Text style={styles.heading}>{profile.name}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}>
                <Feather name={'x'} size={Metrics.icons.medium} color={Colors.buttonBlue} />
              </TouchableOpacity>
            </View>
            <View style={styles.midBar}>
              <Image
                style={styles.profilePhoto}
                source={Images[profile.photoURL]}
              />
              <View style={styles.pointsContainer}>
                <Text style={styles.points}>{profile.score}</Text>
                <Text style={styles.pointText}>points</Text>
              </View>
            </View>
            <View style={styles.badgeBar}>
              <FlatList
                data={profile.badges}
                renderItem={renderBadge}
                keyExtractor={(item, index) => keyExtractor(index)}
              />
            </View>
            <View style={styles.actionsBar}>
              <TouchableOpacity>
                <Feather name={'heart'} size={Metrics.icons.medium*1.3} color={Colors.red} style={styles.actionIcons}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name={'share-2'} size={Metrics.icons.medium*1.3} color={Colors.black} style={styles.actionIcons}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <Feather name={'message-circle'} size={Metrics.icons.medium*1.3} color={Colors.buttonBlue} style={styles.actionIcons}/>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    width:Metrics.screenWidth*0.85,
    height:Metrics.screenHeight*0.5,
  },
  centeredView: {
    flex:5,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    height: Metrics.screenHeight*0.9,
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
    height:Metrics.screenHeight*0.58,
  },
  topBar: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingHorizontal: 15,
    flex:0.5,
    marginTop: Metrics.screenHeight*0.01,
  },
  midBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    flex:3.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeBar:{
    flex:3,
    paddingVertical: Metrics.screenHeight*0.01,
    paddingHorizontal: Metrics.screenWidth*0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsBar:{
    flex:1,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'center',
    paddingBottom: Metrics.screenHeight*0.015,
    paddingHorizontal: Metrics.screenWidth*0.1,
  },
  button: {
    flex:1,
    borderRadius: 4,
    alignItems: 'center',
  },
  heading: {
    flex:4,
    fontFamily: 'JosefinSans',
    fontSize: Metrics.fontsize.XL,
    justifyContent: 'center',
  },
  pointsContainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  points: {
    fontFamily: 'JosefinSans',
    fontSize: Metrics.fontsize.XL*1.8,
    color: Colors.buttonBlue,
  },
  pointText: {
    fontFamily: 'JosefinSans',
    fontSize: Metrics.fontsize.XL,
    color: Colors.black,
  },
  profilePhoto: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 6,
    width: Metrics.screenHeight / 6,
    marginHorizontal: Metrics.screenWidth / 40,
    borderRadius: Metrics.screenWidth/5,
  },
  badge: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 37,
    width: Metrics.screenHeight / 37,
    marginRight: Metrics.screenWidth / 60,
    flex:1
  },
  badgeName: {
    flex:4,
    fontFamily:'JosefinSans',
    fontSize: Metrics.fontsize.M,
  },
  badges: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Metrics.screenHeight / 100,
    width: Metrics.screenWidth,
    flexDirection: 'row'
  },
  actionIcons: {
    marginHorizontal: Metrics.screenWidth / 10,
  }

});
