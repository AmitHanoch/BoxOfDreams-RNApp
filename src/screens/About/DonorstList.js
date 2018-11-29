import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';
import firebase from 'react-native-firebase';
import consts from '../../utils/Constants';

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
        var rows = [];
        var allLinks = querySnapshot.data()['value'];

        for (let index = 0; index < allLinks.length; index++) {
          const element = allLinks[index];
          if (!rows[parseInt(index / 3)]) {
            rows.push([]);
          }
          rows[parseInt(index / 3)].push(element);
        }
        
        this.setState({imagesLinks: rows, loading: false});
    });
  }

  renderItem = row => {
    const images = row.item.map(image => <Image source={{uri: image}} style={styles.imageStyle} />)

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
      imageStyle: {
        alignSelf: 'stretch',
        height: 50,
        width: 50
      },
      listRow: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
      }
});
