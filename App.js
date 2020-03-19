import React, { Component } from 'react';
import { AppRegistry, StyleSheet } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Router, Scene, Stack } from 'react-native-router-flux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from './util/i18n/i18n';
// import Routes from './util/routes/routes';
import SettingButton from './components/settingButton';
import Loader from './components/Loader';
import Intro from './components/Intro';
import Login from './components/login/Login';
import Register from './components/login/Register';
import SecureRegister from './components/login/SecureRegister';
import ForgotPassword from './components/login/ForgotPassword';
import SecureChange from './components/login/SecureChange';
import UserProfile from './components/profile/UserProfile';
import EditProfile from './components/profile/EditProfile';
import EditInfo from './components/profile/EditInfo';
import Main from './components/main/Main';
import One from './components/main/One';
import SideMenu from './components/SideMenu';
import News from './components/main/categories/News';
import TechNews from './components/main/categories/TechNews';
import GameNews from './components/main/categories/GameNews';
import Details from './components/main/categories/Details';

export default class App extends Component{
  render(){
    return(
      <Router navigationBarStyle={styles.navBar} titleStyle={styles.header}>
        <Scene drawer={true} key='sideMenu' contentComponent={SideMenu} drawerPosition='right'>
          <Stack key='root'>
            <Scene key='setting' component={SettingButton} hideNavBar={true} />
            <Scene key='loading' component={Loader} hideNavBar={true} initial={true} />
            <Scene key='intro' component={Intro} hideNavBar={true} />
            <Scene key='login' component={Login} title={I18n.t('login')} type='reset' />
            <Scene key='register' component={Register} title={I18n.t('register')} type='reset' />
            <Scene key='secure' component={SecureRegister} hideNavBar={true} type='reset' />
            <Scene key='forgotPass' component={ForgotPassword} title={I18n.t('forgotPassword')} type='reset' />
            <Scene key='securePass' component={SecureChange} hideNavBar={true} type='reset' />
            <Scene key='profile' component={UserProfile} title={I18n.t('profile.userProfile')} type='reset' />
            <Scene key='edit' component={EditProfile} title={I18n.t('profile.editProfile')} />
            <Scene key='editInfo' component={EditInfo} title={I18n.t('profile.editInfo')} />
            <Scene tabs={true} key='main' activeBackgroundColor={MKColor.Green} activeTintColor='white' title='News' lazy={true} showLabel={false}
              backToInitial type='reset' wrap={false}>
              <Scene key='home' component={Main} title={I18n.t('main.mainScreen')} icon={homeIcon} type='reset' />
              <Scene key='one' component={One} title='Test Props' />
              <Scene key='news' component={News} title={I18n.t('main.newsScreen')} icon={newsIcon} />
              <Scene key='techs' component={TechNews} title='Tech News' icon={techIcon} />
              <Scene key='games' component={GameNews} title={I18n.t('main.gameScreen')} icon={gameIcon} />
            </Scene>
            <Scene key='details' component={Details} hideNavBar />
          </Stack>
        </Scene>
      </Router>
    );
  }
}

const homeIcon = ()=>{
  return(
    <FontAwesome style={styles.iconTabs} name='home' size={25} color='white' />
  );
}

const newsIcon = ()=>{
  return(
    <FontAwesome style={styles.iconTabs} name='newspaper-o' size={25} color='white' />
  );
}

const techIcon = ()=>{
  return(
    <FontAwesome style={styles.iconTabs} name='mobile-phone' size={25} color='white' />
  );
}

const gameIcon = ()=>{
  return(
    <Ionicons style={styles.iconTabs} name='logo-game-controller-b' size={25} color='white' />
  );
}

console.disableYellowBox = true;

const styles = StyleSheet.create({
  header: {
    color: 'white'
  },
  iconTabs: {
    color: 'black'
  },
  navBar: {
    // backgroundColor: '#212F3D'
    backgroundColor: MKColor.Green
  }
});

AppRegistry.registerComponent('App', ()=> App);