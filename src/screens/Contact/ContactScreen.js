import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';

import { Toolbar, StyledTextInput, StyledButton } from '../../components';
import { getPlatformElevation } from '../../utils';

export default class ContactScreen extends PureComponent {
  constructor(props){
    super(props);

    this.state = {};
  }

  submit = () => {
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Toolbar style={{...getPlatformElevation(4)}}>
          <Text style={styles.toolBarTitle}>צור קשר</Text>
        </Toolbar>
        <View style={styles.content}>
          <Text style={[styles.text, {fontWeight: 'bold'}]}>רוצים להתנדב או לכתוב לנו על חלום של ילד? מלא פרטים ונציג העמותה יצור אתכם קשר</Text>

          <StyledTextInput placeholder="שם מלא" onChangeText={text => this.setState({name: text})} />
          <StyledTextInput placeholder="טלפון" onChangeText={text => this.setState({phone: text})} />
          <StyledTextInput placeholder="מייל" onChangeText={text => this.setState({mail: text})} />
          <StyledTextInput placeholder="מה תרצה לספר לנו?" multiline={true} onChangeText={text => this.setState({messageContent: text})} />

          <StyledButton onPressCallback={this.submit} text="שלח" style={styles.spaceTop}/>

          <Text style={styles.text}>העמותה אינה מחוייבת לקבל לטיפולה או להגשים את כל החלומות המתקבלים</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f5f6f5',
  },  
  content: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  toolBarTitle: {
    color: 'rgb(38,112,204)',
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center'
  },
  text: {
    lineHeight: 23,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    color: 'rgb(74,74,74)'
  },
  spaceTop: {
    marginTop: 32
  }
});