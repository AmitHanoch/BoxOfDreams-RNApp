import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import { Row } from '../../components';

class Toolbar extends PureComponent {
    render() {
        return (
          <View style={styles.container}>
              <Row style={styles.toolbarContainer}>
                {this.props.children}
              </Row>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    toolbarContainer: {
      backgroundColor: 'white',
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 4
    }
  });
  
  export default Toolbar;
  