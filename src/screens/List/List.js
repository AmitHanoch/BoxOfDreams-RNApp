import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { ListItem } from '../../components';
import firebase from 'react-native-firebase';
import { consts } from '../../utils';

const PAGE_SIZE = 4;

/*
  Props:
   isDone - Indicator if to show done dreams or open dreams
*/
class List extends PureComponent {
    constructor(props) {
      super(props);
      
      this.state = { 
        loading: true,
	      dreams: [],
        refreshing: false
       };
    }

    componentWillMount() {
      // Hold a ref to DB
      this.ref = firebase.firestore().collection(consts.DREAMS_COLLECTION_NAME);
    }

    componentDidMount() {
      // Get the first dreams
      this.ref.where(consts.DREAM_OBJECT_FIELDS.IS_DONE, "==", this.props.isDone)
        .orderBy(consts.DREAM_OBJECT_FIELDS.CREATION, 'DESC')
        .limit(PAGE_SIZE)
        .get().then(this.handleData);
    }

    loadMoreDreams = () => {
        var lastDocument = this.state.dreams[this.state.dreams.length - 1].doc;
        
        // Get more dreams
        this.ref.where(consts.DREAM_OBJECT_FIELDS.IS_DONE, "==", this.props.isDone)
          .orderBy(consts.DREAM_OBJECT_FIELDS.CREATION, 'DESC')
          .startAfter(lastDocument)
          .limit(PAGE_SIZE - 1)
          .get().then(this.handleData);

        this.setState({loading: true});
    }

    // Callback will pop when the data has changed
    handleData = (querySnapshot) => {
      const dreams = this.state.dreams;

      querySnapshot.forEach((doc) => {
          dreams.push(this.createDreamObjectFromDocument(doc));
      });

      this.setState({ 
        dreams,
        loading: false,
        refreshing: false
      });
    }

    createDreamObjectFromDocument = snapshotObj => {
      var dream = snapshotObj.data();

      dream.key = snapshotObj.id;
      dream.doc = snapshotObj;

      return dream;
    }

    refreshDreams = () => {
      this.setState({loading: false, dreams: [], refreshing: true});
      this.componentDidMount();
    };

    onListItemPressed = item => {
      this.props.navigate('Detail', { item: item });
    };

    renderItem = item => {
      return(
        <ListItem item={item.item} onPress={this.onListItemPressed} />
      );
    }

    render() {
      // if we load data for the first time we won't show a list
      if (this.state.loading && this.state.dreams.length === 0) {
        return (<View style={styles.container}>
                  <ActivityIndicator size="large" color={consts.COLORS.PRIMARY_BLUE} style={styles.largeLoadingStyle} />
                </View>);
      }
      
      return (
        <View style={styles.container}>
          <View style={styles.listWrapper}>
            <FlatList
                data={this.state.dreams}
                keyExtractor={item => item.key}
                renderItem={this.renderItem}
                onEndReached={this.loadMoreDreams}
                onEndReachedThreshold={0.3}
                onRefresh={this.refreshDreams}
                refreshing={this.state.refreshing}
            />
          </View>

          {this.state.loading ? <ActivityIndicator size="large" color={consts.COLORS.PRIMARY_BLUE} style={styles.smallLoadingStyle}/> : null}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      bottom: 64,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    listWrapper: {
      height: '100%',
      width: '100%'
    },
    largeLoadingStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ scale: 2 }]
    },
    smallLoadingStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      alignItems: 'center',
      bottom: 0
    }
  });
  
export default List;