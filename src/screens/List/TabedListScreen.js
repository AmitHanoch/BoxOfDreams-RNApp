import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

import Toolbar from './Toolbar/Toolbar';
import List from './List';
import assets from '../../assets';

const DoneDreamsRoute = () => (
  <List isDone={true} />
);
const OpenDreamsRoute = () => (
  <List isDone={false} />
);

export default class TabedListScreen extends React.Component {
  state = {
    index: 1,
    routes: [
      { key: 'doneDreams', title: 'חלומות שהוגשמו' },
      { key: 'openDreams', title: 'חלומות פתוחים' },
    ],
  };

  renderTabBar = props => {
    return (<TabBar
        {...props}
        indicatorStyle={styles.indicatorStyle}
        labelStyle={styles.labelStyle}
        style={styles.tabViewStyle}
        renderLabel={(tabRoute) => {
          if (tabRoute.route.key === 'doneDreams' && this.state.index === 0
              ||
              tabRoute.route.key === 'openDreams' && this.state.index === 1) {
              return (<Text style={[styles.labelStyle, {color: 'rgb(38,112,204)'}]}> {tabRoute.route.title} </Text>);
          }

          return (<Text style={[styles.labelStyle, {color: 'rgb(156,156,156)'}]}> {tabRoute.route.title} </Text>);
        }}
      />);
  }
  render() {
    return (
      <View style={styles.container}>
        <Toolbar>
          <Image style={styles.titleContainer} source={assets['Title']} />
        </Toolbar>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            doneDreams: DoneDreamsRoute,
            openDreams: OpenDreamsRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 64 }}
          renderTabBar={this.renderTabBar}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  tabViewStyle: {
    backgroundColor: 'white'
  },
  labelStyle: {
    color: 'black',
    fontWeight: 'bold',
  },
  indicatorStyle: {
    backgroundColor: 'rgb(38,112,204)'
  },
  titleContainer: {
    width: 149,
    height: 36,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
});