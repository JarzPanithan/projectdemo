import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, StyleSheet, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';

export default class Loading extends Component{
  render(){
    return(
      <View style={styles.container}>
        <LoadingForm />
      </View>
    );
  }
}

class LoadingForm extends Component{
  render(){
    return(
      <View style={styles.container}>
        <ActivityIndicator
          color={MKColor.Green}
          size={60}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  }
});

AppRegistry.registerComponent('Loading', ()=> Loading);