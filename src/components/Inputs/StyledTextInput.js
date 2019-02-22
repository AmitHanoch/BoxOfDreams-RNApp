import React from 'react';
import { TextInput, StyleSheet, Platform } from 'react-native';
import consts from '../../utils/Constants';

const StyledTextInput = ({
    placeholder,
    style,
    onChangeText,
    multiline,
    editable,
    value
}) => (
    <TextInput 
        style={[styles.inputStyle, style]} 
        placeholder={placeholder}
        onChangeText={text => onChangeText(text)}
        multiline={multiline}
        editable={editable}
        value={value} />
);

const styles = StyleSheet.create({
    inputStyle: {
        textAlign: 'right',
        width: '100%',
        fontSize: 15,
        borderBottomColor: consts.COLORS.PRIMARY_BLUE,
        borderBottomWidth: 1,
        marginVertical: Platform.OS === 'ios' ? 8 : undefined,
        
    }
});

export default StyledTextInput;
