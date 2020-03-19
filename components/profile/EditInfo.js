import React, { Component } from 'react';
import { AppRegistry, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import Firebase from '../../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import I18n from '../../util/i18n/i18n';

export default class EditInfo extends Component{
  render(){
    return(
      <View style={styles.container}>
        <EditInfoForm />
      </View>
    );
  }
}

class EditInfoForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      userFirstName: '',
      userLastName: '',
      // userUserName: '',
      // userNickName: '',
      // userBirthday: '',
      // userAddress: '',
      // userGender: '',
      // userRegion: ''
    }
    this.retrieveUserDatabase = this.retrieveUserDatabase.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  componentDidMount = ()=>{
    this.retrieveUserDatabase();
  }

  retrieveUserDatabase = async()=>{
    try {
      let userId = Firebase.auth().currentUser.uid;
      let dataRef = Firebase.firestore().collection('Login-Users').doc(userId);
      dataRef.get().then((snapshot)=>{
        if (snapshot.exists){
          const data = snapshot.data();
          const userFirstName = data.Firstname;
          const userLastName = data.Lastname;
          console.log(data.Firstname + ' ' + data.Lastname);
          this.setState({userFirstName, userLastName});
        } else {
          // Nothing Happen!!
        }
      }).catch((error)=>{
        console.log(error.message);
      });
    } catch (error){
      console.log(error.message);
    }
  }

  // retrieveUserDatabase = async()=>{
  //   let userId = Firebase.auth().currentUser.uid;
  //   try {
  //     setTimeout(()=>{
  //       if (userId){
  //         Firebase.firestore().collection('Login-Users').get().then((snapshot)=>{
  //           snapshot.forEach((userData)=>{
  //             // console.log(userData.data());
  //             const data = userData.data();
  //             const userFirstName = data.Firstname;
  //             const userLastName = data.Lastname;
  //             // const userUserName = data.Username;
  //             this.setState({userFirstName, userLastName});
  //           });
  //         }).catch((error)=>{
  //           console.log(error.message);
  //         });
  //       } else {
  //         // Nothing Happen!!
  //       }
  //     }, 1000);
  //   } catch (error){
  //     console.log(error.message);
  //   }
  // }

  updateUserInfo = async()=>{
    let userId = Firebase.auth().currentUser.uid;
    const { userID, userFirstName, userLastName, userUserName } = this.state;
    try {
      if (userId){
        Firebase.firestore().collection('Login-Users').doc(userId).update({
          Firstname: userFirstName,
          Lastname: userLastName,
          // Username: userUserName
        }).then(()=>{
          this.setState({userFirstName, userLastName});
        }).catch((error)=>{
          console.log(error.message);
        });
        Alert.alert(I18n.t('alert.changeUserData'));
        Actions.profile();
        console.log('INFORMATION CHANGED!!');
      } else {
        // Nothing Happen!!
      }
    } catch (error){
      console.log(error.message);
    }
  }

  // updateUserInfo = async()=>{
  //   let userId = Firebase.auth().currentUser.uid;
  //   const { userFirstName, userLastName, userNickName, userBirthday, userAddress, userGender, userRegion } = this.state;
  //   try {
  //     if (userId){
  //       Firebase.database().ref(`users/test/${userId}`).update({
  //         firstName: userFirstName,
  //         lastName: userLastName,
  //         nickName: userNickName,
  //         birthday: userBirthday,
  //         address: userAddress,
  //         gender: userGender,
  //         region: userRegion
  //       }).then(()=>{
  //         this.setState({userFirstName, userLastName, userNickName, userBirthday, userAddress, userGender, userRegion});
  //         Alert.alert(I18n.t('alert.changeUserData'));
  //         console.log('You changed your information.');
  //         Actions.profile();
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

  resetFirstName = ()=>{
    const { userFirstName } = this.state;
    if (userFirstName){
      this.setState({userFirstName: ''});
    } else {
      // Nothing Happen!!
    }
  }

  resetLastName = ()=>{
    const { userLastName } = this.state;
    if (userLastName){
      this.setState({userLastName: ''});
    } else {
      // Nothing Happen!!
    }
  }

  // resetNickName = ()=>{
  //   const { userNickName } = this.state;
  //   if (userNickName){
  //     this.setState({userNickName: ''});
  //   } else {
  //     // Nothing Happen!!
  //   }
  // }

  // resetBirthday = ()=>{
  //   const { userBirthday } = this.state;
  //   if (userBirthday){
  //     this.setState({userBirthday: ''});
  //   } else {
  //     // Nothing Happen!!
  //   }
  // }

  // resetAddress = ()=>{
  //   const { userAddress } = this.state;
  //   if (userAddress){
  //     this.setState({userAddress: ''});
  //   } else {
  //     // Nothing Happen!!
  //   }
  // }

  // resetGender = ()=>{
  //   const { userGender } = this.state;
  //   if (userGender){
  //     this.setState({userGender: ''});
  //   } else {
  //     // Nothing Happen!!
  //   }
  // }

  // resetRegion = ()=>{
  //   const { userRegion } = this.state;
  //   if (userRegion){
  //     this.setState({userRegion: ''});
  //   } else {
  //     // Nothing Happen!!
  //   }
  // }

  render(){
   // const { userFirstName, userLastName, userNickName, userBirthday, userAddress, userGender, userRegion } = this.state;
   const { userID, userFirstName, userLastName, userUserName } = this.state;

    return(
      <ScrollView style={styles.container}>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.firstName')}
              lineWidth={1.5}
              onChangeText={(userFirstName)=> this.setState({userFirstName})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userFirstName}
            />
            {userFirstName ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetFirstName} /> : null}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.lastName')}
              lineWidth={1.5}
              onChangeText={(userLastName)=> this.setState({userLastName})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userLastName}
            />
            {userLastName ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetLastName} /> : null}
          </View>
        </SimpleAnimation>
        {/* <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.firstName')}
              lineWidth={1.5}
              onChangeText={(userFirstName)=> this.setState({userFirstName})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userFirstName}
            />
            {userFirstName ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetFirstName} /> : null}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.lastName')}
              lineWidth={1.5}
              onChangeText={(userLastName)=> this.setState({userLastName})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userLastName}
            />
            {userLastName ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetLastName} /> : null}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.nickName')}
              lineWidth={1.5}
              onChangeText={(userNickName)=> this.setState({userNickName})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userNickName}
            />
            {userNickName ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetNickName} /> : null}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.birthday')}
              lineWidth={1.5}
              onChangeText={(userBirthday)=> this.setState({userBirthday})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userBirthday}
            />
            {userBirthday ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetBirthday} /> : null}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.address')}
              lineWidth={1.5}
              onChangeText={(userAddress)=> this.setState({userAddress})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userAddress}
            />
            {userAddress ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetAddress} /> : null}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.gender')}
              lineWidth={1.5}
              onChangeText={(userGender)=> this.setState({userGender})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userGender}
            />
            {userGender ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetGender} /> : null}
          </View>
        </SimpleAnimation>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.editInfoForm}>
            <TextField
              autoCapitalize='none'
              autoCorrect={false}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              label={I18n.t('profile.region')}
              lineWidth={1.5}
              onChangeText={(userRegion)=> this.setState({userRegion})}
              textColor='white'
              tintColor={MKColor.Green}
              value={userRegion}
            />
            {userRegion ? <Entypo style={styles.icon} name='cross' size={30} color={MKColor.LightGreen} onPress={this.resetRegion} /> : null}
          </View>
        </SimpleAnimation> */}
        <View style={styles.bottomProfile}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <TouchableOpacity style={styles.editInfoButton} onPress={this.updateUserInfo}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='edit' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.changeUserData')}</Text>
            </TouchableOpacity>
            {/* {userFirstName && userLastName && userNickName && userBirthday && userAddress && userGender && userRegion ?
            <TouchableOpacity style={styles.editInfoButton} onPress={this.updateUserInfo}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='edit' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.changeUserData')}</Text>
            </TouchableOpacity> :
             <TouchableOpacity style={styles.disableButton} disabled={true}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                 <AntDesign name='edit' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.changeUserData')}</Text>
            </TouchableOpacity>} */}
          </SimpleAnimation>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <TouchableOpacity style={styles.backButton} onPress={()=> Actions.edit()}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='back' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.back')}</Text>
            </TouchableOpacity>
          </SimpleAnimation>
        </View>
      </ScrollView>
    );
  }
}

console.ignoredYellowBox = ['Setting a timer'];

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  bottomProfile: {
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
  editInfoButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  editInfoForm: {
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
    paddingLeft: 5
  }
});

AppRegistry.registerComponent('EditInfo', ()=> EditProfile);