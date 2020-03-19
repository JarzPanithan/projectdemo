import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { TextField } from 'react-native-material-textfield';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import Firebase from '../../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import I18n from '../../util/i18n/i18n';

export default class ForgotPassword extends Component{
  render(){
    return(
      <View style={styles.container}>
        <ForgotPasswordForm />
      </View>
    );
  }
}

class ForgotPasswordForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      currentEmail: '',
      errorEmail: null
    }
    this.changePassword = this.changePassword.bind(this);
  }

  changePassword = async()=>{
    const userEmail = this.state.currentEmail;
    try {
      await Firebase.auth().sendPasswordResetEmail(userEmail).then(()=>{
        // Alert.alert(I18n.t('alert.checkEmail'));
        Actions.securePass();
      }).catch((error)=>{
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/invalid-email'){
          this.setState({errorEmail: I18n.t('firebaseError.emailInvalid')});
          console.log(errorMessage);
        } else if (errorCode === 'auth/user-not-found'){
          this.setState({errorEmail: I18n.t('firebaseError.userNotFound')});
          console.log(errorMessage);
        } else {
          console.log('Something wrong with the Login Firebase.');
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  resetEmail = ()=>{
    const userEmail = this.state.currentEmail;
    const userEmailError = this.state.errorEmail;
    if (userEmail || userEmailError){
      this.setState({
        currentEmail: '',
        errorEmail: null
      });
    } else {
      // Nothing Happen!!
    }
  }

  render(){
    const { currentEmail, errorEmail } = this.state;

    return(
      <View style={styles.container}>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.forgotForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              error={errorEmail}
              errorColor={MKColor.Red}
              keyboardType='email-address'
              label={I18n.t('email')}
              lineWidth={1.5}
              onChangeText={(currentEmail)=> this.setState({currentEmail})}
              tintColor={MKColor.Green}
              textColor='white'
              value={currentEmail}
            />
            {currentEmail ? <Entypo name={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetEmail} /> : null}
          </View>
        </SimpleAnimation>
        <View style={styles.bottomForgot}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            {currentEmail ?
            <TouchableOpacity style={styles.forgotButton} onPress={this.changePassword}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='login' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.changeEmail')}</Text>
            </TouchableOpacity> :
              <TouchableOpacity style={styles.disableButton} disabled={true}>
                <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                  <AntDesign name='login' size={20} color='white' />
                </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.changeEmail')}</Text>
            </TouchableOpacity>}
            <TouchableOpacity style={styles.backButton} onPress={()=> Actions.login()}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='back' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.back')}</Text>
            </TouchableOpacity>
          </SimpleAnimation>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomForgot: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container : {
    backgroundColor: '#212F3D',
    flex: 1
  },
  disableButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Grey,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  forgotButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  forgotForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  icon: {
    position: 'absolute',
    top: 45,
    right: 10
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

AppRegistry.registerComponent('ForgotPassword', ()=> ForgotPassword);