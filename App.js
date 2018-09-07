import React from 'react';
import { View, StyleSheet} from 'react-native';
import List from './src/screens/List/List';

export default class App extends React.Component {
  onItemPressed = item => {
    // TODO: move to details screen
    console.log('Detail screen -> ' + item);
  };
  render() {
    return (
      <View style={styles.container}>
        <List onItemPress={this.onItemPressed}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
