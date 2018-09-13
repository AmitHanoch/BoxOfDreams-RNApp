import React, { PureComponent } from 'react';
import { View,
        Image, 
        StyleSheet, 
        TouchableOpacity,
        Text 
    } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import Row from '../../../components/Row';

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
                <Image style={styles.imageStyle} source={this.props.image} />
                <Row style={styles.toolbarContainer}>
                    <Row style={styles.backContainer}>
                        <TouchableOpacity onPress={onBackPressed} style={{width: 30, height: 30}}>
                            <Ionicons name="ios-arrow-back" size={24} color="white" />
                        </TouchableOpacity>
                    </Row>
                    <View style={styles.menuIconContainer}>
                        <Feather name="share" size={24} color="white" />
                    </View>
                </Row>  
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