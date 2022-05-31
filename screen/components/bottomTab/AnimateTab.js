import React, {useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import * as Animatable from 'react-native-animatable';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  faUtensils,
  faMagnifyingGlass,
  faHeart,
  faUser,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import Homescreen from '../../home/HomeScreen';
import Productscreen from '../../product/ProductScreen';
import Cartscreen from '../../cart/CartScreen';
import Searchscreen from '../../search/SearchScreen';
import Profilescreen from '../../profile/ProfileScreen';
import Favoritescreen from '../../favorite/FavoriteScreen';
import AuthScreen from '../../authentication/AuthScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const animate1 = {
  0: {scale: 0.5, translateY: 7},
  0.92: {translateY: -34},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 7},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.2},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};
const FirstScreenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Homescreen} />
      <Stack.Screen name="Product" component={Productscreen} />
      <Stack.Screen name="Cart" component={Cartscreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};
const TabArray = [
  {
    route: 'Home',
    label: 'Home',
    icon: faUtensils,
    component: FirstScreenNavigator,
  },
  {
    route: 'Search',
    label: 'Search',
    icon: faMagnifyingGlass,
    component: Searchscreen,
  },
  {
    route: 'Cart',
    label: 'Cart',
    icon: faCartShopping,
    component: Cartscreen,
  },
  {
    route: 'Love',
    label: 'Love',
    icon: faHeart,
    component: Favoritescreen,
  },

  {
    route: 'Profile',
    label: 'Profile',
    icon: faUser,
    component: Profilescreen,
  },
];

const TabButton = props => {
  const {item, onPress, accessibilityState} = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({scale: 1});
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({scale: 0});
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View ref={viewRef} duration={1000} style={styles.container}>
        <View style={styles.btn}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <FontAwesomeIcon
            icon={item.icon}
            color={focused ? 'white' : 'black'}
          />
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {item.label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};
const Animatetab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16,
        },
      }}>
      {TabArray.map((item, index) => {
        return (
          <Tab.Screen
            name={item.route}
            component={item.component}
            options={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarButton: props => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 4,
    borderColor: 'white',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    borderRadius: 25,
  },
  text: {
    fontSize: 10,
    textAlign: 'center',
    color: 'black',
  },
});
export default Animatetab;
