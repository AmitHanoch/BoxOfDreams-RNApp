import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Toolbar } from '../../components';
import { getPlatformElevation } from '../../utils';

export default class ContactScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar style={{...getPlatformElevation(4)}}>
          <Text style={styles.toolBarTitle}>צור קשר</Text>
        </Toolbar>
        <Text style={styles.title}>רוצים להתנדב או לכתוב לנו על חלום של ילד? מלא פרטים ונציג העמותה יצור אתכם קשר</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f5f6f5',
  },  
  toolBarTitle: {
    color: 'rgb(38,112,204)',
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center'
  },
  title: {
    padding: 16,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(74,74,74)'
  },
});