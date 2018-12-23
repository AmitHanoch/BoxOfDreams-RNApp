import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';
import { consts } from '../../utils';

export default class AboutContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
        text: [],
        loading: true
    };
  }

  componentWillMount() {
      this.ref = firebase.firestore().collection(consts.PARAMS_COLLECTION_NAME);
  }

  componentDidMount() {
      this.ref.doc(this.props.paramValue).get().then((querySnapshot) => {
        var unformattedText = querySnapshot.data()['value'];

        // Firestore won't store line drops - so i made this constant string to be replaced with a line drop
        this.setState({
            text:  unformattedText.split('lineDrop').map(part => { return ({key: part}); }),
            loading: false
        });
      });
  }

  render() {
    const textByRows = this.state.text.map((row) => <Text style={styles.contentText}>{row.key.trim()}</Text>)

    // if we load data for the first time we won't show a list
    if (this.state.loading) {
        return (<View style={[styles.container, styles.center]}>
                  <ActivityIndicator size="large" color={consts.COLORS.PRIMARY_BLUE} style={styles.largeLoadingStyle} />
                </View>);
    }

    return (
        <ScrollView style={styles.container}>
            {textByRows}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    contentText: {
        backgroundColor: 'transparent',
        width: '100%',
        color: consts.COLORS.PRIMARY_TEXT,
        fontSize: 16,
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
        backgroundColor: 'transparent',
        padding: 8,
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      }
});
