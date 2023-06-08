import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, Text, Image } from 'react-native';
import SellerHome from '../screens/SellerHome';
import SellerOrders from '../screens/Orders';
import SellerKSocial from '../screens/KSocial';
import SellerMessage from '../screens/Message';
import SellerSettings from '../screens/Settings';
import NavbarTab from './NavbarTab';



const Tabs = createBottomTabNavigator()
const tabBarOptions = {
    activeTintColor: '#092953',
    style: {
        height: '10%',
    },
    headerShown: false
};
const SellersTabs = () => {
    return (
        <Tabs.Navigator
            screenOptions={tabBarOptions}
        >
            <Tabs.Screen name="Home" component={SellerHome}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Home'} imageuri={require('../../assets/Vector-17.png')} focused={focused} id='1' />

                    ),
                }} />

            <Tabs.Screen name="Orders" component={SellerOrders}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Orders'} imageuri={require('../../assets/Vector-15.png')} focused={focused} id='2' />
                    ),
                }} />


            <Tabs.Screen name="Message" component={SellerMessage}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Message'} imageuri={require('../../assets/Vector-16.png')} focused={focused} id='3' />
                    ),
                }} />


            <Tabs.Screen name="KSocial" component={SellerKSocial}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'KSocial'} imageuri={require('../../assets/Vector-16.png')} focused={focused} id='4' />
                    ),
                }} />


            <Tabs.Screen name="Settings" component={SellerSettings}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Settings'} imageuri={require('../../assets/Vector-16.png')} focused={focused} id='5' />
                    ),
                }} />

        </Tabs.Navigator>
    )
}


export default SellersTabs