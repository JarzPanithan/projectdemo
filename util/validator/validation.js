'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import defaultRules from './defaultRules';
import defaultMessages from './defaultMessages';

export default class ValidationComponent extends Component {
  constructor(props) {
    super(props);
    this.errors = [];
    this.deviceLocale = props.deviceLocale || 'th';
    this.rules = props.rules || defaultRules;
    this.messages = props.messages || defaultMessages;
  }

  validate(fields) {
    this._resetErrors();
    for (const key of Object.keys(this.state)) {
      const rules = fields[key];
      if (rules) {
        this._checkRules(key, rules, this.state[key]);
      }
    };
    return this.isFormValid();
  }

  _checkRules(fieldName, rules, value) {
    for (const key of Object.keys(rules)) {
      const isRuleFn = (typeof this.rules[key] == "function");
      const isRegExp = (this.rules[key] instanceof RegExp);
      if ((isRuleFn && !this.rules[key](rules[key], value)) || (isRegExp && !this.rules[key].test(value))) {
        this._addError(fieldName, key, rules[key], isRuleFn);
      }
    }
  }

  _addError(fieldName, rule, value, isFn) {
    const errMsg = this.messages[this.deviceLocale][rule].replace("{0}", fieldName).replace("{1}", value);
    let [error] = this.errors.filter(err => err.fieldName === fieldName);
    if (error) {
      const index = this.errors.indexOf(error);
      error.messages.push(errMsg);
      this.errors[index] = error;
    } else {
      this.errors.push({
        fieldName,
        messages: [errMsg]
      });
    }
  }

  _resetErrors() {
    this.errors = [];
  }

  isFieldInError(fieldName) {
    return (this.errors.filter(err => err.fieldName === fieldName).length > 0);
  }

  isFormValid() {
    return this.errors.length == 0;
  }

  getErrorMessages(separator="\n") {
    return this.errors.map((err) => err.messages.join(separator)).join(separator);
  }

  getErrorsInField(fieldName) {
    const foundError = this.errors.find(err => err.fieldName === fieldName)
    if (!foundError) {
      return []
    }
    return foundError.messages
  }
}

ValidationComponent.propTypes = {
  deviceLocale: PropTypes.string,
  rules: PropTypes.object,
  messages : PropTypes.object
}