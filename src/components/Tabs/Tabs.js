import React, { PureComponent } from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import consts from '../../utils/Constants';


/* 
    Props:
        routes - the routes for the tabs
        scenes - the scene map for the tabs
        defaultIndex - the default index to be selected
*/
export default class Tabs extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        index: this.props.defaultIndex,
        routes: this.props.routes
      };
    }
    renderTabBar = props => {
        return (<TabBar
            {...props}
            indicatorStyle={styles.indicatorStyle}
            labelStyle={styles.labelStyle}
            style={styles.tabViewStyle}
            renderLabel={(tabRoute) => {
              if (tabRoute.route.key == this.state.index){
                  return (<Text style={[styles.labelStyle, {color: consts.COLORS.PRIMARY_BLUE}]}> {tabRoute.route.title} </Text>);
              }
    
              return (<Text style={[styles.labelStyle, {color: consts.COLORS.GREY}]}> {tabRoute.route.title} </Text>);
            }}
          />);
    }
    render() {
        const { scenes } = this.props;

        return (
            <TabView
                navigationState={this.state}
                renderScene={scenes}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 64 }}
                renderTabBar={this.renderTabBar}
            />
        );
    }    
}

const styles = StyleSheet.create({
    tabViewStyle: {
      backgroundColor: consts.COLORS.WHITE
    },
    labelStyle: {
      color: 'black',
      fontWeight: 'bold',
    },
    indicatorStyle: {
      backgroundColor: consts.COLORS.PRIMARY_BLUE
    },
    titleContainer: {
      width: 149,
      height: 36,
      alignSelf: 'center',
      resizeMode: 'contain'
    },
  });