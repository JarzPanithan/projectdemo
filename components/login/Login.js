import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, Alert, AsyncStorage, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKColor } from 'react-native-material-kit';
import { TextField } from 'react-native-material-textfield';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import * as Animatable from 'react-native-animatable';
import Firebase, { fb }  from '../../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import I18n from '../../util/i18n/i18n';
import PasswordInputText from '../passwordInput';

export default class Login extends Component{
  render(){
    return(
      <View style={styles.container}>
        <LoginForm />
      </View>
    );
  }
}

class LoginForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      errorEmail: null,
      errorPassword: null,
      isLoading: false,
      googleUser: null
    }
    this.loginWithFirebase = this.loginWithFirebase.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.createFacebookUser = this.createFacebookUser.bind(this);
    this.loginWithGoogle = this.loginWithGoogle.bind(this);
    this.createGoogleUser = this.createGoogleUser.bind(this);
    // this.loginWithGoogleStandalone = this.loginWithGoogleStandalone.bind(this);
    // this.setUserToDatabase = this.setUserToDatabase.bind(this);
  }

  componentDidMount = ()=>{
    this.checkRememberMe();
    // this.get();
    // this.googleAsync();
  }

  // get = async()=>{
  //   const get = await AsyncStorage.getItem('facebookFirstLogin');
  //   if (get === null){
  //     console.log('DO NOT HAVE DATA!!');
  //   } else if (get !== null){
  //     console.log('HAVE DATA!!');
  //   } else {
  //     // Nothing Happen!!
  //   }
  // }

  loginWithFirebase = async()=>{
    const userEmail = this.state.email;
    const userPassword = this.state.password;
    try {
      if (userEmail && userPassword){
        this.setState({isLoading: true});
        await Firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(()=>{
          // Alert.alert(I18n.t('login'), I18n.t('greeting') + `${userEmail}!`);
          this.setState({isLoading: false});
          console.log('Email: ' + userEmail);
        }).catch((error)=>{
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === 'auth/invalid-email'){
            this.setState({errorEmail: I18n.t('firebaseError.emailInvalid'), isLoading: false});
            console.log(errorMessage);
          } else if (errorCode === 'auth/wrong-password'){
            this.setState({errorPassword: I18n.t('firebaseError.wrongPassword'), isLoading: false});
            console.log(errorMessage);
          } else if (errorCode === 'auth/user-not-found'){
            this.setState({errorEmail: I18n.t('firebaseError.userNotFound'), isLoading: false});
            console.log(errorMessage);
          } else if (errorCode === 'auth/user-disabled'){
            this.setState({errorEmail: I18n.t('firebaseError.userDisabled'), isLoading: false});
            console.log(errorMessage);
          } else {
            this.setState({isLoading: false});
            console.log('Something wrong with the Login Firebase.');
          }
        });
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  // renderLoadingButton = ()=>{
  //   const { isLoading } = this.state;
  //   if (isLoading === true){
  //     return(
  //       <TouchableOpacity style={styles.loginButton} disabled={true}>
  //         <ActivityIndicator size={30} size='large' />
  //       </TouchableOpacity> 
  //     );
  //   } else if (isLoading === false){
  //     return(
  //       <TouchableOpacity style={styles.loginButton} onPress={this.loginWithFirebase}>
  //         <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
  //           <AntDesign name='login' size={20} color='white' />
  //         </Animatable.View>
  //         <Text style={styles.whiteText}>{I18n.t('button.login')}</Text>
  //       </TouchableOpacity>
  //     );
  //   } else {
  //     // Nothing Happen!!
  //   }
  // }

  loginWithFacebook = async()=>{
    try {
      this.createFacebookUser();
    } catch (error){
      console.log(error.message);
    }
  }

  createFacebookUser = async()=>{
    try {
      const appId = '411181642780275';
      const result = await Facebook.logInWithReadPermissionsAsync(appId, {
        permissions: ['public_profile', 'email']
      });
      if (result.type === 'success'){
        const credential = fb.auth.FacebookAuthProvider.credential(result.token);
        return Firebase.auth().signInWithCredential(credential).then(async()=>{
          await fetch(`https://graph.facebook.com/me?access_token=${result.token}&fields=first_name,last_name,id,email,name,picture.type(large)`)
          .then((response)=>{
            response.json().then((user)=>{
              this.checkFirstFacebookLogin();
              // let userId = Firebase.auth().currentUser.uid;
              // if (userId){
              //   Firebase.firestore().collection('Login-Users').doc(userId).set({
              //     Firstname: I18n.t('noData'),
              //     Lastname: I18n.t('noData'),
              //     // Username: user.name
              //   }).then(()=>{
              //     AsyncStorage.setItem('facebookFirstLogin', userId);
              //     console.log('INSERTED FACEBOOK USER DATA');
              //   }).catch((error)=>{
              //     console.log(error.message);
              //   });
              // } else {
              //   // Nothing Happen!!
              // }
            });
          }).catch((error)=>{
            console.log(error.message);
          })
        })
      } else {
        console.log(I18n.t('error.loginFacebook'));
      }
    } catch (error){
      console.log(error.message);
    }
  }

  setFacebookUserToDatabase = async()=>{
    let userId = Firebase.auth().currentUser.uid;
    try {
      if (userId){
        Firebase.firestore().collection('Login-Users').doc(userId).set({
          Firstname: I18n.t('noData'),
          Lastname: I18n.t('noData')
        }).then(async()=>{
          await AsyncStorage.setItem('facebookFirstLogin', userId);
          console.log('INSERTED FACEBOOK USER DATA!!');
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

  checkFirstFacebookLogin = async()=>{
    try {
      const isFirst = await AsyncStorage.getItem('facebookFirstLogin');
      if (isFirst === null){
        this.setFacebookUserToDatabase();
      } else if (isFirst !== null){
        console.log('Not Facebook first login!!');
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  loginWithGoogle = async()=>{
    try {
      this.createGoogleUser();
    } catch (error){
      console.log(error.message);
    }
  }

  createGoogleUser = async()=>{
    try {
      const iosClientId = '662248209053-2ooeat3ubie8m7opk171hc5jdi2tlepd.apps.googleusercontent.com';
      const androidClientId = '662248209053-bko14vq8r9fchogvkibgvucqi89uj7vb.apps.googleusercontent.com';
      const webClientId = '662248209053-49i6hauk2076t17jsg4dk5ldn8886b97.apps.googleusercontent.com';
      const result = await Google.logInAsync({
        iosClientId: iosClientId,
        androidClientId: androidClientId,
        webClientId, webClientId,
        scopes: ['profile', 'email']
      });
      if (result.type === 'success'){
        const credential = fb.auth.GoogleAuthProvider.credential(result.idToken, result.accessToken);
        return Firebase.auth().signInWithCredential(credential).then(()=>{
          this.checkGoogleFacebookLogin();
          // let userId = Firebase.auth().currentUser.uid;
          // if (userId){
          //   Firebase.firestore().collection('Login-Users').doc(userId).set({
          //     Firstname: I18n.t('noData'),
          //     Lastname: I18n.t('noData'),
          //     // Username: result.user.name
          //   });
          // } else {
          //   // Nothing Happen!!
          // }
        }).catch((error)=>{
          console.log(error.message);
        });
      } else {
        console.log(I18n.t('error.loginGoogle'));
      }
    } catch (error){
      console.log(error.message);
    }
  }

  setGoogleUserToDatabase = async()=>{
    let userId = Firebase.auth().currentUser.uid;
    try {
      if (userId){
        Firebase.firestore().collection('Login-Users').doc(userId).set({
          Firstname: I18n.t('noData'),
          Lastname: I18n.t('noData')
        }).then(async()=>{
          await AsyncStorage.setItem('googleFirstLogin', userId);
          console.log('INSERTED GOOGLE USER DATA!!');
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

  checkGoogleFacebookLogin = async()=>{
    try {
      const isFirst = await AsyncStorage.getItem('googleFirstLogin');
      if (isFirst === null){
        this.setGoogleUserToDatabase();
      } else if (isFirst !== null){
        console.log('Not Google first login!!');
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  // googleAsync = async()=>{
  //   try {
  //     const iosClientId = '662248209053-2ooeat3ubie8m7opk171hc5jdi2tlepd.apps.googleusercontent.com';
  //     const webClientId = '662248209053-49i6hauk2076t17jsg4dk5ldn8886b97.apps.googleusercontent.com';
  //     await GoogleSignIn.initAsync({
  //       clientId: iosClientId,
  //       isOfflineEnabled: true,
  //       isPromptEnabled: true,
  //       webClientId: webClientId
  //     });
  //     const user = await GoogleSignIn.signInSilentlyAsync();
  //     this.setState({googleUser: user});
  //   } catch (error){
  //     console.log(error.message);
  //   }
  // }

  // loginWithGoogleStandalone = async()=>{
  //   try {
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     const result = await GoogleSignIn.signInAsync();
  //     if (result.type === 'success'){
  //       const { idToken, accessToken } = result.user.auth;
  //       const credential = fb.auth.GoogleAuthProvider.credential(idToken, accessToken);
  //       return Firebase.auth().signInWithCredential(credential).then(()=>{
  //         this.setUserToDatabase();
  //         Actions.main();
  //       }).catch((error)=>{
  //         console.log(error.message);
  //       })
  //     } else {
  //       console.log(I18n.t('error.loginWithGoogle'));
  //     }
  //   } catch (error){
  //     console.log(error.message);
  //   }
  // }

  // logoutWithGoogleStandalone = async()=>{
  //   try {
  //     await GoogleSignIn.signOutAsync();
  //     this.setState({googleUser: null});
  //   } catch (error){
  //     console.log(error.message);
  //   }
  // }

  // onPress = ()=>{
  //   const { googleUser } = this.state;
  //   if (googleUser){
  //     this.logoutWithGoogleStandalone();
  //   } else {
  //     this.loginWithGoogleStandalone();
  //   }
  // }

  toggleRememberMe = (value)=>{
    this.setState({rememberMe: value});
    if (value === true) {
      this.rememberUser();
    } else {
      this.forgetUser();
    }
  }

  rememberUser = async()=>{
    const { email } = this.state;
    try {
      await AsyncStorage.setItem('userEmail', email);
    } catch (error){
      console.log(error.message);
    }
  }

  getRememberUser = async()=>{
    try {
      const userEmail = await AsyncStorage.getItem('userEmail');
      if (userEmail !== null) {
        return userEmail;
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  forgetUser = async()=>{
    try {
      await AsyncStorage.removeItem('userEmail');
    } catch (error) {
      console.log(error.message);
    }
  }

  checkRememberMe = async()=>{
    try {
      const userEmail = await this.getRememberUser();
      this.setState({
        email: userEmail || '',
        rememberMe: userEmail ? true : false
      });
    } catch (error) {
      console.log(error.message);
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

  render(){
    const { email, password, rememberMe, errorEmail, errorPassword } = this.state;

    return(
      <View style={styles.container}>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.loginForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              error={errorEmail}
              errorColor={MKColor.Red}
              keyboardType='email-address'
              label={I18n.t('email')}
              lineWidth={1.5}
              onChangeText={(email)=> this.setState({email})}
              tintColor={MKColor.Green}
              textColor='white'
              value={email}
            />
            {email ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetEmail} /> : null}
            {/* {errorEmail ? <Text style={{color: MKColor.Red}}>{errorEmail}</Text> : null} */}
          </View>
          <View style={styles.loginForm}>
            <PasswordInputText
              autoCapitalize='none'
              autoCorrect={false}
              label={I18n.t('password')}
              error={errorPassword}
              onChangeText={(password)=> this.setState({password})}
              value={password}
            />
            {password ? <Entypo style={styles.iconForPassword} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetPassword} /> : null}
            {/* {errorPassword ? <Text style={{color: MKColor.Red}}>{errorPassword}</Text> : null} */}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={[styles.loginForm, {flexDirection: 'row'}]}>
            <Text style={{color: 'white'}}>{I18n.t('rememberMe')}</Text>
            <Switch
              onValueChange={(value)=> this.toggleRememberMe(value)}
              trackColor={MKColor.LightGreen}
              thumbColor={MKColor.LightGreen}
              style={{marginLeft: 10}}
              value={rememberMe}
            />
            <TouchableOpacity onPress={()=> Actions.forgotPass()}>
              <Text style={[styles.whiteText, {marginLeft: 150}]}>{I18n.t('button.forgotPassword')}</Text>
            </TouchableOpacity>
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={[styles.loginForm, {alignItems: 'center', flexDirection: 'row'}]}>
            <Text style={styles.whiteText}>{I18n.t('selectWith')}</Text>
            <View style={styles.selectLogin}>
              <TouchableOpacity activeOpacity={0.5} onPress={this.loginWithFacebook}>
                <Image
                  style={styles.imageIcons}
                  source={require('../../assets/images/Facebook.png')}
                />
              </TouchableOpacity>
              {/* For Expo Client */}
              <TouchableOpacity activeOpacity={0.5} onPress={this.loginWithGoogle}>
                <Image 
                  style={styles.imageIcons}
                  source={require('../../assets/images/Google.png')}
                />
              </TouchableOpacity>
              {/* For Standalone */}
              {/* <TouchableOpacity activeOpacity={0.5} onPress={this.onPress}>
                <Image 
                  style={styles.imageIcons}
                  source={require('../../assets/images/Google.png')}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </SimpleAnimation>
        {/* <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={[styles.loginForm, {alignItems: 'center', flexDirection: 'row'}]}>
            <Text style={styles.whiteText}>{I18n.t('selectLanguages')}</Text>
            <View style={styles.selectLogin}>
              <TouchableOpacity activeOpacity={0.5} onPress={()=> Alert.alert('เปลี่ยนเป็นภาษาไทย')}>
                <Image
                  style={styles.imageIcons}
                  source={require('../assets/images/Flag_Thai.png')}
                  // source={{uri: 'https://cdn2.iconfinder.com/data/icons/world-flag-icons/256/Flag_of_Thailand.png'}}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} onPress={()=> Alert.alert('เปลี่ยนเป็นภาษาอังกฤษ')}>
                <Image
                  style={styles.imageIcons}
                  source={require('../assets/images/Flag_American.png')}
                  // source={{uri: 'https://i.pinimg.com/originals/aa/bc/5b/aabc5bbb896b6b9e32fa8abfa5282f21.png'}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SimpleAnimation> */}
        <View style={styles.bottomLogin}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <TouchableOpacity style={styles.loginButton} onPress={this.loginWithFirebase}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='login' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.login')}</Text>
            </TouchableOpacity>
            {/* {this.renderLoadingButton} */}
            {/* {email && password.length >= 6 ?
            <TouchableOpacity style={styles.loginButton} onPress={this.loginWithFirebase}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='login' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.login')}</Text>
            </TouchableOpacity> :
            <TouchableOpacity style={styles.disableButton} disabled={true}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='login' size={20} color='white' />
              </Animatable.View>
            <Text style={styles.whiteText}>{I18n.t('button.login')}</Text>
            </TouchableOpacity>} */}
            <TouchableOpacity style={styles.registerButton} onPress={()=> Actions.register()}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <Ionicons name='md-person-add' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.register')}</Text>
            </TouchableOpacity>
          </SimpleAnimation>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    borderColor: MKColor.Green,
    borderRadius: 150,
    borderWidth: 2,
    height: 150,
    justifyContent: 'center',
    width: 150
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
  imageIcons: {
    borderRadius: 40,
    height: 45,
    margin: 10,
    padding: 10,
    resizeMode: 'stretch',
    width: 45
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  loginForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  selectLogin: {
    flexDirection: 'row',
    flex: 1,
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

AppRegistry.registerComponent('Login', ()=> Login);