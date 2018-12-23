import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import { consts, getPlatformElevation } from '../../utils';

const ITEMS_IN_ROW = 3;

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
        var allLinks = querySnapshot.data()['value'];

        // We need to format the list to a matrix of -n- rows and 3 (ITEMS_IN_ROW) colums in here we do that - splitListToMatrix
        this.setState({imagesLinks: this.splitListToMatrix(allLinks), loading: false});
    });
  }

  splitListToMatrix(list) {
    var rows = [];

    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const rowNumber = parseInt(index / ITEMS_IN_ROW);
      if (!rows[rowNumber]) {
        rows.push({key: rowNumber.toString(), urls: []});
      }
      rows[rowNumber].urls.push({key: element});
    }

    return rows;
  }

  renderItem = row => {
    const images = row.item.urls.map(url => <View style={styles.frame}><Image source={{uri: url.key}} style={styles.imageStyle} /></View>)

    return (<View style={styles.listRow}>
      {images}
    </View>);
  }

  render() {
      // if we load data for the first time we won't show a list
    if (this.state.loading) {
        return (<View style={styles.container}>
                    <ActivityIndicator size="large" color={consts.COLORS.PRIMARY_BLUE} style={styles.largeLoadingStyle} />
                </View>);
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.imagesLinks}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        bottom: 64,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      frame: {
        margin: 8,
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
      },
      imageStyle: {
        resizeMode: 'contain',
        height: 60,
        width: 60,
      },
      listRow: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        flexDirection: 'row',
        width: '100%',
      }
});
