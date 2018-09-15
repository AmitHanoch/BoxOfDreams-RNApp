import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import Row from '../Row';
import { getPlatformElevation } from '../../utils';
import Tab from './Tab';

const tabs = [
    {
      id: 0,
      imageCode: "TabContact",
      selectedImageCode: "TabContactSelected",
      title: "צור קשר",
    },
    {
      id: 1,
      imageCode: "TabAbout",
      selectedImageCode: "TabAboutSelected",
      title: "על העמותה",
    },
    {
      id: 2,
      imageCode: "TabDreams",
      selectedImageCode: "TabDreamsSelected",
      title: "חלומות",
    }
];

/*
    Props:
      onTabPress - Callback when a tab is pressed function(tabIndex)
*/
class BottomBar extends PureComponent {
    constructor(props) {
        super(props);
    
        this.state = {
          selectedTabIndex: 2
        };
    }
    onTabPress = p_tabIndex => {
      const tabCallback = this.props.onTabPress;
      this.setState({selectedTabIndex: p_tabIndex});

      tabCallback(p_tabIndex);
    }
    render() {
        return (
            <Row style={[styles.container, this.props.style]}>
              <Tab tab={tabs[0]} onPress={this.onTabPress} isSelected={this.state.selectedTabIndex === 0}/>
              <Tab tab={tabs[1]} onPress={this.onTabPress} isSelected={this.state.selectedTabIndex === 1}/>
              <Tab tab={tabs[2]} onPress={this.onTabPress} isSelected={this.state.selectedTabIndex === 2}/>
            </Row>
        );
      }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgb(245,246,245)',
      ...getPlatformElevation(4),
      height: 64,
      paddingHorizontal: 16,
      justifyContent: 'center',
    }
});
  
export default BottomBar;
  