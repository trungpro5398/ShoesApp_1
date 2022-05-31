import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
import HomeScreen from './screen/home/HomeScreen';
import Productscreen from './screen/product/ProductScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Cartscreen from './screen/cart/CartScreen';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Product" component={Productscreen} />
          <Stack.Screen name="Cart" component={Cartscreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
