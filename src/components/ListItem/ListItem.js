import React, { PureComponent } from 'react';
import { Image, Text, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';

import { getPlatformElevation } from '../../utils';
import Row from '../Row';
import assets from '../../assets';

/*
    Props:
        onPress - callback method when an item is pressed
        item - the dream item to be presented
*/
class ListItem extends PureComponent {
    onPressed = event => {
        const { onPress, item } = this.props;
        onPress(item, event.nativeEvent);
    };
    render() {
        const { item, style } = this.props;
        const { dreamName, image, ...rest } = item;

        return (
            <View style={styles.conteiner}>
                <TouchableWithoutFeedback onPress={this.onPressed} style={{backgroundColor: '#f5f6f5'}}>
                    <View style={[styles.cardBox, style]} pointerEvents="box-only">
                        <Row style={styles.topSection}>
                            <Image style={styles.imageStyle} source={assets[image]} />
                        </Row>
                        <Row style={styles.bottomSection}>
                            <Text style={styles.titleStyle}> {dreamName}</Text>
                        </Row>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    conteiner: {
        padding: 8
    },
    cardBox: {
      backgroundColor: 'white',
      marginHorizontal: 8,
      borderRadius: 4,
      ...getPlatformElevation(4),
      flexDirection: 'column'
    },
    imageStyle: {
      flex: 1,
      borderRadius: 4,
      alignSelf: 'stretch',
      height: 146,
      width: undefined
    },
    topSection: {
      flex: 1,
      flexDirection: 'column',
      height: undefined
    },
    bottomSection: {
      flex: 2,
      padding: 4,
      height: undefined
    },
    titleStyle: {
      textAlign: 'center',
      alignSelf: 'stretch',
      width: '100%',
      fontSize: 18,
    }
  });
  
  export default ListItem;