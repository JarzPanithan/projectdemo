import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { SimpleAnimation } from 'react-native-simple-animations';
import * as Animatable from 'react-native-animatable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import I18n from '../../util/i18n/i18n';

export default class Secure extends Component{
  render(){
    return(
      <View style={styles.container}>
        <SecureChange />
      </View>
    );
  }
}

class SecureChange extends Component{
  render(){
    return(
      <View style={styles.container}>
        <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
          <SimpleAnimation delay={500} duration={1000} fade staticType='zoom'>
            <Text style={[styles.whiteText, {fontSize: 24, marginTop: 5}]}>{I18n.t('changePassword')}</Text>
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
  whiteText: {
    color: 'white',
    marginLeft: 5
  }
});

AppRegistry.registerComponent('SecureChange', ()=> SecureChange);