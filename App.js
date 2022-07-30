import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';

import { NavigationContainer } from '@react-navigation/native';
import Animatetab from './screen/components/bottomTab/AnimateTab';
import AuthScreen from './screen/authentication/AuthScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import FirstScreenNavigator from './screen/components/StackNav/FirstScreenNavigator';
import { LogBox } from 'react-native';
const Stack = createNativeStackNavigator()

const App = () => {
  LogBox.ignoreAllLogs()

  return (
    <Provider store={store}>
      <NavigationContainer>
        <FirstScreenNavigator />
        {/* <Animatetab /> */}
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
