import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { Row } from '../../../components';
import { getPlatformElevation } from '../../../utils';
import tabs from './TabsData';
import Tab from './Tab';

class BottomBar extends PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          selectedTabIndex: 2
        };
    }
    onTabPress = p_tabIndex =>{
        this.setState({selectedTabIndex: p_tabIndex});
    }
    render() {
        return (
            <Row style={styles.container}>
              <Tab tab={tabs[0]} onPress={this.onTabPress} isSelected={this.state.selectedTabIndex === 0}/>
              <Tab tab={tabs[1]} onPress={this.onTabPress} isSelected={this.state.selectedTabIndex === 1}/>
              <Tab tab={tabs[2]} onPress={this.onTabPress} isSelected={this.state.selectedTabIndex === 2}/>
            </Row>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      ...getPlatformElevation(4),
      height: 64,
      paddingHorizontal: 16,
      justifyContent: 'center',
    }
});
  
export default BottomBar;
  