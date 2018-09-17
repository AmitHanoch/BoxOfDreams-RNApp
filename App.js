import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TabbedListScreen from  './src/screens/List/TabbedListScreen';
import { BottomBar } from './src/components';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTabIndex: 2
    };
  }
  onTabPress = p_tabIndex => {
    this.setState({selectedTabIndex: p_tabIndex});
  }
  renderTabContent(){
    switch (this.state.selectedTabIndex) {
      case 0:
        return (<Text>Contact Tab</Text>);
      case 1:
        return (<Text>About Tab</Text>);
      case 2:
        return (<TabbedListScreen />); 
      default:
        return null;
    }
  }
  render() {
    return (

      <View style={styles.container}>
        {this.renderTabContent()}    
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
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});
