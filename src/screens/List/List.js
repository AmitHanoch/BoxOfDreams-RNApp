import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import Toolbar from './Toolbar/Toolbar';
import BottomBar from './BottomBar/BottomBar';
import { ListItem } from '../../components';
import data from '../../data/data';

/*
    Props:
      onItemPress - callback method when an item is pressed
*/
class List extends PureComponent {
    constructor(props) {
      super(props);
  
      this.state = { selectedItem: null };
    }
    onListItemPressed = item => {
      const { onItemPress } = this.props;
      this.setState({ selectedItem: item });
  
      onItemPress(item);
    };
    renderItem = item => {
      return(
        <ListItem item={item.item} onPress={this.onListItemPressed} />
      );
    }
    render() {
        return (
          <View style={styles.container}>
            <Toolbar />
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              style={styles.listStyle}
            />
            <BottomBar />
          </View>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
    },
    listStyle: {
        backgroundColor: '#f5f6f5'
    }
  });
  
  export default List;