import React, { Component } from 'react';
import * as Font from 'expo-font';

export default class Fonts extends Component{
  constructor(props){
    super(props);
    this.state = {
      loadingFont: false
    }
    this._kanitFonts = this._kanitFonts.bind(this);
  }

  componentDidMount(){
    this._kanitFonts();
  }

  async _kanitFonts(){
    await Font.loadAsync({
      'kanitBlack': require('../assets/fonts/Kanit-Black.ttf'),
      'kanitBlackItalic': require('../assets/fonts/Kanit-BlackItalic.ttf'),
      'kanitBold': require('../assets/fonts/Kanit-Bold.ttf'),
      'kanitBoldItalic': require('../assets/fonts/Kanit-BoldItalic.ttf'),
      'kanitExtraBold': require('../assets/fonts/Kanit-ExtraBold.ttf'),
      'kanitExtraBoldItalic': require('../assets/fonts/Kanit-ExtraBoldItalic.ttf'),
      'kanitExtraLight': require('../assets/fonts/Kanit-ExtraLight.ttf'),
      'kanitExtraLightItalic': require('../assets/fonts/Kanit-ExtraLightItalic.ttf'),
      'kanitLight': require('../assets/fonts/Kanit-Light.ttf'),
      'kanitLightItalic': require('../assets/fonts/Kanit-LightItalic.ttf'),
      'kanitMedium': require('../assets/fonts/Kanit-Medium.ttf'),
      'kanitMediumItalic': require('../assets/fonts/Kanit-MediumItalic.ttf'),
      'kanitRegular': require('../assets/fonts/Kanit-Regular.ttf'),
      'kanitRegularItalic': require('../assets/fonts/Kanit-RegularItalic.ttf'),
      'kanitSemiBold': require('../assets/fonts/Kanit-SemiBold.ttf'),
      'kanitSemiBoldItalic': require('../assets/fonts/Kanit-SemiBoldItalic.ttf'),
      'kanitThin': require('../assets/fonts/Kanit-Thin.ttf'),
      'kanitThinItalic': require('../assets/fonts/Kanit-ThinItalic.ttf')
    });
    this.setState({loadingFont: true});
  }
}