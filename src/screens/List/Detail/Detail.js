import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, SafeAreaView, I18nManager } from 'react-native';
import DetailToolbar from './DetailToolbar';

import { getPlatformElevation, consts } from '../../../utils';
import { Row, StyledButton } from '../../../components';

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
            <View style={[styles.cardBox, styles.contentSection]}>
                <Row>
                    <Text style={[styles.regularText, {fontSize: 18, fontWeight: 'bold'}]}>
                        התרגשתם?
                    </Text>
                </Row>
                <Text style={styles.regularText}>
                    <Text style={[styles.regularText, {fontWeight: 'bold', color: consts.COLORS.PRIMARY_BLUE}]}>
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
            <View style={[styles.cardBox, styles.contentSection]}>
                <Text style={styles.titleStyle}>
                    בכדי להגשים את החלום אנחנו צריכים
                </Text>
                <View style={styles.horizontalLine}></View>
                <Text style={styles.descriptionStyle}>
                    {item.dreamStages}
                </Text>
                
                <StyledButton onPressCallback={() => this.wantToHelpPress(item)} text="אני רוצה לעזור" />
            </View>
        );
    }

    wantToHelpPress = dream => {
        this.props.navigation.navigate('Contact', { dreamRef: dream });
    }

    onBackPressed = () => {
        this.props.navigation.goBack();
    };

    render() {
        const item = this.props.navigation.getParam('item');

        return (
            <SafeAreaView style={{flex: 1, backgroundColor: consts.COLORS.WHITE}}>
                <View style={styles.container}>
                    <DetailToolbar image={item.imageDownloadURL} onBackPressed={this.onBackPressed} />

                        <View style={[styles.cardBox, {...getPlatformElevation(4)}]}>
                            <Text style={styles.titleStyle}>{item[consts.DREAM_OBJECT_FIELDS.DREAM_NAME]}</Text>
                            <View style={styles.horizontalLine}></View>
                            <Text style={styles.descriptionStyle}>{item[consts.DREAM_OBJECT_FIELDS.DREAM_DESCRIPTION]}</Text>
                        </View>

                        {item.isDone ? this.renderDoneDream() : this.renderOpenDream(item)}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: consts.COLORS.OFF_WHITE
    },
    cardBox: {
      backgroundColor: consts.COLORS.WHITE,
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
        textAlign: I18nManager.isRTL ? 'left' : 'right',
        alignSelf: 'stretch',
        padding: 16,
        fontSize: 14,
        color: consts.COLORS.PRIMARY_TEXT
    },
    horizontalLine: {
        paddingHorizontal: 32,
        width: "100%",
        borderBottomColor: consts.COLORS.GREY,
        borderBottomWidth: 1,
    },
    regularText: {
        textAlign: I18nManager.isRTL ? 'left' : 'right',
        fontSize: 14,
        color: consts.COLORS.PRIMARY_TEXT,
        width: '100%'
    },
    contentSection: {
        position: 'absolute',
        bottom: 0,
        padding: 8,
        ...getPlatformElevation(2),
        shadowOffset: {
        width: 0,
        height: -2,
        },
    }
  });

export default Detail;