import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { ListItem } from '../../components';
import firebase from 'react-native-firebase';
import Detail from './Detail/Detail';

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
        selectedItem: null
       };
    }

    componentDidMount() {
      // Get the first dreams
      this.ref.where("isDone", "==", this.props.isDone)
        .orderBy('creation', 'DESC')
        .limit(PAGE_SIZE)
        .get().then(this.onCollectionUpdate);
    }

    loadMoreDreams = () => {
        var lastDocument = this.state.dreams[this.state.dreams.length - 1].doc;
        
        // Get more dreams
        this.ref.where("isDone", "==", this.props.isDone)
          .orderBy('creation', 'DESC')
          .startAfter(lastDocument)
          .limit(PAGE_SIZE)
          .get().then(this.onCollectionUpdate);
    }

    // Callback will pop when the data has changed
    onCollectionUpdate = (querySnapshot) => {
      const dreams = this.state.dreams;

      querySnapshot.forEach((doc) => {
          dreams.push(this.createDreamObjectFromDocument(doc));
      });

      this.setState({ 
        dreams,
        loading: false,
      });
    }

    createDreamObjectFromDocument = snapshotObj => {
      const { dreamName, creation } = snapshotObj.data();

      return {
        key: snapshotObj.id,
        doc: snapshotObj, // DocumentSnapshot
        dreamName: dreamName,
        creation: creation
      };
    }

    onListItemPressed = item => {
      this.setState({ selectedItem: item });
    };

    onBackPressed = () => {
      this.setState({ selectedItem: null });
    };

    renderItem = item => {
      return(
        <ListItem item={item.item} onPress={this.onListItemPressed} />
      );
    }

    renderContent() {
      if (this.state.selectedItem !== null) {
        return(<Detail item={this.state.selectedItem} onBackPressed={this.onBackPressed} />);
      }

      return (
        <View>
          <FlatList
              data={this.state.dreams}
              keyExtractor={item => item.key}
              renderItem={this.renderItem}
              style={styles.listStyle}
              onEndReached={this.loadMoreDreams}
              onEndReachedThreshold={0}
          />
        </View>
      );
    }

    render() {
      if (this.state.loading) {
        return null; // TODO: render a loagind animation
      }

      return (
        <View style={styles.container}>
          {this.renderContent()}
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
    }
  });
  
export default List;