import React from 'react';
import { ActivityIndicator, I18nManager,  View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux'
import { setUser , setLanguage } from '../app_redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStackNavigator from './HomeStackNavigator';
import SettingsStackNavigator from './SettingsStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';
import i18n from './il8n';
import i18next from 'i18next';
import './il8n';

const AuthBottomNavigator = createBottomTabNavigator();
const LoggedInBottomNavigator = createBottomTabNavigator();


const mapStateToProps = (state) =>{
    return{
        user : state.user,
        theme : state.theme,
        language : state.language
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setUser : () => { dispatch(setUser())},
        setLanguage : (language) => { dispatch(setLanguage(language))},
        
    };
}


class MainNavigator extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        isLoggedIn : false,
        isLoading : true,
      }
    }


    componentDidMount = async() =>{
        let isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        if(isLoggedIn){
            this.props.setUser();
        }
        let isLoading  = false;
        this.setState({isLoggedIn,isLoading});
        let language = await AsyncStorage.getItem("language");
        i18next.changeLanguage(language);
        this.props.setLanguage(language);
        I18nManager.forceRTL(language === 'ar');
        
    }

    
    render(){
        if(this.state.isLoading){
            return(
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            );
        }
        else{

            if(this.props.user){
                return (
                

                        <LoggedInBottomNavigator.Navigator 
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({  color, size }) => {
                              let iconName;
                  
                              if (route.name === 'Home') {
                                iconName = 'md-home';
                              } else if (route.name === 'Settings') {
                                iconName = 'ios-list';
                              }
                              else if (route.name === 'Profile') {
                                iconName = 'ios-body';
                              }
                              
                  
                              return <Icon name={iconName} size={size} color={color} />;
                            },
                          })}
                          tabBarOptions={{
                            tabStyle:{
                              backgroundColor:`${this.props.theme.PRIMARY_TEXT_COLOR}`
                            },
                            activeTintColor: 'red',
                            inactiveTintColor: `${this.props.theme.PRIMARY_BACKGROUND_COLOR}`,
                          }} initialRouteName="Home" 
                        >
                            <LoggedInBottomNavigator.Screen name = "Profile" component={ProfileStackNavigator} />
                            <LoggedInBottomNavigator.Screen name = "Home" component={HomeStackNavigator} />
                            <LoggedInBottomNavigator.Screen name = "Settings" component={SettingsStackNavigator} />
    
                        </LoggedInBottomNavigator.Navigator>
                
                );
            }
            else{
                return(
                

                        <AuthBottomNavigator.Navigator
                                            screenOptions={({ route }) => ({
                                                tabBarIcon: ({  color, size }) => {
                                                  let iconName;
                                      
                                                  if (route.name === 'Home') {
                                                    iconName = 'md-home';
                                                  } else if (route.name === 'Settings') {
                                                    iconName = 'ios-list';
                                                  }                                              
                                                  return <Icon name={iconName} size={size} color={color} />;
                                                },
                                              })}
                                              tabBarOptions={{
                                                tabStyle:{
                                                  backgroundColor:`${this.props.theme.PRIMARY_TEXT_COLOR}`
                                                },
                                                activeTintColor: 'red',
                                                inactiveTintColor: `${this.props.theme.PRIMARY_BACKGROUND_COLOR}`,
                                              }} initialRouteName="Home" 
                        >
                            <AuthBottomNavigator.Screen name = "Home" component={HomeStackNavigator} />
                            <AuthBottomNavigator.Screen name = "Settings" component={SettingsStackNavigator} />
                        </AuthBottomNavigator.Navigator>
                
                );
            }
        }
    }
}  

export default connect(mapStateToProps , mapDispatchToProps)(MainNavigator);