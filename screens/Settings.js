import React from 'react';
import { View  , TouchableOpacity, StyleSheet, ActivityIndicator  , I18nManager, Picker} from 'react-native';
import { connect } from 'react-redux'
import { removeUser , setTheme , setLanguage } from '../app_redux';
import { LightTheme , DarkTheme } from './themes';
import { Translation } from 'react-i18next';
import i18n from './il8n';
import i18next from 'i18next';
import RNPRestart from 'react-native-restart';
import styled,{ ThemeProvider} from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
const mapStateToProps = (state) =>{
    return{
        user : state.user,
        theme: state.theme,
        language : state.language
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        removeUser : () => { dispatch(removeUser())},
        setTheme : (theme) => { dispatch(setTheme(theme))},
        setLanguage : (language) => { dispatch(setLanguage(language))},
        
    };
}
class Settings extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            checkingLogout : false,
            isLoading : false
        }
    }


    alterTheme = (themeName) =>{
        if(themeName === 'light') this.props.setTheme(LightTheme);
        else if(themeName === 'dark') this.props.setTheme(DarkTheme);
    }

    LogOut = async() =>{
        this.setState({checkingLogout:true});
        await AsyncStorage.removeItem("isLoggedIn");
        await AsyncStorage.removeItem("username");
        await AsyncStorage.removeItem("password");
        
        setTimeout(() => {
        }, 500);
        this.setState({checkingLogout:false});
        this.props.removeUser();
        
    }


    changeLanguageGlobally = async(language) =>{
        this.props.setLanguage(language);
        this.setState({checkingLogout:true});
        await AsyncStorage.setItem("language",language);
        
        RNPRestart.Restart();
        //console.log(this.props.language);
        //i18next.changeLanguage(language);
        //I18nManager.forceRTL(i18n.language === 'ar');
        
    }


    IfLoggedInScreen = () =>{
        return(
            <ThemeProvider theme={this.props.theme}>
                <Container>
                    <RowContainer>
                        <Translation i18n={i18n}>
                            {
                                (t,{i18n}) => {
                                    return(

                                    <View style={{flex:2}}>
                                        <TextContainer >
                                            <Text>{t('theme')}</Text>
                                        </TextContainer>
                                    </View>
        

                                    );
                                }
                            }
                        </Translation>
                        <Picker style={{color:this.props.theme.PRIMARY_TEXT_COLOR,flex:1}}  selectedValue={this.props.theme.mode} onValueChange={(itemValue , itemIndex) => this.alterTheme(itemValue)}>
                            <Picker.Item label="Light" value="light" />
                            <Picker.Item label="Dark" value="dark" />
                        </Picker>
                    </RowContainer>
                    <RowContainer>
                    <Translation i18n={i18n}>
                            {
                                (t,{i18n}) => {
                                    return(

                                    <View style={{flex:2}}>
                                        <TextContainer >
                                            <Text>{t('language')}</Text>
                                        </TextContainer>
                                    </View>
        

                                    );
                                }
                            }
                        </Translation>
                    <Picker style={{color:this.props.theme.PRIMARY_TEXT_COLOR,flex:1}}  selectedValue={this.props.language} onValueChange={(itemValue , itemIndex) => this.changeLanguageGlobally(itemValue)}>
                        <Picker.Item label="en" value="en" />
                        <Picker.Item label="ar" value="ar" />
                    </Picker>
                    
                    </RowContainer>                    

                    <ButtonContainer onPress={this.LogOut}>
                        <ButtonTextContainer>
                            Logout
                        </ButtonTextContainer>
                    </ButtonContainer>
                </Container>
            </ThemeProvider>
        );
    }

    IfNotLoggedInScreen = () =>{
        return(
            
                            <ThemeProvider theme={this.props.theme}>
                <Container>
                    <RowContainer>
                        <Translation i18n={i18n}>
                            {
                                (t,{i18n}) => {
                                    return(

                                    <View style={{flex:2}}>
                                        <TextContainer >
                                            <Text>{t('theme')}</Text>
                                        </TextContainer>
                                    </View>
        

                                    );
                                }
                            }
                        </Translation>
                        <Picker style={{color:this.props.theme.PRIMARY_TEXT_COLOR,flex:1}}  selectedValue={this.props.theme.mode} onValueChange={(itemValue , itemIndex) => this.alterTheme(itemValue)}>
                            <Picker.Item label="Light" value="light" />
                            <Picker.Item label="Dark" value="dark" />
                        </Picker>
                    </RowContainer>
                    <RowContainer>
                    <Translation i18n={i18n}>
                            {
                                (t,{i18n}) => {
                                    return(

                                    <View style={{flex:2}}>
                                        <TextContainer >
                                            <Text>{t('language')}</Text>
                                        </TextContainer>
                                    </View>
        

                                    );
                                }
                            }
                        </Translation>
                    <Picker style={{color:this.props.theme.PRIMARY_TEXT_COLOR,flex:1}}  selectedValue={this.props.language} onValueChange={(itemValue , itemIndex) => this.changeLanguageGlobally(itemValue)}>
                        <Picker.Item label="en" value="en" />
                        <Picker.Item label="ar" value="ar" />
                    </Picker>
                    
                    </RowContainer>                    

                </Container>
            </ThemeProvider>
            );
    }


    render(){
        if(this.state.checkingLogout){
            return(
                <View style={styles.View}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )
        }
        else{
            if(this.props.user){
                return(
                    <this.IfLoggedInScreen/>
                )
            }
            else{
                return(
                    <this.IfNotLoggedInScreen />
                )
            }
        }
    }
}

const Container = styled.View`
    flex:1;
    flexDirection:column;
    backgroundColor:${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
`;


const TextContainer = styled.View`
    backgroundColor:${(props) => props.theme.PRIMARY_BACKGROUND_COLOR};
    alignSelf:flex-start
`;

const paddingHorizontalVal = 15;
const borderBottomWidthVal = 2;

const RowContainer = styled.View`
width:100%;
flexDirection:row;
height:auto;
color:${(props) => props.theme.PRIMARY_TEXT_COLOR};
justifyContent:center;
alignItems:center;
paddingHorizontal:${paddingHorizontalVal};
borderBottomWidth:${borderBottomWidthVal};
borderBottomColor:grey;


`;
const fontSize = 19;
const Text = styled.Text`
    color:${(props) => props.theme.PRIMARY_TEXT_COLOR};
    fontSize:${fontSize}
`;

const ButtonContainer = styled.TouchableOpacity`
    backgroundColor:${(props) => {
            if(props.theme.mode === 'light' || props.theme.mode === 'orange'){
                return "#212121";
            }
            else{
                return "rgb(255,100,30)";
            }
        } 
    }
    width:100%;
    height: 15%;
    justifyContent:center;
    alignItems:center;
    position:absolute;
    bottom:0;
    `;
const ButtonTextContainer = styled.Text`
    color:${(props) => {
    if(props.theme.mode === 'light' || props.theme.mode === 'orange'){
        return "#ffffff";
    }
    else{
        return "white";
    }
    } 
    };
    fontSize:35;

    `;

const styles = StyleSheet.create({

    View :{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },

    TextInput:{
        width:200,
        height:50,
        borderWidth : 2,
        borderColor:"red",
        borderRadius:15,
        marginBottom:15,
        paddingHorizontal:15,
    }
});
export default connect(mapStateToProps , mapDispatchToProps)(Settings);