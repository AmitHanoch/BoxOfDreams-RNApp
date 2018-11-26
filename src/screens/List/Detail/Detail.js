import React, { PureComponent } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DetailToolbar from './DetailToolbar';

import { getPlatformElevation } from '../../../utils';
import { Row } from '../../../components';

/*
    Props:
        item - The selected item
*/
class Detail extends PureComponent {
    constructor(props) {
        super(props);
    }
    renderDetailSection = item => {
        if (item.isDone) {
            return(
                <View style={[styles.cardBox, {position: 'absolute', bottom: 0, padding: 8}]}>
                    <Row>
                        <Text style={[styles.regularText, {fontSize: 18, fontWeight: 'bold'}]}>
                            התרגשתם?
                        </Text>
                    </Row>
                    <Text style={[styles.regularText, {fontWeight: 'bold', color: 'rgb(22,94,181)'}]}>
                        שתפו
                    </Text>
                    <Text style={styles.regularText}>
                         את הגשמת החלום ואולי אנשים נוספים יקחו חלק בחלום הבא.
                    </Text>
                </View>
            );
        }

        return(
            <View style={styles.cardBox}>
            </View>
        );
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    };

    render() {
        const item  = this.props.navigation.getParam('item');

        return (
            <View style={styles.container}>
                <DetailToolbar image={item.imageDownloadURL} onBackPressed={this.onBackPressed} />

                    <View style={styles.cardBox}>
                        <Text style={styles.titleStyle}> {item.dreamName}</Text>
                        <View style={styles.horizontalLine}></View>
                        <Text style={styles.descriptionStyle}> {item.dreamDescription}</Text>
                    </View>

                    {this.renderDetailSection(item)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#f5f6f5'
    },
    cardBox: {
      backgroundColor: 'white',
      ...getPlatformElevation(4),
      flexDirection: 'column'
    },
    titleStyle: {
        textAlign: 'center',
        alignSelf: 'stretch',
        width: '100%',
        padding: 8,
        fontSize: 18,
    },
    descriptionStyle: {
        textAlign: 'right',
        alignSelf: 'stretch',
        width: '100%',
        padding: 16,
        fontSize: 14,
        color: 'rgb(74,74,74)'
    },
    horizontalLine: {
        marginHorizontal: 16,
        borderBottomColor: '#f5f6f5',
        borderBottomWidth: 1,
    },
    regularText: {
        textAlign: 'right',
        alignSelf: 'stretch',
        width: '100%',
        fontSize: 14,
        color: 'rgb(74,74,74)'
    }
  });

export default Detail;