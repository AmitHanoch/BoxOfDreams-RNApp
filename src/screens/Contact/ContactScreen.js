import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

import { Toolbar, StyledTextInput, StyledButton } from '../../components';
import { getPlatformElevation, consts } from '../../utils';

export default class ContactScreen extends PureComponent {
  constructor(props){
    super(props);

    this.state = {};
  }

  submit = () => {
    
  }

  renderDreamRef = () => {
    if (this.props.navigation == undefined) {
      return null;
    }

    const dreamRef = this.props.navigation.getParam('dreamRef');
    if (dreamRef == undefined) {
      return null;
    }

    return(
      <View style={styles.dreamReference}>
        <Text style={[styles.text, styles.dreamReferenceText]}>נשלח בהקשר לחלום: {dreamRef.dreamName}</Text>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: consts.COLORS.WHITE}}>
        <View style={styles.container}>
          <Toolbar>
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

          {this.renderDreamRef()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: consts.COLORS.OFF_WHITE,
  },  
  content: {
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  toolBarTitle: {
    color: consts.COLORS.PRIMARY_BLUE,
    fontWeight: 'bold',
    fontSize: 24,
    alignSelf: 'center'
  },
  text: {
    lineHeight: 23,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 15,
    color: consts.COLORS.PRIMARY_TEXT
  },
  dreamReference: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    width: '100%',
    backgroundColor: consts.COLORS.PRIMARY_BLUE,
  },
  dreamReferenceText: {
    color: consts.COLORS.WHITE
  },  
  spaceTop: {
    marginTop: 32
  }
});