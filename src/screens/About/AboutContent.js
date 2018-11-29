import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import consts from '../../utils/Constants';

export default class AboutContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: "",
        loading: true
    };
  }

  componentWillMount() {
      this.ref = firebase.firestore().collection(consts.PARAMS_COLLECTION_NAME);
  }

  componentDidMount() {
      this.ref.doc(this.props.paramValue).get().then((querySnapshot) => {
            this.setState({
                text: querySnapshot.data()['value'],
                loading: false
            });
      });
  }

  render() {
    // if we load data for the first time we won't show a list
    if (this.state.loading) {
        return (<View style={styles.container}>
                <ActivityIndicator size="large" color={consts.COLORS.PRIMARY_BLUE} style={styles.largeLoadingStyle} />
            </View>);
    }

    return (
        <Text style={styles.contentText}>
            {this.state.text}
        </Text>
    );
  }
}

const styles = StyleSheet.create({
    contentText: {
        backgroundColor: 'transparent',
        width: '100%',
        padding: 8,
        color: 'rgb(74,74,74)',
        fontSize: 16,
        lineHeight: 23,
        textAlign: 'right',
        writingDirection: 'rtl'
      },
      largeLoadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 2 }]
      },
      container: {
        ...StyleSheet.absoluteFillObject,
        bottom: 64,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      },
});
