import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  Settings  from './Settings';

const SettingsNavigator = createStackNavigator();

export default class SettingsStackNavigator extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <SettingsNavigator.Navigator>
                <SettingsNavigator.Screen name="Settings" component={Settings} />                
            </SettingsNavigator.Navigator>
        );
    }
}