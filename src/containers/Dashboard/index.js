// @flow
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View } from 'react-native';
import { BarIndicator } from 'react-native-indicators';
import styles from './styles';

import Voice from 'react-native-voice';

import { ButtonView, Text } from '../../components';
import { Metrics, Colors } from '../../theme';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    Voice.onSpeechPartialResults = this.onSpeechPartialResultsHandler.bind(
      this
    );
    Voice.onSpeechError = this.onSpeechResultsErrorHandler.bind(this);

    this.state = {
      isRecording: false,
      displayString: ''
    };
  }

  onSpeechStartHandler = event => {
    console.log(event);

    this.setState({ isRecording: true });
  };

  onSpeechEndHandler = event => {
    console.log(event);

    this.setState({ isRecording: false });
  };

  onSpeechResultsHandler = event => {
    console.log(event);
    const results = event.value.join(' ');

    this.setState({ displayString: results });
  };

  onSpeechPartialResultsHandler = event => {
    console.log(event);
  };

  onSpeechResultsErrorHandler = event => {
    console.log(event);

    this.setState({ isRecording: false });
  };

  renderContent = () => {
    const { displayString } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text color='white'>{displayString}</Text>
      </View>
    );
  };

  renderFooter = () => {
    return (
      <View
        style={{
          height: Metrics.ratio(70),
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {this.renderRecordingControl()}
      </View>
    );
  };

  renderRecordingControl = () => {
    const { isRecording } = this.state;

    if (!isRecording) {
      return (
        <ButtonView
          style={{
            width: Metrics.ratio(50),
            height: Metrics.ratio(50),
            borderRadius: Metrics.ratio(25),
            borderColor: Colors.white,
            borderWidth: Metrics.ratio(1),
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onPress={() => {
            Voice.start('en-US');

            setTimeout(() => {
              Voice.stop;
            }, 5000);
          }}
        >
          <Text color='white'>R</Text>
        </ButtonView>
      );
    }

    return <BarIndicator color='white' count={5} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.renderContent()}
        {this.renderFooter()}
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
