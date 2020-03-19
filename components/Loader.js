import React, { Component } from 'react';
import { AppRegistry, ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import I18n from '../util/i18n/i18n';
import Firebase from '../config/firebase';

export default class Loader extends Component{
  render(){
    return(
      <View style={styles.container}>
        <LoaderForm />
      </View>
    );
  }
}

class LoaderForm extends Component{
  componentDidMount = async()=>{
    this.checkIfLogin();
  }

  checkIfLogin = async()=>{
    try {
      Firebase.auth().onAuthStateChanged((user)=>{
        if (user !== null){
          let userName = user.displayName;
          let userEmail = user.email;
          let userId = user.uid;
          // console.log('User Name: ' + userName);
          // console.log('User Email: ' + userEmail);
          // console.log('User Avatar: ' + user.photoURL);
          // console.log('User ID: ' + userId);
          Alert.alert(I18n.t('login'), I18n.t('greeting') + `${userName}!`);
          Actions.main();
        } else if (user === null){
          console.log('User not login.');
          Actions.login();
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator
          color={MKColor.LightGreen}
          size={60}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212F3D',
    flex: 1,
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('Loader', ()=> Loader);