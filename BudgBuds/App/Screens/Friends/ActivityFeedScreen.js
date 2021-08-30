import React, {useState} from 'react';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import { material, robotoWeights } from 'react-native-typography';
import { Metrics, Colors } from '../../Themes';
import { Entypo } from '@expo/vector-icons';
import {ToggleButton} from 'react-native-paper';
import FriendFeedCard from '../../Components/Cards/FriendFeedCard';
import FriendCard from '../../Components/Cards/FriendCard';
import PageViewSwitch from '../../Components/Buttons/PageViewSwitch';
//import { FlatList } from 'react-native-gesture-handler';

export default function ActivityFeedScreen({ navigation }) {
  const [value, setValue] = useState('Activity Feed');
  var category = "Activity Feed";

  const DATA = [
      
      {
        name:'Beyonce Knowles',
        description:'Beyonce made a purchase at Chanel.',
        action:'purchase',
        group:"Westcoast",
        photoURL:'beyonce',
        comments: [
          {
            poster: "Naomi Osaka",
            message: "Good job",
          }
        ]
      },
      {
        name:"Donald Glover",
        description:"Donald upheld their budget this week!",
        action:"budget upheld",
        group:"Stanny Squad",
        photoURL:'childish',
        comments: [
          {
            poster: "Donald Glover",
            message: "Proud of you!",
          },
        ]
      },

      {
        name:'Keanu Reaves',
        description:'Keanu upheld their Entertainment budget this month!',
        action:'budget upheld',
        group:"Stanny Squad",
        photoURL:'keanu',
        comments: [
          {
            poster: "Naomi Osaka",
            message: "Good job",
          },
          {
            poster: "Donald Glover",
            message: "Proud of you!",
          },
        ]
      },
      {
        name:"Naomi Osaka",
        description:"Naomi surpassed their Food budget this week.",
        action:"budget broke",
        group:"Louisiana Legends",
        photoURL:'osaka',
        comments: [
          {
            poster: "Naomi Osaka",
            message: "Good job",
          },
          {
            poster: "Donald Glover",
            message: "Proud of you!",
          },
        ]
      },
      

    ];

  const onList = value => {
    category="Friends List";
    setValue('Friends List');
    console.log('category');
  }
  const onFeed = value => {
    category = "Activity Feed";
    setValue('Activity Feed');
    console.log(category);

  }

  const makeFriend = ({ item }) => {
      if (value === 'Activity Feed') {
        return(
          <View style={styles.feed}>
            <FriendFeedCard
              photoURL={item.photoURL}
              name={item.name}
              description={item.description}
              action={item.action} />
          </View>

        );
      } else {
        return(
          <View style={styles.flat}>
            <FriendCard
              name={item.name}
              group={item.group}
              photoURL={item.photoURL} />
          </View>
        );
      }
  }
  return (
    <View style={styles.fullscreen}>
      <View style={styles.top}>

          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              FRIENDS
            </Text>
            <PageViewSwitch
              category={value}
              onPress={()=>{console.log("press")}}
              title1="Activity Feed"
              title2="Friends List"
              onClick1={onFeed}
              onClick2={onList}
            />
          </View>

      </View>
      <View style={styles.container}>
        <FlatList
          data = {DATA}
          renderItem = {makeFriend}
          keyExtractor = {item => item.name}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({

  fullscreen:{
    flex:1,
    flexDirection:'column',
  },
  container: {
    flex: 7,
    backgroundColor: Colors.bgBlue,
  },
  buttonGroup: {
    flex:1,
  },
  button: {
    flex:1,
    height:50
  },
  top: {
    flex:1.9,
    padding:'2%',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    backgroundColor:Colors.white,
  },

  titleContainer: {
    flex:2,
    alignItems:'center',

    justifyContent: 'center',
  },
  title: {
    fontFamily:'JosefinSans',
    fontSize:Metrics.fontsize.XL,
  },

  flat: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:'4%',
    marginHorizontal: '3%',
  },
  feed: {
    alignContent: 'center',
    alignItems: 'center',
    marginTop:'1%',
    justifyContent: 'center',
  }
});
