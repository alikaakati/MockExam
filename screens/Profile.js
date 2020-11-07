import React from 'react';
import { Button,  I18nManager,  Image, View } from 'react-native';
import { connect } from 'react-redux'
import { setLanguage } from '../app_redux';
import styled , {ThemeProvider} from 'styled-components';
import { Translation } from 'react-i18next';
import i18n from './il8n';
const mapStateToProps = (state) =>{

    return{
        user : state.user,
        info: state.info,
        theme : state.theme,
        themeName : state.theme.mode,
        profilePhotoUri : state.profilePhotoUri,
        language:state.language
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        setLanguage : (language) => { dispatch(setLanguage(language))},
    };
}



class Profile extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }


    render(){
        return(
            <ThemeProvider theme={this.props.theme}>
            <Container>
                {this.props.profilePhotoUri && 
                    <Image source={{uri:this.props.profilePhotoUri}} style={{width:100,height:100,alignSelf:"center"}} />
                }
                <Translation i18n={i18n}>
                {
                    (t,{i18n}) =>{
                        return(

                            <View>
                                <Text style={{fontSize:25}}>{t('username')}{this.props.info.username}</Text>
                                <Text style={{fontSize:25}}>{t('password')} {this.props.info.password}</Text>
                                <Text style={{fontSize:25}}>{t('theme')}{t(this.props.themeName)}</Text>
                                <Text style={{fontSize:25}}>{t('language')} {t(this.props.language)}</Text>
                            </View>
                        );
                    }
                    
                }
                </Translation>

            </Container>
            </ThemeProvider>
            
        );
    }
}


const Container = styled.View`
    flex:1;
    justifyContent:center;
    backgroundColor:${(props) => props.theme.PRIMARY_BACKGROUND_COLOR}

`;


const TextContainer = styled.View`
    backgroundColor:${(props) => props.theme.PRIMARY_BACKGROUND_COLOR}
`;

const Text = styled.Text`
    color:${(props) => props.theme.PRIMARY_TEXT_COLOR}
`;

export default connect(mapStateToProps , mapDispatchToProps)(Profile);