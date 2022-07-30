import AuthScreen from "../../authentication/AuthScreen"
import Profilescreen from "../../profile/ProfileScreen"
import Cartscreen from "../../cart/CartScreen";
import Homescreen from "../../home/HomeScreen";
import Productscreen from "../../product/ProductScreen";
import MyOrderScreen from "../../order/MyOrderScreen"
import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Animatetab from "../bottomTab/AnimateTab";
import ProfileView from "../../profile/ProfileView";

const Stack = createNativeStackNavigator()
export default FirstScreenNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="AnimateTab" component={Animatetab} />
            <Stack.Screen name="ProfileView" component={ProfileView} />
            <Stack.Screen name="Product" component={Productscreen} />
            <Stack.Screen name="Order" component={MyOrderScreen} />
        </Stack.Navigator>
    );
};