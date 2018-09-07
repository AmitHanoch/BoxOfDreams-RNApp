import React from 'react';
import { View, StyleSheet } from 'react-native';
import List from './src/screens/List/List';
import { BottomBar } from './src/components';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <List />        
        <BottomBar style={styles.footer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});
