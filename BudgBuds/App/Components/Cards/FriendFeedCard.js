import React, {useState} from "react";
import { Animated, Text, View, StyleSheet, Image, TextInput , Button, TouchableOpacity} from 'react-native';
import { Colors, Metrics, Images } from '../../Themes';
import { Feather, SimpleLineIcons, FontAwesome} from '@expo/vector-icons';

export default function FriendFeedCard(props) {
  const [comment, setComment] = React.useState(null);
  let title = props.name;
  if (props.action == "budget upheld") {
      title += " upheld their budget :) ";
  } else if (props.action == "purchase") {
      title += " made a new purchase!";
  } else if (props.action == "budget broke") {
      title += " surpassed their budget :( ";
  }
  var cardColor = Colors.white;
  const [liked, setLiked] = useState(false);
  const getHeart = () => {
    return(
      liked?
      <FontAwesome
        name={'heart'}
        size={Metrics.icons.medium*1.2}
        color={Colors.red} />
      :
      <FontAwesome
        name={'heart-o'}
        size={Metrics.icons.medium*1.2}
        color={Colors.red} />
    )
  }
   return (
    <View style={[styles.card,{ backgroundColor: cardColor}]}>
        <View style={[styles.userDetails]}>
          <View style={styles.img}>
            <Image
              style={styles.profilePhoto}
              source={Images[props.photoURL]}/>
          </View>

          <Text style={styles.group}>
                  {props.description}
          </Text>
        </View>
        <View style={styles.actions}>
            <TouchableOpacity style={styles.icon} onPress={()=>setLiked(!liked)}>
              {getHeart()}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              value={comment}
              placeholder="Leave a comment"
            />
            <TouchableOpacity style={styles.icon}>
              <Feather name={'send'} size={Metrics.icons.medium*1} />
            </TouchableOpacity>
        </View>
        <View style={styles.actions}>
            <Button title="Great job!" onPress={()=>setComment("Great job!")}/>
            <Button title="Keep it up!" onPress={()=>setComment("Keep it up!")}/>
            <Button title="Yikes!" onPress={()=>setComment("Yikes!")}/>
            <Button title="Meh!" onPress={()=>setComment("Meh!")}/>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 4,
    flexDirection: 'column',
    paddingVertical: '2%'
  },
  icon: {
      flex:1,
      justifyContent: 'center',
      alignItems: 'center',
  },

  input: {
    flex:3,
    backgroundColor:'#e3e3e3',
    borderRadius: 20,
    height:'55%',
    paddingHorizontal: '3%',
  },

  profilePhoto: {
    resizeMode: 'contain',
    height: Metrics.screenHeight / 15,
    width: Metrics.screenHeight / 15,
    marginHorizontal: Metrics.screenWidth / 40,
    borderRadius: 50,
  },
  actions: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex:1,

  },
  name: {
    fontSize: Metrics.fontsize.L,
    fontFamily: 'JosefinSans',
    flex:1,
  },
  group: {
    fontSize: Metrics.fontsize.L,
    fontFamily: 'JosefinSans',
    flex:2.5,
    marginRight: '5%',
  },
  userDetails: {
    flex: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }

});
