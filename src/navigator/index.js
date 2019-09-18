// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Stack,
  Scene,
  Drawer,
  Router,
  Actions,
  ActionConst
} from 'react-native-router-flux';
import { View } from 'react-native';
import { Colors } from '../theme';
import { Empty } from '../containers';

import styles from './styles';

const mapStateToProps = state => {
  return {
    cartData: state.cart.data
  };
};

const navigator = Actions.create(
  <Stack
    key='root'
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}
    backTitle=' '
  >
    <Scene title='Select Country Code' key='empty' component={Empty} />
  </Stack>
);

export default () => <AppNavigator navigator={navigator} />;

const AppNavigator = connect()(Router);
