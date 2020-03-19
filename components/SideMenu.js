import React, { Component } from 'react';
import { Alert, AppRegistry, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import I18n from '../util/i18n/i18n';

export default class SideMenu extends Component{
  render(){
    return(
      <View style={styles.container}>
        <SideMenuScreen />
      </View>
    );
  }
}

class SideMenuScreen extends Component{
  render(){
    return(
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.headerSideMenu}>{I18n.t('sideMenu.category')}</Text>
        </View>
        <View style={{marginTop: 15}}>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Actions.news()}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <FontAwesome style={styles.icon} name='newspaper-o' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.news')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <FontAwesome5 style={styles.icon} name='newspaper' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.interNews')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Actions.techs()}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <FontAwesome style={styles.icon} name='mobile-phone' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.it')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <Ionicons style={styles.icon} name='md-football' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.sports')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Actions.games()}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <Ionicons style={styles.icon} name='logo-game-controller-b' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.games')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <FontAwesome5 style={styles.icon} name='diagnoses' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.lifestyle')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <Entypo style={styles.icon} name='heart' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.healthy')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <MaterialCommunityIcons style={styles.icon} name='wallet-travel' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.travel')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <FontAwesome style={styles.icon} name='money' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.money')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <Entypo style={styles.icon} name='video' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.video')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={()=> Alert.alert('Go to another page.')}>
            <Animatable.View animation='rotate' delay={3000} duration={3500} iterationCount='infinite'>
              <FontAwesome style={styles.icon} name='picture-o' size={25} color='white' />
            </Animatable.View>
            <Text style={styles.categoryArticle}>{I18n.t('sideMenu.inforgraphic')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  categoryArticle: {
    color: 'white',
    fontSize: 20
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    padding: 5,
    width: 230
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#212F3D',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  headerSideMenu: {
    marginTop: 25,
    color: 'white',
    fontSize: 28
  },
  icon: {
    marginRight: 10
  }
});

AppRegistry.registerComponent('SideMenu', ()=> SideMenu);