import React, { useState } from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralButton from '../General/GeneralButton';
import { MaterialIcons } from '@expo/vector-icons'; 

const SettingsTiles = ({name,route,navigation}) => {
    const [toggle, setToggle] = useState(false)
    return (
    <View style={{marginTop:15}}>
       
        {/* <Image style={{height:20,width:20, marginLeft:20,marginTop:25}} source={require('../../../assets/mastercard.png')}/> */}
        <Text style={{marginLeft:20,marginTop:-16, color:"#000", fontWeight:"500", fontSize:16,marginTop:10}}>{name}</Text>
        {/* <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" /> */}
        <TouchableOpacity onPress={()=>setToggle(!toggle)}>
        <MaterialIcons style={{marginLeft:320,marginTop:-25}} name= {toggle ? "toggle-on" : "toggle-off" } size={37} color={toggle ? "#0485E8" : "black"} />
        </TouchableOpacity>
        {/* {toggle ? ( <MaterialIcons style={{marginLeft:320,marginTop:-25}} name="toggle-off" size={37} color="#0485E8" />):
        ( <MaterialIcons style={{marginLeft:320,marginTop:-25}} name="toggle-on" size={37} color="#0485E8" />)} */}
   
   


        </View>
    )
}

const Notification = ({navigation}) => {
  return (
    <View>
        
      
       

        <SettingsTiles name={"General Information"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Special Offers"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Promo Discount"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Payments"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Cashback"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"App Updates"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"New Services Available"} navigation={navigation} route={'profilesettings'} />


    </View>
  )
}

export default Notification