import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import consts from '../../utils/Constants';

const StyledTextInput = ({
    placeholder,
    style,
    onChangeText,
    multiline
}) => (
    <TextInput 
        style={[styles.inputStyle, style]} 
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        multiline={multiline} />
);

const styles = StyleSheet.create({
    inputStyle: {
        width: '100%',
        fontSize: 15,
        borderBottomColor: consts.COLORS.PRIMARY_BLUE,
        borderBottomWidth: 1,
    }
});

export default StyledTextInput;
