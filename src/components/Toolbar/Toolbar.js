import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import { Row } from '../../components';

class Toolbar extends PureComponent {
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.statusBar} />
            <View>
              <Row style={styles.toolbarContainer}>
                {this.props.children}
              </Row>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    toolbarContainer: {
      height: 56,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    statusBar: {
      height: 24,
      backgroundColor: 'white',
    }
  });
  
  export default Toolbar;
  