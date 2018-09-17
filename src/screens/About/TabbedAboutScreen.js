import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SceneMap } from 'react-native-tab-view';

import { Toolbar, Tabs } from '../../components';

const AboutRoute = () => (
  <Text style={styles.contentText}>About</Text>
);

const VisionRoute = () => (
  <Text style={styles.contentText}>
  הקשרים שלך יכולים להגשים חלום של ילד חולה.
  {"\n"}
"אַרְגָּז שֶׁל חֲלוֹמוֹת" הינה עמותה התנדבותית בינלאומית המגשימה חלומות לילדים חולים, נכים ובמצב סוציו-אקונומי נמוך.
{"\n"}
החלומות אינם מוגשמים בעזרת תרומות כספיות אלא בעזרת רשת מגשימי החלומות - רשת שמורכבת מקשרים אישיים ששווים יותר מכל סכום שבעולם.
{"\n"}
{"\n"}
כעת, כשהצטרפתם לרשת מגשימי החלומות תוכלו לעקוב אחרי החלומות ולהעביר לחברים שלכם שיוכלו גם הם לסייע בהגשמתם.
{"\n"}
{"\n"}
 "אַרְגָּז שֶׁל חֲלוֹמוֹת" הוקמה על ידי מספר חברים שכל אחד מאיתנו נמצא במרדף הפרטי והיום יומי עד לרגע אחד שבו עצרנו וחשבנו, חשבנו בקול רם.
 {"\n"}
זה היה הרגע בו הבנו את הכוח הטמון בידינו. 
{"\n"}
הכוח להגשים חלומות.
  </Text>
);

const DonorsRoute = () => (
  <Text>Donors</Text>
);

const tabRoutes =  [
  { key: "0", title: 'תורמים' },
  { key: "1", title: 'חזון' },
  { key: "2", title: 'אודות' },
];

const tabScenes = SceneMap({
    "0": DonorsRoute,
    "1": VisionRoute,
    "2": AboutRoute,
});


export default class TabbedAboutScreen extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Toolbar>
          <Text style={styles.titleContainer}>על העמותה</Text>
        </Toolbar>
        <Tabs routes={tabRoutes} scenes={tabScenes} defaultIndex={2} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },  
  titleContainer: {
    color: 'rgb(38,112,204)',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  },
  contentText: {
    width: '100%',
    padding: 8,
    color: 'rgb(74,74,74)',
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'right'
  }
  
});