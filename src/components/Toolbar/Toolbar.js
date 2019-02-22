import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';

import { Row } from '../../components';
import { consts } from '../../utils';

class Toolbar extends PureComponent {
    render() {
        return (
              <Row style={[styles.toolbarContainer, this.props.style]}>
                {this.props.children}
              </Row>
        );
    }
}

const styles = StyleSheet.create({
    toolbarContainer: {
      backgroundColor: consts.COLORS.WHITE,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 4
    }
  });
  
  export default Toolbar;
  