import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

const StyledButton = ({
    onPressCallback,
    text
}) => (
    <TouchableHighlight
        style={styles.submit}
        onPress={() => onPressCallback(item)}
        underlayColor='#fff'>
            <Text style={styles.submitText}>{text}</Text>
    </TouchableHighlight>
);

const styles = StyleSheet.create({
    submit:{
        marginRight:40,
        marginLeft:40,
        marginTop:10,
        paddingTop:8,
        paddingBottom: 8,
        backgroundColor:'rgb(38,112,204)',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        width: '100%',
        alignItems: 'center'
      },
      submitText:{
          color:'#fff',
          textAlign:'center',
          fontSize: 18,
      }
  });

export default StyledButton;
