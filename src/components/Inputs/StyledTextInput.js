import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

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
        borderBottomColor: 'rgb(38,112,204)',
        borderBottomWidth: 1,
    }
});

export default StyledTextInput;
