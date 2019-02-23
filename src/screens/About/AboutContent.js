import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, ActivityIndicator, I18nManager } from 'react-native';
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
        // In order to display them properly we use the unique key as a counter
        var partsArray = [];
        var uniqueKeyGenerator = 1;
        unformattedText.split('lineDrop').forEach(part => {
          partsArray.push({
            key: uniqueKeyGenerator++,
            text: part
          })
        });      

        this.setState({
            text:  partsArray,
            loading: false
        });
      });
  }

  render() {
    const textByRows = this.state.text.map((row) => <Text key={row.key} style={styles.contentText}>{row.text.trim()}</Text>)

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
        textAlign: I18nManager.isRTL ? 'left' : 'right',
        writingDirection: 'rtl'
      },
      largeLoadingStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ scale: 2 }]
      },
      container: {
        ...StyleSheet.absoluteFill,
        bottom: 64,
        backgroundColor: 'transparent',
        margin: 8,
      },
      center: {
        justifyContent: 'center',
        alignItems: 'center',
      }
});
