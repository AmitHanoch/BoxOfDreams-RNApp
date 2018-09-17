import React, { PureComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import { Toolbar, Tabs }from '../../components';
import List from './List';
import assets from '../../assets';

const DoneDreamsRoute = () => (
  <List isDone={true} />
);
const OpenDreamsRoute = () => (
  <List isDone={false} />
);

const tabRoutes =  [
  { key: "0", title: 'חלומות שהוגשמו' },
  { key: "1", title: 'חלומות פתוחים' },
];

const tabScenes = SceneMap({
    "0": DoneDreamsRoute,
    "1": OpenDreamsRoute,
});

export default class TabbedListScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar>
          <Image style={styles.titleContainer} source={assets['Title']} />
        </Toolbar>
        <Tabs routes={tabRoutes} scenes={tabScenes} defaultIndex={1} />
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