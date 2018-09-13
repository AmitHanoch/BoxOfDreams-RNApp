import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import { ListItem } from '../../components';
import data from '../../data/data';
import Detail from './Detail/Detail';

/*
  Props:
   isDone - Indicator if to show done dreams or open dreams
*/
class List extends PureComponent {
    constructor(props) {
      super(props);
  
      this.state = { selectedItem: null };
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
      let relevantData = [];
      const doneFilter = this.props.isDone;
      //TODO: implement this properly
      data.forEach(function(item){
        if(item.isDone === doneFilter){
         relevantData.push(item);
        }
      });

      if (this.state.selectedItem !== null) {
        return(<Detail item={this.state.selectedItem} onBackPressed={this.onBackPressed} />);
      }

      return (
        <View>
          <FlatList
              data={relevantData}
              keyExtractor={item => item.id}
              renderItem={this.renderItem}
              style={styles.listStyle}
          />
        </View>
      );
    }
    render() {
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