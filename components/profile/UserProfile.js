import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import Firebase from '../../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../../util/i18n/i18n';

export default class UserProfile extends Component{
  render(){
    return(
      <View style={styles.container}>
        <UserProfileForm />
      </View>
    );
  }
}

class UserProfileForm extends Component{
  constructor(props){
    super(props);
    console.ignoredYellowBox = ['Setting a timer'];
    this.state = {
      userName: '',
      userEmail: '',
      userAvatar: '',
      userVerified: '',
      userId: '',
      userFirstName: '',
      userLastName: '',
      // userUserName: '',
      // userNickName: '',
      // userAddress: '',
      // userBirthday: '',
      // userGender: '',
      // userRegion: ''
    }
    this.retrieveUserData = this.retrieveUserData.bind(this);
    this.retrieveUserDatabase = this.retrieveUserDatabase.bind(this);
  }

  componentDidMount = ()=>{
    this.retrieveUserData();
    this.retrieveUserDatabase();
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
  //             console.log(data.Firstname + ' ' + data.Lastname);
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

  render(){
    const { userName, userEmail, userAvatar, userId } = this.state;
    const { userID, userFirstName, userLastName, userUserName } = this.state;

    return(
      <View style={styles.container}>
        <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
          <View style={styles.profileForm}>
            <Image
              style={styles.avatar}
              source={{uri: userAvatar}}
              // source={require('../../assets/images/Avatar.bmp')}
            />
            <View style={{flexDirection: 'row'}}>
              <FontAwesome style={styles.alignIcons} name='user-circle' size={30} color='white' />
              <View style={styles.informationBox}>
                <Text style={[styles.whiteText, {fontSize: 22}]}>{userName}</Text>
              </View>  
            </View>
            <View style={{flexDirection: 'row'}}>
              <MaterialCommunityIcons style={styles.alignIcons} name='email' size={30} color='white' />
              <View style={styles.informationBox}>
                {userEmail !== null ? <Text style={[styles.whiteText, {fontSize: 15}]}>{userEmail}</Text> :
                <Text style={[styles.whiteText, {fontSize: 18}]}>{I18n.t('anonymous')}</Text>}
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome style={styles.alignIcons} name='user' size={30} color='white' />
              <View style={styles.informationBox}>
                <Text style={[styles.whiteText, {fontSize: 22}]}>{userFirstName}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <FontAwesome style={styles.alignIcons} name='user' size={30} color='white' />
              <View style={styles.informationBox}>
                <Text style={[styles.whiteText, {fontSize: 22}]}>{userLastName}</Text>
              </View>
            </View>
          </View>
        </SimpleAnimation>
        <View style={styles.bottomProfile}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <TouchableOpacity style={styles.profileButton} onPress={()=> Actions.edit()}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='profile' size={20} color='white' />
              </Animatable.View>
              <Text style={styles.whiteText}>{I18n.t('button.editProfile')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={()=> Actions.main()}>
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

console.ignoredYellowBox = ['Setting a timer'];

const styles = StyleSheet.create({
  alignIcons: {
    marginRight: 10,
    marginTop: 20
  },
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
  bottomProfile: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36
  },
  container: {
    backgroundColor: '#212F3D',
    flex: 1,
  },
  informationBox: {
    backgroundColor: '#161F28',
    borderColor: MKColor.Green,
    borderRadius: 3,
    borderWidth: 1.5,
    // flexDirection: 'row',
    marginTop: 15,
    width: '75%'
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  profileForm: {
    alignItems: 'center', 
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 15
  },
  whiteText: {
    color: 'white',
    paddingLeft: 5
  }
});

AppRegistry.registerComponent('UserProfile', ()=> UserProfile);