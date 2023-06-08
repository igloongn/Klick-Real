import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { View, Text, Image } from 'react-native';
import Home from '../screens/Home';
import Orders from '../screens/Orders';
import KSocial from '../screens/KSocial';
import Message from '../screens/Message';
import Settings from '../screens/Settings';
import NavbarTab from './NavbarTab';
import { AntDesign } from '@expo/vector-icons';



const Tabs = createBottomTabNavigator()
const tabBarOptions = {
    activeTintColor: '#092953',
    style: {
        height: '10%',
    },
    headerShown: false
};
const HomeTabs = () => {
    return (
        <Tabs.Navigator
            screenOptions={tabBarOptions}
        >
            <Tabs.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Home'} imageuri={<AntDesign name="home" size={24} color="yellow" />} focused={focused} id='1' />

                    ),
                }} />

            <Tabs.Screen name="Orders" component={Orders}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Orders'} imageuri={require('../../assets/Vector-15.png')} focused={focused} id='2' />
                    ),
                }} />


            <Tabs.Screen name="Message" component={Message}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Message'} imageuri={require('../../assets/Vector-16.png')} focused={focused} id='3' />
                    ),
                }} />


            <Tabs.Screen name="KSocial" component={KSocial}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'KSocial'} imageuri={require('../../assets/Vector-16.png')} focused={focused} id='4' />
                    ),
                }} />


            <Tabs.Screen name="Settings" component={Settings}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <NavbarTab message={'Settings'} imageuri={require('../../assets/Vector-16.png')} focused={focused} id='5' />
                    ),
                }} />

        </Tabs.Navigator>
    )
}


export default HomeTabs