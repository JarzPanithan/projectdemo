import React, { Component } from 'react';
import { ActivityIndicator, Alert, AppRegistry, FlatList, Image, RefreshControl, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { MKColor } from 'react-native-material-kit';
import { Actions } from 'react-native-router-flux';
import { Card, CardAction, CardButton, CardContent, CardImage, CardTitle } from 'react-native-cards';
import Firebase from '../../../config/firebase';
import I18n from '../../../util/i18n/i18n';
import _ from 'lodash';
import SettingButton from '../../settingButton';

export default class News extends Component{
  render(){
    return(
      <View style={styles.container}>
        <NewsScreen />
        <SettingButton />
      </View>
    );
  }
}

class NewsScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      newsData: [],
      isLoading: false,
      isRefreshing: false,
      errorMessage: null
    }
    this.getNewsFromDatabase = this.getNewsFromDatabase.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
  }

  componentDidMount = ()=>{
    this.getNewsFromDatabase();
  }

  getNewsFromDatabase = async()=>{
    try {
      this.setState({isLoading: true});
      let dataRef = Firebase.firestore().collection('News');
      dataRef.get().then((snapshot)=>{
        const newsList = [];
        snapshot.forEach((doc)=>{
          const data = doc.data();
          const newsId = data.ID;
          const newsUrl = data.Url;
          const newsName = data.Name;
          const newsDate = data.Date;
          const newsDetail = data.Detail;
          newsList.push({
            id: newsId,
            url: newsUrl,
            name: newsName,
            date: newsDate,
            detail: newsDetail
          });
          const news = _.values(newsList);
          this.setState({newsData: news, isLoading: false});
          // console.log(this.state.newsData);
        });
      }).catch((error)=>{
        this.setState({errorMessage: error.message, isLoading: false});
        console.log(error.message);
      });
    } catch (error){
      console.log(error.message);
    }
  }

  onRefresh = ()=>{
    this.setState({isLoading: true});
    this.getNewsFromDatabase().then(()=>{
      this.setState({isLoading: false});
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
      <View>
        <ActivityIndicator size={60} color={MKColor.LightGreen} />
      </View>
    }
  }

  render(){
    const { newsData } = this.state;
    const loading = this.state.isLoading;
    const refreshing = this.state.isRefreshing;

    return(
      <View style={styles.container}>
        {loading === true ? <View style={styles.loader}><ActivityIndicator size={60} color={MKColor.LightGreen} /></View> :
        <FlatList
          data={newsData}
          ItemSeparatorComponent={this.renderFooter}
          keyExtractor={(item, index)=> index.toString()}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.4}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.onRefresh}
            />}
          renderItem={({item})=>
            <Card>
              <CardImage source={{uri: item.url}} />
              <CardTitle style={styles.newsTitle} title={item.name} subtitle={item.date} />
              {/* <CardContent text={item.detail} /> */}
              <CardAction seperator={false} inColumn={true}>
                <CardButton
                  style={styles.detailButton}
                  color='white'
                  // onPress={()=> Actions.details({id: item.id})}
                  onPress={()=> Actions.details({text: 'Hello World!'})}
                  title={I18n.t('button.detail')}
                />
              </CardAction>
            </Card>}
          />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  newsTitle: {
    fontSize: 20
  }
});

AppRegistry.registerComponent('News', ()=> News);