import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class TechNews extends Component{
  render(){
    return(
      <View style={styles.container}>
        <TechNewsScreen />
      </View>
    );
  }
}

class TechNewsScreen extends Component{
  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity onPress={()=> Actions.games({text: 'Hello World!'})}>
          <Text style={{color: 'white'}}>This is Tech News page.</Text>
        </TouchableOpacity>
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

AppRegistry.registerComponent('TechNews', ()=> TechNews);