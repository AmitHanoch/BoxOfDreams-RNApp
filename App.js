import React from 'react';
import { View, StyleSheet, I18nManager} from 'react-native';

import TabbedListScreen from  './src/screens/List/TabbedListScreen';
import { BottomBar } from './src/components';
import TabbedAboutScreen from './src/screens/About/TabbedAboutScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Detail from './src/screens/List/Detail/Detail';
import ContactScreen from './src/screens/Contact/ContactScreen';
import { getPlatformElevation } from './src/utils';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0
    };
  }
  onTabPress = p_tabIndex => {
    this.setState({selectedTabIndex: p_tabIndex});
  }
  renderTabContent(navigate){
    switch (this.state.selectedTabIndex) {
      case 0:
        return (<TabbedListScreen navigate={navigate} />); 
      case 1:
        return (<TabbedAboutScreen />);
      case 2:
        return (<ContactScreen />);
      default:
        return null;
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        {this.renderTabContent(navigate)}    
        <BottomBar style={styles.footer} onTabPress={this.onTabPress} />
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
    ...getPlatformElevation(16),
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Detail: {screen: Detail},
    Contact: {screen: ContactScreen}
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentWillMount() {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }

  render() {
    return <AppContainer />;
  }
}
