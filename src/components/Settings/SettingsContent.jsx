import React, { useState } from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 

const SettingsTiles = ({name,route,navigation}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate(route)}>
        <SimpleLineIcons  style={{marginTop:25, marginLeft:5}}  name="wallet" size={14} color="black" />
        <Text style={{marginLeft:27,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>{name}</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />

        </TouchableOpacity>
    )
}

const SettingsContent = ({navigation}) => {
  return (
    <View>
        <Text>SettingsContent</Text>
        <View style={{height:100,width:375,backgroundColor:"#191600"}}>
            <Image style={{borderRadius:50,height:60,width:60, marginLeft:20,marginTop:20}} source={require('../../../assets/profile.jpg')}/>
            <Text style={{marginLeft:100,marginTop:-50, color:"#FFF", fontWeight:"500",fontSize:16}}>Mike Deon</Text>
            <Text style={{marginLeft:100,marginTop:0, color:"#FFF", fontWeight:"400",fontSize:12}}>+234 814 692 452</Text>
        </View>
        <Text style={{marginLeft:5,marginTop:20, color:"#000", fontWeight:"600",fontSize:16}}>Seller Mode </Text>

        <SettingsTiles name={"View Wallet"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Address"}navigation={navigation} route={'address'} />
        <SettingsTiles name={"Profile Settings"}navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Manage Account"}navigation={navigation} route={'manageaccount'}/>
        <SettingsTiles name={"Payment Methods"}navigation={navigation} route={'paymentmethod'}/>
        <SettingsTiles name={"Notification Settings"} navigation={navigation} route={'notification'}/>
        <SettingsTiles name={"Help Center"}navigation={navigation} route={'profilesettings'}/>
        <SettingsTiles name={"Privacy Policy"}navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Invite friends"}navigation={navigation} route={'profilesettings'} />
       
{/* 
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>View Wallet</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Address</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Profile Settings</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Manage Account</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Payment Methods</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Notification Settings</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Help Center</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Privacy Policy</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />
        <Text style={{marginLeft:20,marginTop:20, color:"#000", fontWeight:"400",fontSize:14}}>Invite friends</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" /> */}
        <Text style={{marginLeft:20,marginTop:20, color:"#EB270B", fontWeight:"400",fontSize:14}}>Log Out</Text>
























    </View>
  )
}

export default SettingsContent