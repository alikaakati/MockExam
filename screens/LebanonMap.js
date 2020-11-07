import React from 'react';
import MapView,{Marker, Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,Image,Alert, Button } from 'react-native';
export default class LebanonMap extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            initialRegion:{
                latitude : 33.888630,
                longitude : 35.495480,
                latitudeDelta: 0.000,
                longitudeDelta: 0.1821,
            }
        }
    }

    render() {
        return(
            <View style={styles.container}>
            <MapView style={styles.map}
                initialRegion={this.state.initialRegion}           
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
        flex:1
    },
  });