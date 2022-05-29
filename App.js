import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
import HomeScreen from './screen/home/HomeScreen';
const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
