import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MKColor } from 'react-native-material-kit';
import Firebase from '../../../config/firebase';
import SettingButton from '../../settingButton';

export default class Details extends Component{
  render(){
    return(
      <View style={styles.container}>
        <DetailsScreen />
        <SettingButton />
      </View>
    );
  }
}

class DetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      newsImage: null,
      newsName: null,
      newsDetail: null,
      isLoading: false,
      errorMessage: null
    }
    // this.getDetailFromDatabase = this.getDetailFromDatabase.bind(this);
  }

  componentDidMount = ()=>{
    // this.getDetailFromDatabase();
  }

  // getDetailFromDatabase = async()=>{
  //   try {
  //     this.setState({isLoading: true});
  //     let dataRef = Firebase.firestore().collection('News').doc('5iN9iVr9VhX2jnRBrUDT');
  //     dataRef.get().then((snapshot)=>{
  //       if (snapshot.exists){
  //         const data = snapshot.data();
  //         const image = data.Url;
  //         const name = data.Name;
  //         const detail = data.Detail;
  //         this.setState({
  //           newsImage: image,
  //           newsName: name,
  //           newsDetail: detail,
  //           isLoading: false
  //         });
  //         // console.log('News Image: ' + this.state.newsImage);
  //         // console.log('News Name: ' + this.state.newsName);
  //         // console.log('News Detail: ' + this.state.newsDetail);
  //       }
  //     }).catch((error)=>{
  //       this.setState({errorMessage: error.message, isLoading: false});
  //       console.log(error.message);
  //     });
  //   } catch (error){
  //     console.log(error.message);
  //   }
  // }

  render(){
    console.log(this.props.text);
    return(
      <View style={styles.container}>
        <Image style={{width: '100%', height: '75%'}} source={{uri: 'https://i.pinimg.com/originals/14/86/d0/1486d0a91baa6f93d1f1ba42562a0973.jpg'}} />
        <View style={{marginTop: 10}}>
          <Text style={styles.newsHeader}>This is News header</Text>
          <Text style={styles.newsHeader}>{this.props.text}</Text>
        </View>
        <View style={styles.detailContents}>
          <Text style={styles.newsDetail}>This is News detail</Text>
        </View> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    backgroundColor: '#212F3D',
    flex: 1,
    // justifyContent: 'center'
  },
  detailContents: {
    marginTop: 20
  },
  newsDetail: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center'
  },
  newsHeader: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('Details', ()=> Details);