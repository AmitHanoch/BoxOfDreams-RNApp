import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import { Toolbar, Tabs } from '../../components';
import AboutContent from './AboutContent';
import consts from '../../utils/Constants';
import DonorsList from './DonorstList';

const AboutRoute = () => (
  <AboutContent paramValue={consts.PARAM_KEYS.ABOUT} />
);

const VisionRoute = () => (
  <AboutContent paramValue={consts.PARAM_KEYS.VISION} />
);

const DonorsRoute = () => (
  <DonorsList />
);

const tabRoutes =  [
  { key: "0", title: 'אודות' },
  { key: "1", title: 'חזון' },
  { key: "2", title: 'תורמים' },
];

const tabScenes = SceneMap({
  "0": AboutRoute,
  "1": VisionRoute,
  "2": DonorsRoute,
});


export default class TabbedAboutScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar>
          <Text style={styles.titleContainer}>על העמותה</Text>
        </Toolbar>
        <Tabs routes={tabRoutes} scenes={tabScenes} defaultIndex={0} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f5f6f5',
  },  
  titleContainer: {
    color: 'rgb(38,112,204)',
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center'
  }
 });