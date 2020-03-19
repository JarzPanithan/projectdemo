import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from "prop-types";
import { TextField } from 'react-native-material-textfield';
import { MKColor } from 'react-native-material-kit';
import I18n from '../util/i18n/i18n';

export default class PasswordInputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icEye: 'eye',
      isPassword: true
    }
  }

  getRef = (ref)=>{
    if (this.props.getRef) {
        this.props.getRef(ref)
      }
    }

  changePwdType = ()=>{
    const { isPassword } = this.state;
      this.setState({
        icEye: isPassword ? "eye" : "eye-slash",
        isPassword: !isPassword,
      });
    };

    render() {
      const { iconSize, iconColor, style } = this.props;
      const { icEye, isPassword } = this.state;

      return (
        <View style={style}>
           <TextField
              {...this.props}
              baseColor={MKColor.LightGreen}
              errorColor={MKColor.Red}
              // label={I18n.t('password')}
              labelTextStyle={{color: 'white'}}
              lineWidth={1.5}
              ref={this.getRef}
              textColor='white'
              tintColor={MKColor.Green}
              secureTextEntry={isPassword}
            />    
            <Icon style={styles.icon}
              name={icEye}
              size={iconSize}
              color={iconColor}
              onPress={this.changePwdType}
            />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 33,
    right: 0
  }
});

PasswordInputText.defaultProps = {
  iconSize: 25,
  iconColor: MKColor.LightGreen
}

PasswordInputText.propTypes = {
  iconSize: PropTypes.number,
  label: PropTypes.string,
  iconColor: PropTypes.string
};