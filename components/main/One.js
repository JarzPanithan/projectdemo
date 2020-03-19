import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class One extends Component{
  render(){
    return(
      <View style={styles.container}>
        <OneScreen />
      </View>
    );
  }
}

class OneScreen extends Component {
  render(){
    return(
      <View style={styles.container}>
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
  }
});