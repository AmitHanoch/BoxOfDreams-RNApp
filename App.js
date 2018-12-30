import React from 'react';
import { View, SafeAreaView, StyleSheet, I18nManager, Alert} from 'react-native';

import TabbedListScreen from  './src/screens/List/TabbedListScreen';
import { BottomBar } from './src/components';
import TabbedAboutScreen from './src/screens/About/TabbedAboutScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Detail from './src/screens/List/Detail/Detail';
import ContactScreen from './src/screens/Contact/ContactScreen';
import { getPlatformElevation, consts } from './src/utils';

class HomeScreen extends React.Component {
  // --------- View for screen ---------
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0
    };
  }

  onTabPress = p_tabIndex => {
    this.setState({selectedTabIndex: p_tabIndex});
  }

  renderTabContent(navigate){
    switch (this.state.selectedTabIndex) {
      case 0:
        return (<TabbedListScreen navigate={navigate} />); 
      case 1:
        return (<TabbedAboutScreen />);
      case 2:
        return (<ContactScreen />);
      default:
        return null;
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: consts.COLORS.WHITE}}>
        <View style={styles.container}>
          {this.renderTabContent(navigate)}    
          <BottomBar style={styles.footer} onTabPress={this.onTabPress} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  footer: {
    ...getPlatformElevation(2),
    shadowOffset: {
      width: 0,
      height: -2,
    },
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  }
});

const AppNavigator = createStackNavigator(
  {
    Home: {screen: HomeScreen},
    Detail: {screen: Detail},
    Contact: {screen: ContactScreen}
  },
  {
    initialRouteName: "Home",
    headerMode: 'none'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentWillMount() {
    I18nManager.allowRTL(true);
    I18nManager.forceRTL(true);
  }

  // --------- Stuff for notifications ---------

  componentWillUnmount(){
    this.onTokenRefreshListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.messageListener();
  }

  componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners();
  }

  checkPermission() {
    // firebase.messaging().hasPermission()
    //   .then(enabled => {
    //   if (enabled) {
    //     this.getToken();
    //   } else {
    //     this.requestPermission();
    //   } 
    // });
  }

  getToken() {
    // AsyncStorage.getItem('fcmToken')
    //   .then(fcmToken => {
    //     if (!fcmToken) {
    //         firebase.messaging().getToken().then(fcmToken => {
    //           if (fcmToken) {
    //             // user has a device token
    //             AsyncStorage.setItem('fcmToken', fcmToken).then(saved => {});
    //           }
    //         });
    //         this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
    //             // user has a device token
    //             AsyncStorage.setItem('fcmToken', fcmToken).then(saved => {});
    //         });
    //     }
    //   });
  }

  requestPermission() {
    // firebase.messaging().requestPermission()
    //   .then(() => {
    //     // User has authorised
    //     this.getToken();
    //   })
    //   .catch(error => {
    //     // User has rejected permissions  
    //     console.log('permission rejected');
    //   }); 
  }

  createNotificationListeners() {
    // /*
    // * Triggered when a particular notification has been received in foreground
    // * */
    // this.notificationListener = firebase.notifications().onNotification((notification) => {
    //     // for now we do nothing when application is in foreground
    // });

    // /*
    // * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    // * */
    // this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
    //     const { data } = notificationOpen.notification;
    //     this.showAlert(data.dream, "_______");
    // });

    // /*
    // * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    // * */
    // firebase.notifications().getInitialNotification().then(notificationOpen => {
    //   if (notificationOpen) {
    //       const { data } = notificationOpen.notification;
    //       this.showAlert(data.dream, "_______");
    //   }
    // });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return <AppContainer />;
  }
}
