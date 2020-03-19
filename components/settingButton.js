import React, { Component } from 'react';
import { Alert, Animated, AppRegistry, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import Firebase from '../config/firebase';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../util/i18n/i18n';

export default class Setting extends Component{
  render(){
    return(
      <View style={styles.container}>
        <SettingButton />
      </View>
    );
  }
}

class SettingButton extends Component{
  constructor(props){
    super(props);
    this.state = {
      animation: new Animated.Value(0),
      errorMessage: null
    }
    this.logout = this.logout.bind(this);
  }

  logout = async()=>{
    try {
      await Firebase.auth().signOut().then(()=>{
        Alert.alert(I18n.t('logout'));
      }).catch((error)=>{
        this.setState({errorMessage: error.message});
        console.log('Logout Error: ' + error.message);
      });
    } catch (error){
      console.log(error.message);
    }  
  }

  toggleOpen = ()=>{
    const { animation } = this.state;
    const toValue = this._open ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 200
    }).start();
    this._open = !this._open;
  }

  render(){
    const { animation } = this.state;

    const bgStyle = {
      transform: [{
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30]
        })
      }]
    }

    const logoutStyle = {
      transform: [{
        scale: animation
      }, {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70]
        })
      }]
    }

    const editStyle = {
      transform: [{
        scale: animation
      }, {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140]
        })
      }]
    }

    const homeStyle = {
      transform: [{
        scale: animation
      }, {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -210]
        })
      }]
    }

    // const labelPositionInterpolate = animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [-30, -90]
    // });

    // const opacityInterpolate = animation.interpolate({
    //   inputRange: [0, 0.8, 1],
    //   outputRange: [0, 0, 1]
    // });

    // const labelStyle = {
    //   opacity: opacityInterpolate,
    //   transform: [{
    //     translateX: labelPositionInterpolate
    //   }]
    // }

    return(
      <View style={styles.container}>
        <Animated.View style={[styles.background, bgStyle]} />
        <TouchableWithoutFeedback onPress={()=> Actions.main()}>
          <Animated.View style={[styles.settingButton, styles.menu, homeStyle]}>
            <FontAwesome name='home' size={30} color='white' />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={()=> Actions.profile()}>
          <Animated.View style={[styles.settingButton, styles.menu, editStyle]}>
            {/* <Animated.Text style={[styles.label, labelStyle]}>{I18n.t('button.userProfile')}</Animated.Text> */}
            <AntDesign name='edit' size={30} color='white' />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.logout}>
          <Animated.View style={[styles.settingButton, styles.menu, logoutStyle]}>
            {/* <Animated.Text style={[styles.label, labelStyle]}>{I18n.t('button.logout')}</Animated.Text> */}
            <AntDesign name='logout' size={30} color='white' />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this.toggleOpen}>
          <View style={[styles.settingButton, styles.setting]}>
            {/* <Animated.Text style={[styles.label, labelStyle]}>{I18n.t('button.setting')}</Animated.Text> */}
            <Ionicons name='md-settings' size={30} color='white' />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundColor: 'transparent',
    borderRadius: 30,
    bottom: 20,
    height: 60,
    position: 'absolute',
    right: 20,
    width: 60
  },
  container: {
    flex: 1
  },
  label: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 14,
    position: 'absolute'
  },
  logoutButton: {
    backgroundColor: MKColor.Red
  },
  menu: {
    backgroundColor: MKColor.Green
  },
  setting: {
    backgroundColor: MKColor.LightGreen
  },
  settingButton: {
    alignItems: 'center',
    borderRadius: 30,
    bottom: 20,
    height: 60,
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    shadowColor: '#333',
    shadowOffset: { x: 2, y: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    width: 60
  }
});

AppRegistry.registerComponent('settingButton', ()=> settingButton);