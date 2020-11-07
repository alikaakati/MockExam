import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  LebanonMap  from './LebanonMap';
import  MainScreen  from './MainScreen';

const HomeNavigator = createStackNavigator();

export default class HomeStackNavigator extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <HomeNavigator.Navigator>
                <HomeNavigator.Screen name="Home" component={MainScreen} />
                <HomeNavigator.Screen name="LebanonMap" component={LebanonMap} />
                
            </HomeNavigator.Navigator>
        );
    }
}