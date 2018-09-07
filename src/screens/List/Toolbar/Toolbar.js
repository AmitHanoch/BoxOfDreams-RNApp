import React, { PureComponent } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Row } from '../../../components';
import assets from '../../../assets';

class Toolbar extends PureComponent {
    render() {
        return (
          <View style={styles.container}>
            <View style={styles.statusBar} />
            <View>
              <Row style={styles.toolbarContainer}>
                <Image style={styles.titleContainer} source={assets['Title']} />
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
    titleContainer: {
      width: 149,
      height: 36,
      alignSelf: 'center',
      resizeMode: 'contain'
    },
    statusBar: {
      height: 24,
      backgroundColor: 'white',
    }
  });
  
  export default Toolbar;
  