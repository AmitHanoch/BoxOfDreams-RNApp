import React from 'react';
import { Text, TouchableHighlight, StyleSheet } from 'react-native';

import consts from '../../utils/Constants';

const StyledButton = ({
    onPressCallback,
    text,
    style
}) => (
    <TouchableHighlight
        style={[styles.submit, style]}
        onPress={() => onPressCallback(item)}
        underlayColor={consts.COLORS.OFF_WHITE}>
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
        backgroundColor: consts.COLORS.PRIMARY_BLUE,
        borderRadius:10,
        borderWidth: 1,
        borderColor: consts.COLORS.OFF_WHITE,
        width: '100%',
        alignItems: 'center'
      },
      submitText:{
          color: consts.COLORS.OFF_WHITE,
          textAlign:'center',
          fontSize: 18,
      }
  });

export default StyledButton;
