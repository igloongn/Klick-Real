import React, { useState } from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 

const SettingsTiles = ({name,route,icon, navigation}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate(route)} style={{marginLeft:20,marginBottom:20}}>
        <SimpleLineIcons  style={{marginTop:25, marginLeft:5}}  name={icon} size={14} color="black" />
        <Text style={{marginLeft:27,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>{name}</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />

        </TouchableOpacity>
    )
}

const StoreSettings = ({navigation}) => {
  return (
    <View>
       

        <SettingsTiles name={"Store Details"} icon={"drawer"} navigation={navigation} route={'storedetails'} />
        <SettingsTiles name={"Store Address"} icon={"location-pin"} navigation={navigation} route={'storeaddress'} />
        <SettingsTiles name={"Social Media Account"} icon={"globe"} navigation={navigation} route={'socialaccounts'} />
        {/* <SettingsTiles name={"Shipping Options"} icon={"plane"} navigation={navigation} route={'manageaccount'}/> */}
       
      


    </View>
  )
}

export default StoreSettings