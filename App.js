import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from './store';
<<<<<<< Updated upstream
import HomeScreen from './screen/home/HomeScreen';
import Productscreen from './screen/product/ProductScreen';
import AuthScreen from './screen/authentication/AuthScreen';
=======
>>>>>>> Stashed changes
import {NavigationContainer} from '@react-navigation/native';
import Animatetab from './screen/components/bottomTab/AnimateTab';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
<<<<<<< Updated upstream
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Product" component={Productscreen} />
          <Stack.Screen name="Cart" component={Cartscreen} />
        </Stack.Navigator>
=======
        <Animatetab />
>>>>>>> Stashed changes
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
