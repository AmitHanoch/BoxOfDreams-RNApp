import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import { Toolbar, Tabs }from '../../components';
import List from './List';
import assets from '../../assets';


export default class TabbedListScreen extends PureComponent {
  
  DoneDreamsRoute = () => (
    <List isDone={true} navigate={this.props.navigate} />
  );

  OpenDreamsRoute = () => (
    <List isDone={false} navigate={this.props.navigate} />
  );

  tabRoutes =  [
    { key: "0", title: 'חלומות שהוגשמו' },
    { key: "1", title: 'חלומות פתוחים' },
  ];
  
  tabScenes = SceneMap({
      "0": this.DoneDreamsRoute,
      "1": this.OpenDreamsRoute,
  });

  render() {
    return (
      <View style={styles.container}>
        <Toolbar>
          <Image style={styles.titleContainer} source={assets['Title']} />
        </Toolbar>
        <Tabs routes={this.tabRoutes} scenes={this.tabScenes} defaultIndex={1} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },  
  titleContainer: {
    width: 149,
    height: 36,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
});