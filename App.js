import React from 'react';
import { StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './src/Home';
import CadastrarLista from './src/CadastrarLista';
import Item from './src/Item';
import AddItem from './src/AddItem';
import UpdateItem from './src/UpdateItem';
import AddEp from './src/AddEp';

const Stack = createStackNavigator();

const Theme = {
  dark: false,
  colors: {
    primary: '#DA70D6',
    background: '#DA70D6',
    card: '#BA55D3',
    text: 'white',
    border: 'white',
    notification: '#DA70D6',
  }
}

export default function App() {
  return (
    <NavigationContainer theme={Theme}>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Home}/>
        <Stack.Screen name="Cadastrar Uma Lista" component={CadastrarLista}/>
        <Stack.Screen name="Lista de itens" component={Item}/>
        <Stack.Screen name="Add item na Lista" component={AddItem}/>
        <Stack.Screen name="Update item na Lista" component={UpdateItem}/>
        <Stack.Screen name="Add Ep" component={AddEp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
