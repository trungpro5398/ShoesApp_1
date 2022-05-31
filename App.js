import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';

import {NavigationContainer} from '@react-navigation/native';
import Animatetab from './screen/components/bottomTab/AnimateTab';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Animatetab />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
