import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { ListItem } from '../../components';
import firebase from 'react-native-firebase';
import Detail from './Detail/Detail';

/*
  Props:
   isDone - Indicator if to show done dreams or open dreams
*/
class List extends PureComponent {
    constructor(props) {
      super(props);
      
      // Hold a ref to DB
      this.ref = firebase.firestore().collection('Dreams');

      // Event for subscribe and unsubscribe the firestore updates
      this.unsubscribe = null;

      this.state = { 
        loading: true,
	      dreams: [],
        selectedItem: null
       };
    }

    componentDidMount() {
      // subscibe when component is visible
        this.unsubscribe = this.ref.where("isDone", "==", this.props.isDone).onSnapshot(this.onCollectionUpdate);
    }
  
    componentWillUnmount() {
      // unsubscribe when component is not visible
        this.unsubscribe();
    }

    // Callback will pop when the data has changed
    onCollectionUpdate = (querySnapshot) => {
      const dreams = [];

      querySnapshot.forEach((doc) => {
        const { dreamName } = doc.data();
          dreams.push({
            key: doc.id,
            doc, // DocumentSnapshot
            dreamName
          });
      });

      this.setState({ 
        dreams,
        loading: false,
      });
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
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              style={styles.listStyle}
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