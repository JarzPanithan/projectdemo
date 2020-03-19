import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class GameNews extends Component{
  render(){
    return(
      <View style={styles.container}>
        <GameNewsScreen />
      </View>
    );
  }
}

class GameNewsScreen extends Component{
  render(){
    console.log(this.props.text);
    return(
      <View style={styles.container}>
        <Text style={{color: 'white'}}>This is Game News page.</Text>
        <Text style={{color: 'white'}}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#212F3D',
    flex: 1,
    justifyContent: 'center'
  },
});

AppRegistry.registerComponent('GameNews', ()=> GameNews);