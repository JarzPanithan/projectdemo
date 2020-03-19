import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, Alert, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKColor } from 'react-native-material-kit';
import { TextField } from 'react-native-material-textfield';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import Firebase from '../../config/firebase';
import AntDeisgn from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Validator from '../../util/validator/validation';
import I18n from '../../util/i18n/i18n';
import PasswordInputText from '../passwordInput';

export default class Register extends Component{
  render(){
    return(
      <View style={styles.container}>
        <RegisterForm />
      </View>
    );
  }
}

class RegisterForm extends Validator{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      agree: false,
      errorEmail: null,
      errorPassword: null,
      isLoading: false,
      userName: null,
      userAvatar: null
    }
    this.registerWithFirebase = this.registerWithFirebase.bind(this);
    this.setUserToDatabase = this.setUserToDatabase.bind(this);
    this.sendVerificationEmail = this.sendVerificationEmail.bind(this);
  }

  registerWithFirebase = async()=>{
    const userEmail = this.state.email;
    const userPassword = this.state.password;
    const userAgree = this.state.agree;
    const userName = this.state.name;
    // const defaultAvatar = require('../../assets/images/Avatar.bmp');
    const defaultAvatar = 'https://www.shareicon.net/data/256x256/2016/05/26/771203_man_512x512.png';
    try {
      this.setState({isLoading: true});
      if (userEmail && userPassword && userAgree === true){
        await Firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((newUser)=>{
          if (newUser.user){
            newUser.user.updateProfile({
              displayName: userName,
              photoURL: defaultAvatar
            }).then(()=>{
              this.setState({isLoading: false});
              this.setUserToDatabase();
              this.sendVerificationEmail();
              console.log('User Name: ' + newUser.user.displayName);
              Actions.main();
              // Alert.alert(I18n.t('login'), I18n.t('greeting') + newUser.user.displayName);
            }).catch((error)=>{
              const errorCode = error.code;
              const errorMessage = error.message;
              if (errorCode === 'auth/email-already-in-use'){
                this.setState({errorEmail: I18n.t('firebaseError.emailDuplicate'), isLoading: false});
                console.log(errorMessage);
              } else if (errorCode === 'auth/invalid-email'){
                this.setState({errorEmail: I18n.t('firebaseError.emailInvalid'), isLoading: false});
                console.log(errorMessage);
              } else if (errorCode === 'auth/weak-password'){
                this.setState({errorPassword: I18n.t('firebaseError.passwordWeak'), isLoading: false});
                console.log(errorMessage);
              } else if (errorCode === 'auth/operation-not-allowed'){
                this.setState({
                  errorEmail: I18n.t('firebaseError.notEnabled'),
                  errorPassword: I18n.t('firebaseError.notEnabled'),
                  isLoading: false
                });
                console.log(errorMessage);
              } else {
                console.log('Something wrong with the Login Firebase.');
              }
            });
          } else {
            // Nothing Happen!!
          }
        });
      }
    } catch (error){
      console.log(error.message);
    }   
  }

  sendVerificationEmail = async()=>{
    try {
      const currentUser = Firebase.auth().currentUser;
      if (currentUser){
        await currentUser.sendEmailVerification().then(()=>{
          // Alert.alert(I18n.t('sendEmail'));
        }).catch((error)=>{
          console.log('Error: ' + error.message);
        });
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  setUserToDatabase = async()=>{
    // const userName = this.state.name;
    let userId = Firebase.auth().currentUser.uid;
    try {
      if (userId){
        Firebase.firestore().collection('Login-Users').doc(userId).set({
          Firstname: I18n.t('noData'),
          Lastname: I18n.t('noData'),
          // Username: userName
        }).then(()=>{
          console.log('INSERTED FIREBASE USER DATA');
        }).catch((error)=>{
          console.log(error.message);
        });
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  // setUserToDatabase = async()=>{
  //   // const userEmail = this.state.email;
  //   let userId = Firebase.auth().currentUser.uid;
  //   try {
  //     if (userId){
  //       Firebase.database().ref(`users/${userId}`).set({
  //         firstName: I18n.t('noData'),
  //         lastName: I18n.t('noData'),
  //         nickName: I18n.t('noData'),
  //         birthday: I18n.t('noData'),
  //         gender: I18n.t('noData'),
  //         address: I18n.t('noData'),
  //         region: I18n.t('noData')
  //       }).catch((error)=>{
  //         console.log(error.message);
  //       });
  //     } else {
  //       // Nothing Happen!!
  //     }
  //   } catch (error){
  //     console.log(error.message);
  //   }
  // }

  toggleAgree = (value)=>{
    this.setState({agree: value});
    if (value === true){
      this.setState({agree: true});
    } else {
      this.setState({agree: false});
    }
  }

  resetEmail = ()=>{
    const userEmail = this.state.email;
    const userEmailError = this.state.errorEmail;
    if (userEmail || userEmailError){
      this.setState({
        email: '',
        errorEmail: null
      });
    } else {
      // Nothing Happen!!
    }
  }

  resetPassword = ()=>{
    const userPassword = this.state.password;
    const userPasswordError = this.state.errorPassword;
    if (userPassword || userPasswordError){
      this.setState({
        password: '',
        errorPassword: null
      });
    } else {
      // Nothing Happen!!
    }
  }

  resetName = ()=>{
    const userName = this.state.name;
    if (userName){
      this.setState({name: ''});
    } else {
      // Nothing Happen!!
    }
  }

  render(){
    const { email, password, name, agree, errorEmail, errorPassword } = this.state;
    const { loading } = this.state;

    return(
      <View style={styles.container}>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.registerForm}>
            <TextField
              autoCapitalize='none'
              baseColor={MKColor.LightGreen}
              error={errorEmail}
              errorColor={MKColor.Red}
              keyboardType='email-address'
              label={I18n.t('email')}
              lineWidth={1.5}
              onChangeText={(email)=> this.setState({email})}
              textColor='white'
              tintColor={MKColor.Green}
              value={email}
            />
            {email ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen}onPress={this.resetEmail} /> : null}
            {/* {errorEmail ? <Text style={{color: 'red'}}>{errorEmail}</Text> : null} */}
          </View>
          <View style={styles.registerForm}>
            <PasswordInputText
              autoCapitalize='none'
              label={I18n.t('password')}
              error={errorPassword}
              onChangeText={(password)=> this.setState({password})}
              value={password}
            />
            {password ?  <Entypo style={styles.iconForPassword} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetPassword} /> : null}
            {/* {errorPassword ? <Text style={{color: 'red'}}>{errorPassword}</Text> : null} */}
          </View>
          <View style={styles.registerForm}>
            <TextField
              autoCapitalize='none'
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('userName')}
              lineWidth={1.5}
              onChangeText={(name)=> this.setState({name})}
              textColor='white'
              tintColor={MKColor.Green}
              value={name}
            />
            {name ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetName} /> : null}
          </View>
          <View style={[styles.registerForm, {flexDirection: 'row'}]}>
            <Text style={{color: 'white'}}>{I18n.t('agreement')}</Text>
            <Switch
              onValueChange={(value)=> this.toggleAgree(value)}
              trackColor={MKColor.LightGreen}
              thumbColor={MKColor.LightGreen}
              style={{marginLeft: 10}}
              value={agree}
            />
          </View>
        </SimpleAnimation>
        <View style={styles.bottomLogin}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            {loading ? <ActivityIndicator color={MKColor.Green} size={60} /> :
            <TouchableOpacity style={styles.registerButton} onPress={this.registerWithFirebase}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <Ionicons name='md-person-add' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.register')}</Text> 
            </TouchableOpacity>}
            {/* {email && password.length >= 6 && agree === true ? 
            <TouchableOpacity style={styles.registerButton} onPress={this.registerWithFirebase}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <Ionicons name='md-person-add' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.register')}</Text> 
            </TouchableOpacity> : 
            <TouchableOpacity style={styles.disableButton} disabled={true}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <Ionicons name='md-person-add' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.register')}</Text> 
            </TouchableOpacity>} */}
          <TouchableOpacity style={styles.backButton} onPress={()=> Actions.login()}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <AntDeisgn name='back' size={20} color='white' />
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
  bottomLogin: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
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
  icon: {
    position: 'absolute',
    top: 45,
    right: 10
  },
  iconForPassword: {
    position: 'absolute',
    top: 45,
    right: 45
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  registerForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

AppRegistry.registerComponent('Register', ()=> Register);