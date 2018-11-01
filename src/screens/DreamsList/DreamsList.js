import React, { PureComponent } from 'react';
import { FlatList, View, Text, TextInput, Button } from 'react-native';
import firebase from 'react-native-firebase';

class DreamsList extends PureComponent {
	constructor() {
	    super();
	    this.ref = firebase.firestore().collection('Dreams');
	    this.unsubscribe = null;
	    this.state = {
	    	loading: true,
	        dreams: [],
	    };
	}

	componentDidMount() {
		// subscibe when component is visible
    	this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	componentWillUnmount() {
		// unsubscribe when component is not visible
	    this.unsubscribe();
	}

	// Callback will pop when the data has changed
	onCollectionUpdate = (querySnapshot) => {
		const dreams = [];

		querySnapshot.forEach((doc) => {
			const { dreamName } = doc.data();
		    dreams.push({
		      key: doc.id,
		      doc, // DocumentSnapshot
		      dreamName
		    });
		});

		this.setState({ 
		  dreams,
		  loading: false,
		});
	}

	render() {
	  if (this.state.loading) {
      	return null; // TODO: render a loading component
      }
	  
	  return (
	    <View style={{ flex: 1 }}>
	        <FlatList
	          data={this.state.dreams}
	          renderItem={({ item }) => <Text> {item.dreamName} </Text>}
	        />
    	</View>);
	}
}

export default DreamsList;