import React, { PureComponent } from 'react';
import { View,
        Image, 
        StyleSheet, 
    } from 'react-native';

/*
    Props:
        image - background image
        onBackPressed - callback when back is pressed
*/
class DetailToolbar extends PureComponent {
    constructor(props) {
        super(props);
    }
    render(){
        const { onBackPressed } = this.props;

        return(
            <View style={styles.container}>
                <Image style={styles.imageStyle} source={{uri: this.props.image}} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 250,
    },
    backContainer: {
        flex: 1,
        alignItems: 'center',
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    toolbarContainer: {
        height: 56,
        paddingTop: 32,
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    imageStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        width: '100%',
        alignSelf: 'stretch',
    }
});

export default DetailToolbar;