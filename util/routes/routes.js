import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import I18n from '../i18n/i18n';
import SettingButton from './components/settingButton';
import Loader from '../../components/Loader';
import Intro from '../../components/Intro';
import Login from '../../components/login/Login';
import Register from '../../components/login/Register';
import SecureRegister from '../../components/login/SecureRegister';
import ForgotPassword from '../../components/login/ForgotPassword';
import SecureChange from '../../components/login/SecureChange';
import UserProfile from '../../components/profile/UserProfile';
import EditProfile from '../../components/profile/EditProfile';
import Main from '../../components/main/Main';

export default class Routes extends Component{
  render(){
    return(
      <Router navigationBarStyle={styles.navBar} title={styles.headerWhite}>
        <Scene key='root'>
          <Scene key='setting' component={SettingButton} hideNavBar={true} />
          <Scene key='loading' component={Loader} hideNavBar={true} initial={true} />
          <Scene key='intro' component={Intro} hideNavBar={true} />
          <Scene key='login' component={Login} title={I18n.t('login')} type='reset' />
          <Scene key='register' component={Register} title={I18n.t('register')} type='reset' />
          <Scene key='secure' component={SecureRegister} hideNavBar={true} type='reset' />
          <Scene key='forgotPass' component={ForgotPassword} title={I18n.t('forgotPassword')} type='reset' />
          <Scene key='securePass' component={SecureChange} hideNavBar={true} type='reset' />
          <Scene key='profile' component={UserProfile} title={I18n.t('profile.userProfile')} type='reset' />
          <Scene key='edit' component={EditProfile} title={I18n.t('profile.editProfile')} type='reset' />
          <Scene key='main' component={Main} title={i18n.t('main.mainScreen')} type='reset' />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  headerWhite: {
    color: 'white'
  },
  navBar: {
    backgroundColor: '#212F3D'
  }
});