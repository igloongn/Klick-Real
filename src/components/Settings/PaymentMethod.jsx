import React, { useState } from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralButton from '../General/GeneralButton';
import { MaterialIcons } from '@expo/vector-icons'; 

const SettingsTiles = ({name,route,navigation}) => {
    return (
    <TouchableOpacity onPress={()=>navigation.navigate(route)} style={{marginTop:15}}>
       
        <Image style={{height:20,width:20, marginLeft:20,marginTop:25}} />
        <Text style={{marginLeft:56,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>{name}</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />

        </TouchableOpacity>
    )
}

const PaymentMethod = ({navigation}) => {
  return (
    <View>
        
      
        <Image style={{height:20,width:20, marginLeft:20,marginTop:25}} />
        <Text style={{marginLeft:56,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>Paypal</Text>
       
        <MaterialIcons style={{marginLeft:320,marginTop:-15}} name="check-circle-outline" size={14} color="black" />

        <SettingsTiles name={"•••• •••• •••• •••• 3212"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"•••• •••• •••• •••• 3212"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"•••• •••• •••• •••• 3212"} navigation={navigation} route={'profilesettings'} />
       
       <TouchableOpacity onPress={()=>navigation.navigate("addnewcard")}>
        <GeneralButton message="Add New Card" backgroundColor={"#FFF"}
          color="black" width={330} height={42} borderColor={"#FEDD00"} size={15} top={10}
           marginLeft={110} marginTop={55} marginHorizintal={45}/>
           </TouchableOpacity>
     
























    </View>
  )
}

export default PaymentMethod