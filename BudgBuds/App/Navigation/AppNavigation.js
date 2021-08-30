import React, {useState, useEffect} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Images, Colors, Metrics } from '../Themes'
import { StyleSheet, Image, Button } from 'react-native';
import { Feather, SimpleLineIcons} from '@expo/vector-icons';
import StartScreen from '../Screens/Home/StartScreen'
import HomeScreen from '../Screens/Home/HomeScreen'
import IndividualScreen from '../Screens/Home/IndividualScreen'
import GroupScreen from '../Screens/Home/GroupScreen'
import SubBudgetScreen from '../Screens/Home/SubBudgetScreen'
import HistoryScreen from '../Screens/History/HistoryScreen'
import ViewExpensesScreen from '../Screens/History/ViewExpensesScreen'
import UserProfileScreen from '../Screens/Home/UserProfileScreen'
import FriendsLeaderboardScreen from '../Screens/Leaderboard/FriendsLeaderboardScreen'
import GroupsLeaderboardScreen from '../Screens/Leaderboard/GroupsLeaderboardScreen'
import ActivityFeedScreen from '../Screens/Friends/ActivityFeedScreen'
import FriendListScreen from '../Screens/Friends/FriendListScreen'
import FAQButton from '../Components/Buttons/FAQButton'
import ProfileButton from '../Components/Buttons/ProfileButton'
import LogIn from '../Screens/LogIn'
import CreateAccount from '../Screens/CreateAccount'
// font stuff
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

function LogoTitle() {
  return (
    <Image
      style={{ width: Metrics.screenWidth * 0.12, height: Metrics.screenWidth * 0.12 }}
      source={require('../../assets/logo.png')}
    />
  );
}

const HomeStack = createStackNavigator();
function HomeStackComponent() {
  return (
    <HomeStack.Navigator
      headerMode="float"
      screenOptions={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerStyle: {
            height: Metrics.screenHeight*0.13,
            backgroundColor: Colors.white,
          },
          headerRight: () => (<ProfileButton/>)
        }}>
      <HomeStack.Screen name="Start" component={StartScreen} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>

      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Individual" component={IndividualScreen} />
      <HomeStack.Screen name="Group" component={GroupScreen} />
      <HomeStack.Screen name="SubBudget" component={SubBudgetScreen} />
    </HomeStack.Navigator>
  );
}

const HistoryStack = createStackNavigator();
function HistoryStackComponent() {
  return (
    <HistoryStack.Navigator headerMode="float"
    screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: Metrics.screenHeight*0.13,
          backgroundColor: Colors.white,
        },
        headerRight: () => <ProfileButton/>,
      }}>
      <HistoryStack.Screen name="History" component={HistoryScreen} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>
      <HistoryStack.Screen name="ViewExpenses" component={ViewExpensesScreen} />
    </HistoryStack.Navigator>
  );
}

const LeaderboardStack = createStackNavigator();
function LeaderboardStackComponent() {
  return (
    <LeaderboardStack.Navigator headerMode="float"
    screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: Metrics.screenHeight*0.13,
          backgroundColor: Colors.white,
        },
        animationEnabled: false,
        headerRight: () => (<ProfileButton/>)
      }}>
      <LeaderboardStack.Screen name="FriendsLeaderboard" component={FriendsLeaderboardScreen} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>
      <LeaderboardStack.Screen name="GroupsLeaderboard" component={GroupsLeaderboardScreen} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>
    </LeaderboardStack.Navigator>
  );
}

const FriendsStack = createStackNavigator();
function FriendsStackComponent() {
  return (
    <FriendsStack.Navigator headerMode="float"
    screenOptions={{
        headerTitle: (props) => <LogoTitle {...props} />,
        headerStyle: {
          height: Metrics.screenHeight*0.13,
          backgroundColor: Colors.white,
        },
        headerRight: () => (<ProfileButton/>)
      }}>
      <FriendsStack.Screen name="ActivityFeed" component={ActivityFeedScreen} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>
      <FriendsStack.Screen name="FriendList" component={FriendListScreen} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>
    </FriendsStack.Navigator>
  );
}

const TabNav = createBottomTabNavigator();
function tabNavComponent() {
  return (
    <TabNav.Navigator
        initialRouteName='HomeTab'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeTab') {
              iconName = 'home';
            } else if (route.name === 'HistoryTab') {
              iconName = 'clock';
            } else if (route.name === 'LeaderboardTab') {
              iconName = 'award';
            } else if (route.name === 'FriendsTab') {
              iconName = 'users';
            }
            return <Feather name={iconName} size={Metrics.icons.medium} color={color} />;
          },
        })}
        tabBarOptions={{
          style: { backgroundColor: Colors.white },
          activeTintColor: Colors.buttonBlue,
          showLabel: false,
        }}>
        <TabNav.Screen name="HomeTab" component={HomeStackComponent} />
        <TabNav.Screen name="HistoryTab" component={HistoryStackComponent} />
        <TabNav.Screen name="LeaderboardTab" component={LeaderboardStackComponent} />
        <TabNav.Screen name="FriendsTab" component={FriendsStackComponent} />
      </TabNav.Navigator>
  );
}

const loginNav = createStackNavigator();
export default function AppNavigation() {
  const [fontsLoaded] = Font.useFonts({
    'JosefinSans': require('../../assets/fonts/JosefinSans-Regular.ttf'),
    'Josefins': require('../../assets/fonts/JosefinSans-Regular.ttf'),
    'JosefinSans-Bold': require('../../assets/fonts/JosefinSans-Bold.ttf'),
    'JosefinSans-SemiBold': require('../../assets/fonts/JosefinSans-SemiBold.ttf'),
    'JosefinSans-Light': require('../../assets/fonts/JosefinSans-Light.ttf'),
    'JosefinSans-Thin': require('../../assets/fonts/JosefinSans-Thin.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <loginNav.Navigator headerMode="float"
    screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <loginNav.Screen name="login" component={LogIn} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>
      <loginNav.Screen name ="createAccount" component={CreateAccount}/>
      <loginNav.Screen name="Tab Navigator" component={tabNavComponent} options={{
          headerLeft: () => (<FAQButton/>)
        }}/>
    </loginNav.Navigator>
    </NavigationContainer>
  );
}
