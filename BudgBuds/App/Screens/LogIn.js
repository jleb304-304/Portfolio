import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import { material } from 'react-native-typography';
import { Colors, Metrics } from '../Themes';
import fireAuth from '../../firebase';
import firebase from 'firebase';
import PageViewSwitch from '../Components/Buttons/PageViewSwitch'
import {LinearGradient} from 'expo-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function LogIn({ navigation }) {
    const [login, setLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onClickLoginTab = () => {navigation.navigate("login");}
    const onClickCreateTab = () => {navigation.navigate("createAccount");}
    var errorMessage = "";
    function loginAttempt(){
        fireAuth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {

          var user = userCredential.user;
          console.log(user.displayName);
          navigation.navigate("Tab Navigator");
        })
        .catch((error) => {
          var errorCode = error.code;
          errorMessage = error.message;
          Alert.alert(
            "Invalid login details",
            "Try again with a different username or password",
            [
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );
          console.log(errorMessage);
        });

    };


    useEffect(() => {

    });
    return(
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
          >
            <LinearGradient
            colors={["#7BB5DD", "#5180A1"]}
            locations={[0, 0.7]}
            start={{ x: 0.1, y: 0.2 }}
            style={styles.container}
          >
            <Image
              style={styles.logo}
              source={require('../../assets/piggy-white.png')}
            />
            <View style={styles.login}>
            <PageViewSwitch
                category="Log In"
                onPress={()=>{console.log("press")}}
                title1="Log In"
                title2="Register"
                onClick1={onClickLoginTab}
                onClick2={onClickCreateTab}
                />
              <View style={{flex:1.5, justifyContent:'center', alignItems:'center'}}>
                    <Text style={styles.bigTitle}>
                        Welcome!
                    </Text>
                </View>
                <View style={styles.field}>

                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={(email) => {
                            setEmail(email);
                        }}
                        value={email}
                    />
                </View>
                <View style={styles.field}>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={(password) => {
                            setPassword(password);
                        }}
                        value={password}
                    />
                </View>
                <View style={styles.buttons}>
                    <Text style={styles.error}>
                        {errorMessage}
                    </Text>
                    <Button
                        onPress={loginAttempt}
                        title="Login"
                        color={Colors.white}
                        style={styles.bigButton}
                    />
                </View>
            </View>
            </LinearGradient>
        </KeyboardAwareScrollView>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    login:{
        flexDirection:'column',
        borderRadius:5,
        padding:'5%',
        height:'50%',
        marginBottom: '11%',
        width:'90%',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    field: {
        flex:1,
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        padding:'0%'
    },
    error: {
        fontSize: Metrics.fontsize.S,
        flex:1,
        color:"#FF0000"
    },
    input:{
        flex:2,
        height:50,
        textAlign:'left',
        padding:'4%',
        backgroundColor: Colors.white,
        borderRadius: 10,
    },
    title:{
        flex:1,
        fontSize: Metrics.fontsize.L,
        //fontFamily:'JosefinSans',
    },
    bigTitle:{
        color: Colors.white,
        fontSize: Metrics.fontsize.XL,
    },
    buttons:{
        flex:1,
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    logo: {
      resizeMode: 'contain',
      height: 130,
      width: 130,
    },
    bigButton:{
        flex:2,
        width:'80%',
    },
    smallButton:{
        flex:1,
        width:'80%',
    }

});
