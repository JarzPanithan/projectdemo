import React, { Component } from 'react';
import { ActivityIndicator, AppRegistry, Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { Card, CardAction, CardButton, CardContent, CardImage, CardTitle } from 'react-native-cards';
import Firebase from '../../config/firebase';
import _ from 'lodash';
import I18n from '../../util/i18n/i18n';
import SettingButton from '../settingButton';

export default class Main extends Component{
  render(){
    return(
      <View style={styles.container}>
        <MainScreen />
        <SettingButton />
      </View>
    );
  }
}

class MainScreen extends Component {
  constructor(props){
    super(props);
    this.page = 1;
    this.state = {
      image: null,
      images: [],
      isLoading: false,
      isRefreshing: false,
      errorMessage: null
    }
    this.getNewsFromDatabase = this.getNewsFromDatabase.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount = ()=>{
    this.getNewsFromDatabase();
  }

  getNewsFromDatabase = async()=>{
    try {
      this.setState({isLoading: true});
      let dataRef = Firebase.firestore().collection('Image-Details');
      dataRef.get().then((snapshot)=>{
        const imageList = [];
        snapshot.forEach((doc)=>{
          const data = doc.data();
          const imageId = data.ID;
          const imageUrl = data.Url;
          imageList.push({id: imageId, url: imageUrl});
          const image = _.values(imageList);
          this.setState({images: image, isLoading: false});
          // console.log(this.state.images);
        });
      }).catch((error)=>{
        this.setState({errorMessage: error.message});
        console.log(error.message);
      });
    } catch (error){
      console.log(error.message);
    }
  }

  onRefresh = ()=>{
    this.setState({isRefreshing: true});
    this.getNewsFromDatabase().then(()=>{
      this.setState({isRefreshing: false});
    });
  }

  renderSeperator = ()=>{
    return(
      <View styles={{backgroundColor: MKColor.LightGreen, height: 2, width: '100%'}} />
    );
  }

  renderFooter = ()=>{
    const { isLoading } = this.state;
    if (!isLoading){
      return null;
    } else if (isLoading){
      <ActivityIndicator size={60} color={MKColor.LightGreen} />
    }
  }

  logout = async()=>{
    try {
      await Firebase.auth().signOut().then(()=>{
        Alert.alert(I18n.t('logout'));
      }).catch((error)=>{
        this.setState({errorMessage: error.message});
        console.log('Logout Error: ' + error.message);
      });
    } catch (error){
      console.log(error.message);
    }
  }

  render(){
    const { images } = this.state;
    const loading = this.state.isLoading;
    const refreshing = this.state.isRefreshing;

    return(
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={()=> Actions.one({text: 'Hello World!'})}>
          <Text style={{color: 'white'}}>This is main page.</Text>
        </TouchableOpacity> */}
        {loading === true ? <View style={styles.loader}><ActivityIndicator size={60} color={MKColor.LightGreen} /></View> :
        <FlatList
          data={images}
          ItemSeparatorComponent={this.renderSeperator}
          keyExtractor={(item, index)=> index.toString()}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />}
          // onEndReached={this.loadMoreImages}
          renderItem={({item})=>
            <Card>
              <CardImage source={{uri: item.url}} />
              <CardTitle subtitle='Example' />
              <CardContent text='Content' />
              <CardAction seperator={false} inColumn={true}>
                <CardButton
                  style={styles.detailButton}
                  color='white'
                  onPress={()=> Actions.details({text: 'Hello World!'})}
                  title='See Detail'
                />
              </CardAction>
            </Card>}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backButton: {
    alignItems: 'center',
    backgroundColor: '#FF003A',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowRadius: 1
  },
  cardImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover'
  },
  cardText: {
    fontSize: 16,
    padding: 10
  },
  container: {
    // alignItems: 'center',
    backgroundColor: '#212F3D',
    // flex: 1,
    // justifyContent: 'center'
  },
  detailButton: {
    alignItems: 'center',
    backgroundColor: MKColor.Green,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10
  },
  gridViewContainer: {
    justifyContent:'center',
    overflow: "hidden",
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#231F20',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 6,
    padding: 5
  },
  loader: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  whiteText: {
    color: 'white'
  }
});

AppRegistry.registerComponent('Main', ()=> Main);