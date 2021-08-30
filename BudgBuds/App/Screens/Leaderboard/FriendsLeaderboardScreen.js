import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { material } from 'react-native-typography';
import { People, Metrics, Colors } from '../../Themes';
import { Entypo } from '@expo/vector-icons';
import LeaderboardCard from '../../Components/Cards/LeaderboardCard'
import PageViewSwitch from '../../Components/Buttons/PageViewSwitch'
import LeaderboardProfileModal from '../../Components/Cards/LeaderboardProfileModal'

export default function FriendsLeaderboardScreen({ navigation }) {
  const onClickFriendsTab = () => {navigation.navigate("FriendsLeaderboard");}
  const onClickGroupsTab = () => {navigation.navigate("GroupsLeaderboard");}

  const people = People.users;
  people.sort((a, b) => (a.score > b.score) ? -1 : 1)

  const [profileVisible, setProfileVisible] = useState(false);
  const [viewingProfile, setViewingProfile] = useState(people[1]);

  const keyExtractor = (index) => {
    return index.toString();
  };


  const renderRank = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => { setViewingProfile(item); setProfileVisible(true);}}>
          <LeaderboardCard
              name={item.name}
              photoURL={item.photoURL}
              score={item.score}
              badges={item.badges}
              position={index+1}
            />
        </TouchableOpacity>
      </View>
      );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>LEADERBOARD</Text>

        <PageViewSwitch
          category="Friends"
          onPress={()=>{console.log("press")}}
          title1="Friends"
          title2="Groups"
          onClick1={onClickFriendsTab}
          onClick2={onClickGroupsTab}
        />
      </View>
      <View style={styles.rankContainer}>
        <FlatList
          data={people}
          renderItem={renderRank}
          keyExtractor={(item, index) => keyExtractor(index)}
        />
      </View>
      <LeaderboardProfileModal
        profile={viewingProfile}
        modalVisible={profileVisible}
        setModalVisible={setProfileVisible}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  titleText: {
    fontSize: Metrics.fontsize.XL,
    fontFamily: 'JosefinSans'
  },
  titleContainer: {
    flex: 1.7,
    alignItems: 'center',
    paddingTop: Metrics.screenHeight * 0.04,
  },
  rankContainer: {
    flex: 7,
  }
});
