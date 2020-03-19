import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import Firebase from '../../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../util/i18n/i18n';

export default class Secure extends Component{
  render(){
    return(
      <View style={styles.container}>
        <SecureRegister />
      </View>
    );
  }
}

class SecureRegister extends Component{
  constructor(props){
    super(props);
    this.state = {
      errorMessage: null
    }
    this.sendVerificationEmail = this.sendVerificationEmail.bind(this);
  }

  sendVerificationEmail = async()=>{
    try {
      const currentUser = Firebase.auth().currentUser;
      if (currentUser){
        await currentUser.sendEmailVerification().then(()=>{
          Alert.alert(I18n.t('sendEmail'));
        }).catch((error)=>{
          this.setState({errorMessage: error.message});
          console.log(error.message);
        });
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <Text style={[styles.whiteText, {fontSize: 24, marginTop: 5}]}>{I18n.t('successRegister')}</Text>
            <Text style={[styles.whiteText, {marginTop: 15}]}>{I18n.t('pleaseVerify')}</Text>
          </SimpleAnimation>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <TouchableOpacity style={[styles.verifyButton, {marginTop: 30}]} onPress={this.sendVerificationEmail}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <MaterialIcons name='email' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.verifyEmail')}</Text>
            </TouchableOpacity>
          </SimpleAnimation>
        </View>
        <View style={styles.bottomRegister}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <TouchableOpacity style={styles.backToLogin} onPress={()=> Actions.login()}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='back' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.login')}</Text>
            </TouchableOpacity>
          </SimpleAnimation>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backToLogin: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomRegister: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1
  },
  verifyButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

AppRegistry.registerComponent('SecureRegister', ()=> SecureRegister);