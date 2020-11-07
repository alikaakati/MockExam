import React , {Component} from 'react';
import MainNavigator from './screens/MainNavigator'
import { Provider } from 'react-redux';
import { store } from './app_redux'; 
import { NavigationContainer } from '@react-navigation/native';
import NotifService from './NotifService'
export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {}
    
  }

  
  
  
  render(){
    return (
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    );
  }

}