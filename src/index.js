/**
 * @format
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, Platform, StyleSheet, Text, View } from 'react-native';
import { name as appName } from '../app.json';

import configureStore from './store';
import AppNavigator from './navigator';
import applyConfigSettings from './config';
import NetworkInfo from './services/NetworkInfo';
import { networkInfoListener } from './actions/NetworkInfoActions';
import { DataHelper } from './helpers';

const reducers = require('./reducers').default;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});
class App extends Component {
  state = {
    isLoading: true,
    appConfigData: {},
    store: configureStore(reducers, () => {
      this.setState({ isLoading: false }, () => {
        DataHelper.setStore(this.state.store);

        this.loadingCompleted();
      });
    })
  };

  componentDidMount() {
    NetworkInfo.networkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
  }

  componentWillUnmount() {
    NetworkInfo.removeNetworkInfoListener(
      this.state.store.dispatch,
      networkInfoListener
    );
  }

  loadingCompleted = () => {
    // RedirectionHelper.redirectIfLoggedIn(data);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent(appName, () => App);
