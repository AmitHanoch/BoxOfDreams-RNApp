import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
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

    renderDoneDream = () => {
        return(
            <View style={[styles.cardBox, {position: 'absolute', bottom: 0, padding: 8}]}>
                <Row>
                    <Text style={[styles.regularText, {fontSize: 18, fontWeight: 'bold'}]}>
                        התרגשתם?
                    </Text>
                </Row>
                <Text style={styles.regularText}>
                    <Text style={[styles.regularText, {fontWeight: 'bold', color: 'rgb(22,94,181)'}]}>
                        שתפו 
                    </Text>
                    {" "}
                    את הגשמת החלום ואולי אנשים נוספים
                    {"\n"} 
                    יקחו חלק בחלום הבא.
                </Text>
            </View>
        );
    }

    renderOpenDream = item => {
        return(
            <View style={[styles.cardBox, {position: 'absolute', bottom: 0, padding: 8}]}>
                <Text style={styles.titleStyle}>
                    בכדי להגשים את החלום אנחנו צריכים
                </Text>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.descriptionStyle}>
                    {item.dreamStages}
                </Text>
                
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => this.wantToHelpPress(item)}
                    underlayColor='#fff'>
                        <Text style={styles.submitText}>אני רוצה להגשים</Text>
                </TouchableHighlight>
            </View>
        );
    }

    wantToHelpPress = dream => {
        // TODO: navigate to contacts
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

                    {item.isDone ? this.renderDoneDream() : this.renderOpenDream(item)}
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
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: "100%"
    },
    titleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        padding: 8,
        fontSize: 18,
    },
    descriptionStyle: {
        textAlign: 'right',
        alignSelf: 'stretch',
        padding: 16,
        fontSize: 14,
        color: 'rgb(74,74,74)'
    },
    horizontalLine: {
        paddingHorizontal: 32,
        width: "100%",
        borderBottomColor: 'rgb(156,156,156)',
        borderBottomWidth: 1,
    },
    regularText: {
        textAlign: 'right',
        fontSize: 14,
        color: 'rgb(74,74,74)',
        width: '100%'
    },
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

export default Detail;