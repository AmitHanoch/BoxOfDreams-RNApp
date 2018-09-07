import React, { PureComponent } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
} from 'react-native';

import assets from '../../assets';

/*
    Props:
        isSelected - indecator that says if the tab is selected or not
        onPress - callback event when press on the tab
        tab - the tab item that holds the configuration data
*/
export default class Tab extends PureComponent {
    constructor(props){
        super(props);

        this.state = {
            isSelected: this.props.isSelected
        };
    }
    componentWillReceiveProps = nextProps => {
        this.setState({ isSelected: nextProps.isSelected });
    }
    onTabPress = event => {
        if (this.props.onPress) {
            this.props.onPress(this.props.tab.id, event.nativeEvent);
        }
    }
    render() {
        return (<TouchableWithoutFeedback onPress={this.onTabPress}> 
              <View style={styles.iconContainer}>
                <Image source={assets[
                    this.state.isSelected ? 
                        this.props.tab.selectedImageCode : 
                        this.props.tab.imageCode]} 
                style={styles.tabIcon}/>
                <Text style={this.state.isSelected ? styles.tabTitleSelected : styles.tabTitle}>
                    {this.props.tab.title}
                </Text>
              </View>
        </TouchableWithoutFeedback>);
    }
}

const styles = StyleSheet.create({
    iconContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabIcon: {
      marginTop: 2,
      alignSelf: 'center',
      resizeMode: 'contain'
    },
    tabTitle: {
      marginBottom: 2,
      color: '#9c9c9c'
    },
    tabTitleSelected: {
      marginBottom: 2,
      fontWeight: 'bold',
      color: 'rgb(38,112,204)'
    }
});