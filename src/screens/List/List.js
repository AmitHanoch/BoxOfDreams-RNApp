import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import { ListItem } from '../../components';
import firebase from 'react-native-firebase';
// import Detail from './Detail/Detail';

const PAGE_SIZE = 3;

/*
  Props:
   isDone - Indicator if to show done dreams or open dreams
*/
class List extends PureComponent {
    constructor(props) {
      super(props);
      
      // Hold a ref to DB
      this.ref = firebase.firestore().collection('Dreams');

      this.state = { 
        loading: true,
	      dreams: [],
        refreshing: false
       };
    }

    componentDidMount() {
      // Get the first dreams
      this.ref.where("isDone", "==", this.props.isDone)
        .orderBy('creation', 'DESC')
        .limit(PAGE_SIZE)
        .get().then(this.handleData);
    }

    loadMoreDreams = () => {
        var lastDocument = this.state.dreams[this.state.dreams.length - 1].doc;
        
        // Get more dreams
        this.ref.where("isDone", "==", this.props.isDone)
          .orderBy('creation', 'DESC')
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

    renderContent() {
      // if we load data for the first time we won't show a list
      if (this.state.loading && this.state.dreams.length === 0) {
        return null;
      }
      
      return (
        <FlatList
            data={this.state.dreams}
            keyExtractor={item => item.key}
            renderItem={this.renderItem}
            style={styles.listStyle}
            onEndReached={this.loadMoreDreams}
            onEndReachedThreshold={1}
            onRefresh={this.refreshDreams}
            refreshing={this.state.refreshing}
        />
      );
    }

    renderLoading() {
      // There is no list - render a large loading
      if (this.state.loading && this.state.dreams.length === 0) {
        return (<ActivityIndicator size="large" color="rgb(38,122,204)" style={styles.largeLoadingStyle} />);
      }
      // Loading more items - render a small loading
      else if (this.state.loading) {
        return (<ActivityIndicator size="large" color="rgb(38,122,204)" />);
      }

      // No need to load
      return null;
    }

    render() {
      return (
        <View style={styles.container}>
          {this.renderContent()}
          {this.renderLoading()}
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      bottom: 64
    },
    listStyle: {
      backgroundColor: '#f5f6f5'
    },
    largeLoadingStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      transform: [{ scale: 2 }]
    }
  });
  
export default List;