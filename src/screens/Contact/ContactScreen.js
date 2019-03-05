import React, { PureComponent } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from "react-native";

import { Toolbar, StyledTextInput, StyledButton } from "../../components";
import { getPlatformElevation, consts } from "../../utils";

// require the module
const Frisbee = require("frisbee");

// create a new instance of Frisbee
const api = new Frisbee({
  baseURI: "https://boxofdreams-e7838.firebaseapp.com", // optional
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default class ContactScreen extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "",
      phone: "",
      mail: "",
      messageContent: ""
    };
  }

  submit = () => {
    if (this.validate()) {
      this.sendMail();
    } else {
      Alert.alert(
        "שגיאה בהזנת הפרטים",
        "חובה למלא את כל הפרטים",
        [
          {
            text: "אוקי",
            onPress: () =>
              this.setState({
                loading: false,
                name: "",
                phone: "",
                mail: "",
                messageContent: ""
              })
          }
        ],
        { cancelable: false }
      );
    }
  };

  validate = () => {
    // Check that all the fields has value
    return (
      this.state.name.length > 1 &&
      this.state.phone.length > 1 &&
      this.state.mail.length > 1 &&
      this.state.messageContent.length > 1
    );
  };

  sendMail = () => {
    var reqbody = {
      name: this.state.name,
      phone: this.state.phone,
      mail: this.state.mail,
      messageContent: this.state.messageContent
    };

    if (this.props !== undefined && this.props.navigation !== undefined) {
      const dreamRef = this.props.navigation.getParam("dreamRef");
      if (dreamRef != undefined) {
        reqbody.dreamName = dreamRef[consts.DREAM_OBJECT_FIELDS.DREAM_NAME];
        reqbody.dreamDescription =
          dreamRef[consts.DREAM_OBJECT_FIELDS.DREAM_DESCRIPTION];
      }
    }

    api
      .post("/usercontact", { body: reqbody })
      .then(res => {
        if (res.originalResponse.status == 200) {
          Alert.alert(
            "הבקשה התקבלה בהצלחה!",
            "הפרטים שהזנת נשלחו אל העמותה",
            [
              {
                text: "אוקי",
                onPress: () =>
                  this.setState({
                    loading: false,
                    name: "",
                    phone: "",
                    mail: "",
                    messageContent: ""
                  })
              }
            ],
            { cancelable: false }
          );
        }
      })
      .catch(function(error) {
        console.error(error);

        Alert.alert(
          "חלה שגיאה בעת הפניה לעמותה",
          "פנייתך חשובה לנו! אנא נסה שוב במועד מאוחר יותר",
          [
            {
              text: "אוקי",
              onPress: () =>
                this.setState({
                  loading: false,
                  name: "",
                  phone: "",
                  mail: "",
                  messageContent: ""
                })
            }
          ],
          { cancelable: false }
        );
      });

    this.setState({ loading: true });
  };

  renderDreamRef = () => {
    if (this.props.navigation == undefined) {
      return null;
    }

    const dreamRef = this.props.navigation.getParam("dreamRef");
    if (dreamRef == undefined) {
      return null;
    }

    return (
      <View style={styles.dreamReference}>
        <Text style={[styles.text, styles.dreamReferenceText]}>
          נשלח בהקשר לחלום: {dreamRef.dreamName}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: consts.COLORS.WHITE }}>
        <View style={styles.container}>
          <Toolbar style={styles.toolbar}>
            <Text style={styles.toolBarTitle}>צור קשר</Text>
          </Toolbar>
          <View style={styles.content}>
            <Text style={[styles.text, { fontWeight: "bold" }]}>
              רוצים להתנדב או לכתוב לנו על חלום של ילד? מלא פרטים ונציג העמותה
              יצור אתכם קשר
            </Text>

            <StyledTextInput
              placeholder="שם מלא"
              onChangeText={text => this.setState({ name: text })}
              value={this.state.name}
              editable={!this.state.loading}
            />
            <StyledTextInput
              placeholder="טלפון"
              onChangeText={text => this.setState({ phone: text })}
              value={this.state.phone}
              editable={!this.state.loading}
            />
            <StyledTextInput
              placeholder="מייל"
              onChangeText={text => this.setState({ mail: text })}
              value={this.state.mail}
              editable={!this.state.loading}
            />
            <StyledTextInput
              style={{ marginTop: 16, height: 100 }}
              placeholder="מה תרצה לספר לנו?"
              multiline={true}
              onChangeText={text => this.setState({ messageContent: text })}
              value={this.state.messageContent}
              editable={!this.state.loading}
            />

            {this.state.loading ? (
              <ActivityIndicator
                size="large"
                color={consts.COLORS.PRIMARY_BLUE}
                style={styles.smallLoadingStyle}
              />
            ) : (
              <StyledButton
                onPressCallback={this.submit}
                text="שלח"
                style={styles.spaceTop}
              />
            )}

            <Text style={styles.text}>
              העמותה אינה מחוייבת לקבל לטיפולה או להגשים את כל החלומות המתקבלים
            </Text>
          </View>

          {this.renderDreamRef()}
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
  content: {
    padding: 25,
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  toolBarTitle: {
    color: consts.COLORS.PRIMARY_BLUE,
    fontWeight: "bold",
    fontSize: 24,
    alignSelf: "center"
  },
  text: {
    lineHeight: 23,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 15,
    color: consts.COLORS.PRIMARY_TEXT
  },
  dreamReference: {
    position: "absolute",
    bottom: 0,
    padding: 16,
    width: "100%",
    backgroundColor: consts.COLORS.PRIMARY_BLUE
  },
  dreamReferenceText: {
    color: consts.COLORS.WHITE
  },
  spaceTop: {
    marginTop: 32
  },
  toolbar: {
    ...getPlatformElevation(2),
    shadowOffset: {
      width: 0,
      height: 2
    }
  },
  smallLoadingStyle: {
    backgroundColor: "transparent",
    position: "absolute",
    alignItems: "center"
  }
});
