import React from 'react';
import { View , Text , Button, StyleSheet, ActivityIndicator  , Alert, Image} from 'react-native';
import { connect } from 'react-redux'
import { setProfilePhotoUri } from '../app_redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../app_redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import NotifService from '../NotifService';
import styled , {ThemeProvider} from 'styled-components';
import { Translation } from 'react-i18next';
import i18n from './il8n';
/*
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';
*/
const mapStateToProps = (state) =>{

    return{
        user : state.user,
        language:state.language,
        theme: state.theme,
        themeName : state.themeName,
        profilePhotoUri : state.profilePhotoUri
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setUser : (user) => { dispatch(setUser(user))},
        setProfilePhotoUri : (profilePhotoUri) => { dispatch(setProfilePhotoUri(profilePhotoUri))},
        
    };
}



class MainScreen extends React.Component{
    constructor(props){
        super(props);
        this.notif = new NotifService(
            this.onRegister.bind(this),
            this.onNotif.bind(this)
          );
        this.state = {
            checkingLogin : false,
        }
    }



    componentDidMount = async() =>{
        let isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
        let username = await AsyncStorage.getItem("username");
        let password = await AsyncStorage.getItem("password");
        this.setState({isLoggedIn,username,password});
        if(isLoggedIn && username && password){
            let user = {username : username , password : password};
            this.props.setUser(user);
        }
        
    }




    onRegister(token) {
        this.setState({registerToken: token.token, fcmRegistered: true});
      }
    
      onNotif(notif) {
        Alert.alert(notif.title, notif.message);
      }
    
      handlePerm(perms) {
        Alert.alert('Permissions', JSON.stringify(perms));
      }
    
    


      choosePhoto = () =>{
        const options = {
            title: 'Choose profile photo',
            storageOptions: {
                cameraRoll:true,
              skipBackup: true,
              path: 'images',
            },
          };

          ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
              
              this.setState({
                avatarSource: source,
              });
              this.props.setProfilePhotoUri(source.uri);
            }
          });
      }

    Login = async() =>{
        let username = this.state.username;
        let password = this.state.password;
        console.log(username);
        if(!username || !password){
            alert("Please fill in all the fields");
            this.setState({checkingLogin:false});
            return;
        }
        this.setState({checkingLogin:true});
        await AsyncStorage.setItem("isLoggedIn","true");
        await AsyncStorage.setItem("username",username);
        await AsyncStorage.setItem("password",password);
        
        setTimeout(() => {
            
        }, 1000);


        let user = {username : username,password : password};
        this.setState({checkingLogin:false});
        this.props.setUser(user);
    
        
    }


    render(){
        if(this.state.checkingLogin){
            return(
            <View style={styles.View}>
                <ActivityIndicator size="large" color="red" />
            </View>
            )
        }
        else{
            if(this.props.user){
                return(
                    <ThemeProvider theme={this.props.theme}>

                    <Container>

                        <ButtonFeature 
                        onPress={() => this.choosePhoto()}>
                            <Icon name="md-images" size={24} color={this.props.theme.PRIMARY_TEXT_COLOR}/>
                        </ButtonFeature>
                        <ButtonFeature 
                        onPress={() => {
                            this.notif.localNotif();  
                        }}>
                            <Icon name="ios-notifications-outline" size={24} color={this.props.theme.PRIMARY_TEXT_COLOR}/>
                        </ButtonFeature>
                        <ButtonFeature 
                        onPress={() => this.props.navigation.navigate("LebanonMap")}>
                            <Icon name="ios-map" size={24} color={this.props.theme.PRIMARY_TEXT_COLOR}/>
                        </ButtonFeature>
                    </Container>

            
            
            
                    </ThemeProvider>
                    );
            
            } 
            else{
                return(
                    <ThemeProvider theme={this.props.theme}>
                        <LoginContainer>


                        <Translation i18n={i18n}>
                                {
                                    (t,{i18n}) =>{
                                        return(
                                            <Text style={{fontSize:20,color:this.props.theme.PRIMARY_TEXT_COLOR}}>
                                                {t('Welcome')}
                                            </Text>
                                    );
                                    }
                                    
                                }
                            </Translation>
                            <View>
                                {this.props.language === 'ar' && this.props.theme.mode === 'light' && 
                                    <TextInp onChangeText={(val) => this.setState({username:val})} placeholder={"اسم الدخول.."} placeholderTextColor="black"/>
                                }

                                {this.props.language === 'ar' && (this.props.theme.mode === 'dark' || this.props.theme.mode === 'orange') && 
                                    <TextInp onChangeText={(val) => this.setState({username:val})} placeholder="اسم الدخول.." placeholderTextColor="rgba(255,255,255,0.4)"/>
                                }

                                {this.props.language === 'en' && this.props.theme.mode === 'light' && 
                                    <TextInp onChangeText={(val) => this.setState({username:val})} placeholder={"Username"} placeholderTextColor="black"/>
                                }

                                {this.props.language === 'en' && (this.props.theme.mode === 'dark' || this.props.theme.mode === 'orange') && 
                                    <TextInp onChangeText={(val) => this.setState({username:val})} placeholder={"Username"} placeholderTextColor="rgba(255,255,255,0.4)"/>
                                }

                                {this.props.language === 'ar' && (this.props.theme.mode === 'dark' || this.props.theme.mode === 'orange') && 

                                <TextInp secureTextEntry={true} onChangeText={(val) => this.setState({password:val})} placeholder="كلمه السر.."  placeholderTextColor="rgba(255,255,255,0.4)"/>
                                }
                                {this.props.language === 'en' && (this.props.theme.mode === 'dark' || this.props.theme.mode === 'orange') && 
                                <TextInp secureTextEntry={true} onChangeText={(val) => this.setState({password:val})} placeholder="Password.."  placeholderTextColor="rgba(255,255,255,0.4)"/>
                                }
                                {this.props.language === 'ar' && this.props.theme.mode === 'light' && 
                                <TextInp secureTextEntry={true} onChangeText={(val) => this.setState({password:val})} placeholder="كلمه السر.." placeholderTextColor="black"/>
                                }
                                {this.props.language === 'en' && this.props.theme.mode === 'light' && 
                                <TextInp secureTextEntry={true} onChangeText={(val) => this.setState({password:val})} placeholder="Password" placeholderTextColor="black"/>
                                }

                            </View>
                            <LoginButton onPress={this.Login}>

                            <Translation i18n={i18n}>
                                {
                                    (t,{i18n}) =>{
                                        return(
                                        <Text style={{color:this.props.theme.PRIMARY_BACKGROUND_COLOR,fontSize:15}}>
                                            {t('Login')}
                                        </Text>
                                        );
                                    }
                                    
                                }
                            </Translation>
                            
                            
                            </LoginButton>

                        </LoginContainer>
                    </ThemeProvider>

                )
        
            }
        }
    }
}


const Container = styled.View`
    flex:1;
    flexDirection:row;
    backgroundColor:${(props) => props.theme.PRIMARY_BACKGROUND_COLOR}
`;

const LoginContainer = styled.View`
    flex:1;
    alignItems:flex-start;
    backgroundColor:${(props) => props.theme.PRIMARY_BACKGROUND_COLOR}

`;
const ButtonFeature = styled.TouchableOpacity`
width:70;
height:70;
borderWidth:2;
borderColor:${(props) => props.theme.PRIMARY_TEXT_COLOR};
justifyContent:center;
alignItems:center;
marginTop:10;
marginLeft:5;
marginRight:5;
`;

const LoginButton = styled.TouchableOpacity`
    width:100;
    height:60;
    backgroundColor:${(props) => props.theme.PRIMARY_TEXT_COLOR};
    justifyContent:center;
    alignItems:center;
`;



const TextInp = styled.TextInput`
    width:200;
    height:50;
    borderBottomColor:${(props) => props.theme.PRIMARY_TEXT_COLOR};
    borderBottomWidth : 2;
    marginBottom : 15;
    color:${(props) => props.theme.PRIMARY_TEXT_COLOR};
    textAlign:left;
`;
const styles = StyleSheet.create({

    View :{
        flex:1,
        flexDirection:"row"
    },


});
export default connect(mapStateToProps , mapDispatchToProps)(MainScreen);