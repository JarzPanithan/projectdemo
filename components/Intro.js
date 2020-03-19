import React, { Component } from 'react';
import { AppRegistry, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../util/i18n/i18n';

export default class Intro extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Animatable.View style={styles.introIcon} animation='fadeIn' delay={3500} duration={4000} iterationCount='infinite'>
          <SimpleAnimation delay={1000} duration={1500} fade staticType='bounce'>
            <Image 
              style={{width: 200, height: 200}}
              source={require('../assets/AppIcon.png')} 
            />
          </SimpleAnimation>
        </Animatable.View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <SimpleAnimation delay={1000} duration={1500} fade staticType='bounce'>
            <Text style={styles.title}>{I18n.t('welcome')}</Text>
          </SimpleAnimation>
        </View>
        <View style={styles.bottomLogin}>
          <SimpleAnimation delay={1500} duration={2000} fade staticType='bounce'>
            <TouchableOpacity style={styles.loginButton} onPress={()=> Actions.login()}>
              <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
                <AntDesign name='login' size={20} color='white' />
              </Animatable.View>   
              <Text style={styles.whiteText}>{I18n.t('button.login')}</Text>
            </TouchableOpacity>
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
  bottomLogin: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10
  },
  container: { 
    backgroundColor: '#212F3D',
    flex: 1
  },
  introIcon: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  loginButton: {
    alignItems: 'center',
    backgroundColor: MKColor.LightGreen,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  registerButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  title: {
    color: 'white',
    fontSize: 30
  },
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

AppRegistry.registerComponent('Intro', ()=> Intro);