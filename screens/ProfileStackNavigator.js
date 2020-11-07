import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import  Profile  from './Profile';

const ProfileNavigator = createStackNavigator();

export default class ProfileStackNavigator extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }
    render(){
        return(
            <ProfileNavigator.Navigator>
                <ProfileNavigator.Screen name="Profile" component={Profile} />
                
                
            </ProfileNavigator.Navigator>
        );
    }
}