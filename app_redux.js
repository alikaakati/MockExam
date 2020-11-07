import { createStore , applyMiddleware } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { LightTheme  } from './screens/themes';

//
// initialState
//

const initialState = {
    favoriteAnimal : "Hello",
    user:false,
    info:null,
    profilePhotoUri : null,
    theme:LightTheme,
    language:'en',
    direction:'LTR'
}

//
// Reducer 
//

const reducer = (state = initialState , action) => {
    switch(action.type){
        case "setUser" : {
            return {...state, user : true,info:action.value};
        }

        case "setLanguage" : {
            console.log("logging from reducer");
            console.log(action.value);
            return {...state,language:action.value};
        }

        

        case "setTheme" : {
            return { ...state,theme:action.value}
        }

        case "setProfilePhotoUri":{
            return {...state,profilePhotoUri:action.value}
        }
        
        case "removeUser" : return {...state, user : false,info:null};
        default : return state;
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleWare));


export { store };



const setUser = (user) =>{
    return {
        type : "setUser",
        value:user,
        
    };
}
const removeUser = () =>{
    return {
        type:"removeUser"
    }
}

const setTheme = (themeName) =>{
    return{
        type:"setTheme",
        value:themeName
    }
}

const setLanguage = (languageName) =>{
    return{
        type:"setLanguage",
        value:languageName
    }
}


const setProfilePhotoUri = (profilePhotoUri) =>{
    return{
        type:"setProfilePhotoUri",
        value:profilePhotoUri
    }
}

export { setTheme };
export { setUser };
export { removeUser };
export { setProfilePhotoUri };
export { setLanguage };
