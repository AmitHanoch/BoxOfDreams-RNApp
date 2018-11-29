import React, { Component } from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import consts from '../../utils/Constants';

export default class DonorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: false,
        imagesLinks: []
    };
  }

  componentWillMount() {
    this.ref = firebase.firestore().collection(consts.PARAMS_COLLECTION_NAME);
  }

  componentDidMount() {
    this.ref.doc(consts.PARAM_KEYS.DONORS_IMAGE_DOWNLOAD_LINKS).get().then((querySnapshot) => {
        var links = [];

        querySnapshot.data()['value'].forEach(link => links.push({key: link}));

        this.setState({imagesLinks: links, loading: false});
    });
  }

  render() {
      // if we load data for the first time we won't show a list
    if (this.state.loading) {
        return (<View style={styles.container}>
                    <ActivityIndicator size="large" color={consts.COLORS.PRIMARY_BLUE} style={styles.largeLoadingStyle} />
                </View>);
    }

    const images = this.state.imagesLinks.map(link => <Image source={{uri: link.key}} style={styles.imageStyle} />)
    return (
      <ScrollView style={styles.container}>
        {images}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        bottom: 64,
        backgroundColor: 'transparent',
      },
      imageStyle: {
        alignSelf: 'stretch',
        height: 50,
        width: 50
      },
});
