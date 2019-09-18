// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import styles from './styles';

import { ButtonView, Text } from '../../components';
import { Metrics, Colors } from '../../theme';

class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}></View>
        <View
          style={{
            height: Metrics.ratio(70),
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ButtonView
            style={{
              width: Metrics.ratio(50),
              height: Metrics.ratio(50),
              borderRadius: Metrics.ratio(25),
              borderColor: Colors.themeColors.themeGrey,
              borderWidth: Metrics.ratio(1),
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text>R</Text>
          </ButtonView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions
)(Dashboard);
