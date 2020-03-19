import React, { Component } from 'react';
import { AppRegistry, Alert, AsyncStorage, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Firebase, { fb } from '../../config/firebase';
import I18n from '../../util/i18n/i18n';
import PasswordInputText from '../passwordInput';

export default class EditProfile extends Component{
  render(){
    return(
      <View style={styles.container}>
        <EditProfileForm />
      </View>
    );
  }
}

class EditProfileForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      userName: '',
      userEmail: '',
      userAvatar: '',
      userVerified: '',
      userId: '',
      editUserNameAndSurname: '',
      editEmail: '',
      editPassword: '',
      currentPassword: '',
      errorMessage: null,
      visibleModal: false,
      deleteFacebook: null,
      deleteGoogle: null
    }
    this.retrieveUserData = this.retrieveUserData.bind(this);
    this.reauthenticateUser = this.reauthenticateUser.bind(this);
    this.editNameAndSurname = this.editNameAndSurname.bind(this);
    this.editEmail = this.editEmail.bind(this);
    this.editPassword = this.editPassword.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount = async()=>{
    this.retrieveUserData();
  }

  retrieveUserData = async()=>{
    try {
      let user = Firebase.auth().currentUser;
      if (user !== null){
        this.setState({
          userName: user.displayName,
          userEmail: user.email,
          userAvatar: user.photoURL,
          userVerified: user.emailVerified,
          userId: user.uid
        });
      } else if (user === null){
        this.setState({
          userName: null,
          userEmail: null,
          userAvatar: null,
          userVerified: null,
          userId: null
        });
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  editNameAndSurname = async()=>{
    const { editUserNameAndSurname } = this.state;
    try {
      let user = Firebase.auth().currentUser;
      if (user.displayName !== editUserNameAndSurname){
        user.updateProfile({
          displayName: editUserNameAndSurname
        }).then(()=>{
          this.setState({editUserNameAndSurname: ''});
          Alert.alert(I18n.t('edit.changeNameAndSurname'));
          console.log('You changed name.');
        });
      } else if (user.displayName === editUserNameAndSurname) {
        // this.setState({errorMessage: I18n.t('error.alreadyNameAndSurname')})
        Alert.alert(I18n.t('error.alreadyNameAndSurname'));
        console.log('This name and surname is already use.');
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  reauthenticateUser = async()=>{
    const { currentPassword } = this.state;
    try {
      let user = fb.auth().currentUser;
      let credential = fb.auth.EmailAuthProvider.credential(user.email, currentPassword);
      user.reauthenticateWithCredential(credential).catch((error)=>{
        // this.setState({errorMessage: error.message});
        console.log(error.message);
      });
    } catch (error){
      console.log(error.message);
    }
  }

  editEmail = async()=>{
    const { currentPassword, editEmail } = this.state;
    try {
      this.reauthenticateUser(currentPassword).then(()=>{
      let user = Firebase.auth().currentUser;
      if (user.email !== editEmail){
        user.updateEmail(editEmail).then(()=>{
          this.setState({
            currentPassword: '',
            editEmail: ''
          });
          Alert.alert(I18n.t('alert.changeEmail'));
          console.log('New Email: ' + editEmail);
        }).catch((error)=>{
          // this.setState({errorMessage: error.message});
          console.log('Edit Email Error: ' + error.message);
        });
      } else if (user.email === editEmail){
        Alert.alert(I18n.t('alert.emailDupplicate'));
        console.log('Please, insert different email.');
      } else {
        // Nothng Happen!!
      }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  editPassword = async()=>{
    const { currentPassword, editPassword } = this.state;
    try {
      this.reauthenticateUser(currentPassword).then(()=>{
        let user = Firebase.auth().currentUser;
        if (user){
          user.updatePassword(editPassword).then(()=>{
            this.setState({
              currentPassword: '',
              editPassword: ''
            });
            Alert.alert(I18n.t('alert.changePassword'));
            console.log('New Password: ' + editPassword);
          }).catch((error)=>{
            // this.setState({errorMessage: error.message});
            console.log('Edit Password Error: ' + error.message);
          });
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  deleteAccount = async()=>{
    const { currentPassword } = this.state;
    try {
      this.reauthenticateUser(currentPassword).then(()=>{
        let user = Firebase.auth().currentUser;
        if (user){
          user.delete().then(()=>{
            // this.clearUserDatabase();
            this.clearAsyncStorage();
            Alert.alert(I18n.t('alert.deleteAccount'));
            console.log('Deleted Account!!');
          }).catch((error)=>{
            // this.setState({errorMessage: error.message});
            console.log('Edit Delete Error: ' + error.message);
          })
        } else {
          // Nothing Happen!!
        }
      });
    } catch (error){
      console.log(error.message);
    }
  }

  clearAsyncStorage = async()=>{
    try {
      await AsyncStorage.clear().then(()=>{
        console.log('CLEARED DATA!!');
      });
    } catch (error){
      console.log(error.message);
    }
  }

  // clearUserDatabase = async()=>{
  //   let userId = Firebase.auth().currentUser.uid;
  //   try {
  //     if (userId){
  //       Firebase.firestore().collection('Login-Users').doc(userId).delete().then(()=>{
  //         console.log('CLEARED DATABASE!!')
  //       });
  //     } else {
  //       // Nothing Happen!!
  //     }
  //   } catch (error){
  //     console.log(error.message);
  //   }
  // }

  resetEditNameAndSurname = ()=>{
    const { editUserName } = this.state;
    if (editUserName){
      this.setState({editUserName: ''});
    } else {
      // Nothing Happen!!
    }
  }

  resetEditEmail = ()=>{
    const { editEmail } = this.state;
    if (editEmail){
      this.setState({editEmail: ''});
    } else {
      // Nothing Happen!!
    }
  }

  resetEditPassword = ()=>{
    const { editPassword } = this.state;
    if (editPassword){
      this.setState({editPassword: ''});
    } else {
      // Nothing Happen!!
    }
  }

  resetCurrentPassword = ()=>{
    const { currentPassword } = this.state;
    if (currentPassword){
      this.setState({currentPassword: ''});
    } else {
      // Nothing Happen!!
    }
  }

  render(){
    const { userName, userEmail, userAvatar, editUserNameAndSurname, editEmail, editPassword, currentPassword, errorMessage } = this.state;
    const isVisible = this.state.visibleModal;

    return(
      <ScrollView style={styles.container}>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.showUserData}>
            <Image 
              style={styles.avatar}
              source = {{uri: userAvatar}}
              // source={require('../../assets/images/Avatar.bmp')}
            />
            <View style={{flexDirection: 'column'}}>
              <Text style={[styles.whiteText, {fontSize: 18, marginLeft: 10, marginTop: 50}]}>{userName}</Text>
              {userEmail !== null ? <Text style={[styles.whiteText, {fontSize: 10, marginLeft: 10, marginTop: 10}]}>{userEmail}</Text> :
              <Text style={[styles.whiteText, {fontSize: 10, marginLeft: 10, marginTop: 10}]}>{I18n.t('anonymous')}</Text>}
              <TouchableOpacity style={styles.editInformationButton} onPress={()=> Actions.editInfo()}>
                <Text style={styles.whiteText}>{I18n.t('button.information')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editProfileForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              error={errorMessage}
              errorColor={MKColor.Red}
              label={I18n.t('userName')}
              lineWidth={1.5}
              onChangeText={(editUserNameAndSurname)=> this.setState({editUserNameAndSurname})}
              textColor='white'
              tintColor={MKColor.Green}
              value={editUserNameAndSurname}
            />
            {editUserNameAndSurname ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetEditNameAndSurname} /> : null}
            {editUserNameAndSurname ? <View>
            <TouchableOpacity style={styles.editButton} onPress={this.editNameAndSurname}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <FontAwesome name='edit' size={30} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.changeUserName')}</Text>
            </TouchableOpacity>
            {/* <Modal animationIn='fadeIn' animationInTiming={200} animationOut='fadeOut' animationOutTiming={200} isVisible={isVisible}
              onBackdropPress={()=> this.setState({visibleModal: false})}>
              <View style={styles.modalContainer}>
                <View style={styles.modalAlert}>
                  <Text style={[styles.whiteText, {fontSize: 16}]}>{I18n.t('alert.before')}</Text>
                    <View style={{flexDirection: 'column'}}>
                      <TouchableOpacity style={styles.modalYesButton} onPress={this.editNameAndSurname}>
                        <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                          <AntDesign name='checkcircle' size={30} color='white' />
                        </Animatable.View>
                        <Text style={styles.whiteText}>{I18n.t('button.yes')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modalNoButton} onPress={()=> this.setState({visibleModal: false})}>
                        <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                          <Entypo name='circle-with-cross' size={30} color='white' />
                        </Animatable.View>
                        <Text style={styles.whiteText}>{I18n.t('button.no')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal> */}
            </View> :
            <TouchableOpacity style={styles.disableButton} disabled={true}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <FontAwesome name='edit' size={30} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.changeUserName')}</Text>
            </TouchableOpacity>}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editProfileForm}>
            <PasswordInputText
              autoCapitalize='none'
              autoCorrect={false}
              error={errorMessage}
              label={I18n.t('password')}
              onChangeText={(currentPassword)=> this.setState({currentPassword})}
              value={currentPassword}
            />
          </View>
          {currentPassword ? <Entypo style={styles.iconForPassword} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetCurrentPassword} /> : null}
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editProfileForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              error={errorMessage}
              errorColor={MKColor.Red}
              label={I18n.t('email')}
              lineWidth={1.5}
              onChangeText={(editEmail)=> this.setState({editEmail})}
              textColor='white'
              tintColor={MKColor.Green}
              value={editEmail}
            />
            {editEmail ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetEditEmail} /> : null}
            {editEmail && currentPassword.length > 6 ? <View>
            <TouchableOpacity style={styles.editButton} onPress={this.editEmail}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <FontAwesome name='edit' size={30} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.editEmail')}</Text>
            </TouchableOpacity>
            {/* <Modal animationIn='fadeIn' animationInTiming={200} animationOut='fadeOut' animationOutTiming={200} isVisible={isVisible}
              onBackdropPress={()=> this.setState({visibleModal: false})}>
              <View style={styles.modalContainer}>
                <View style={styles.modalAlert}>
                  <Text style={[styles.whiteText, {fontSize: 16}]}>{I18n.t('alert.before')}</Text>
                    <View style={{flexDirection: 'column'}}>
                      <TouchableOpacity style={styles.modalYesButton} onPress={this.editEmail}>
                        <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                          <AntDesign name='checkcircle' size={30} color='white' />
                        </Animatable.View>
                        <Text style={styles.whiteText}>{I18n.t('button.yes')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modalNoButton} onPress={()=> this.setState({visibleModal: false})}>
                        <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                          <Entypo name='circle-with-cross' size={30} color='white' />
                        </Animatable.View>
                        <Text style={styles.whiteText}>{I18n.t('button.no')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal> */}
            </View> :
            <TouchableOpacity style={styles.disableButton} disabled={true}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <FontAwesome name='edit' size={30} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.editEmail')}</Text>
            </TouchableOpacity>}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editProfileForm}>
            {/* <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              error={errorMessage}
              errorColor={MKColor.Red}
              label={I18n.t('newPassword')}
              lineWidth={1.5}
              onChangeText={(editPassword)=> this.setState({editPassword})}
              textColor='white'
              tintColor={MKColor.Green}
              value={editPassword}
            /> */}
            <PasswordInputText
              autoCapitalize='none'
              autoCorrect={false}
              error={errorMessage}
              label={I18n.t('newPassword')}
              onChangeText={(editPassword)=> this.setState({editPassword})}
              value={editPassword}
            />
            {editPassword ? <Entypo style={styles.iconForPassword} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetEditPassword} /> : null}
            {editPassword && currentPassword.length > 6 ? <View>
            <TouchableOpacity style={styles.editButton} onPress={this.editPassword}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <FontAwesome name='edit' size={30} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.editPassword')}</Text>
            </TouchableOpacity>
            {/* <Modal animationIn='fadeIn' animationInTiming={200} animationOut='fadeOut' animationOutTiming={200} isVisible={isVisible}
              onBackdropPress={()=> this.setState({visibleModal: false})}>
              <View style={styles.modalContainer}>
                <View style={styles.modalAlert}>
                  <Text style={[styles.whiteText, {fontSize: 16}]}>{I18n.t('alert.before')}</Text>
                    <View style={{flexDirection: 'column'}}>
                      <TouchableOpacity style={styles.modalYesButton} onPress={this.editPassword}>
                        <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                          <AntDesign name='checkcircle' size={30} color='white' />
                        </Animatable.View>
                        <Text style={styles.whiteText}>{I18n.t('button.yes')}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.modalNoButton} onPress={()=> this.setState({visibleModal: false})}>
                        <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                          <Entypo name='circle-with-cross' size={30} color='white' />
                        </Animatable.View>
                        <Text style={styles.whiteText}>{I18n.t('button.no')}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal> */}
            </View> :
            <TouchableOpacity style={styles.disableButton} disabled={true}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <FontAwesome name='edit' size={30} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.editPassword')}</Text>
            </TouchableOpacity>}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editProfileForm}>
            <TouchableOpacity style={styles.deleteButton} onPress={this.deleteAccount}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='deleteuser' size={30} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.deleteAccount')}</Text>
            </TouchableOpacity>
            {/* <Modal animationIn='fadeIn' animationInTiming={200} animationOut='fadeOut' animationOutTiming={200} isVisible={isVisible}
              onBackdropPress={()=> this.setState({visibleModal: false})}>
              <View style={styles.modalContainer}>
                <View style={styles.modalAlert}>
                  <Text style={[styles.whiteText, {fontSize: 16}]}>{I18n.t('alert.before')}</Text>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity style={styles.modalYesButton} onPress={()=> this.setState({visibleModal: false})}>
                      <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                        <AntDesign name='checkcircle' size={30} color='white' />
                      </Animatable.View>
                      <Text style={styles.whiteText}>{I18n.t('button.yes')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalNoButton} onPress={()=> this.setState({visibleModal: false})}>
                      <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                        <Entypo name='circle-with-cross' size={30} color='white' />
                      </Animatable.View>
                      <Text style={styles.whiteText}>{I18n.t('button.no')}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal> */}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.bottomEditProfile}>
            <TouchableOpacity style={styles.backButton} onPress={()=> Actions.profile()}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='back' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.back')}</Text>
            </TouchableOpacity>
          </View>
        </SimpleAnimation>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    borderColor: MKColor.Green,
    borderWidth: 2.5,
    borderRadius: 150,
    height: 150,
    marginTop: 15,
    width: 150
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomEditProfile: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1,
  },
  deleteButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  disableButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Grey,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  editButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  editInformationButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    borderRadius: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20,
    padding: 7
  },
  editProfileForm: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
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
  modalAlert: {
    backgroundColor: '#212F3D',
    borderRadius: 5,
    padding: 65
  },
  modalContainer: {
    alignItems: 'center', 
    flex: 1,
    justifyContent: 'center'
  },
  modalNoButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10
  },
  modalYesButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    padding: 10
  },
  showUserData: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15
  },
  whiteText: {
    color: 'white',
    paddingLeft: 5
  }
});

AppRegistry.registerComponent('EditProfile', ()=> EditProfile);