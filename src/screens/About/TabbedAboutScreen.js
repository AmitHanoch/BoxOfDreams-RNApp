import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import { Toolbar, Tabs } from '../../components';
import AboutContent from './AboutContent';
import DonorsList from './DonorstList';
import { consts } from '../../utils';

const AboutRoute = () => (
  <View style={styles.content}>
    <AboutContent paramValue={consts.PARAM_KEYS.ABOUT} />
  </View>
);

const VisionRoute = () => (
  <View style={styles.content}>
    <AboutContent paramValue={consts.PARAM_KEYS.VISION} />
  </View>
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
    backgroundColor: consts.COLORS.OFF_WHITE,
  },  
  titleContainer: {
    color: consts.COLORS.PRIMARY_BLUE,
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center'
  },
  content: {
    height: '100%',
  }
 });