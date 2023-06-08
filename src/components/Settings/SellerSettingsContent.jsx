import React, { useState } from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, Pressable, Alert,ActivityIndicator} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBuyerSwitchVendorContext } from '../BuyerSwitchVendor';

const SettingsTiles = ({name,route,icon,navigation}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate(route)} style={{marginBottom:20}}>
        <SimpleLineIcons  style={{marginTop:25, marginLeft:5}}  name={icon} size={14} color="black" />
        <Text style={{marginLeft:27,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>{name}</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />

        </TouchableOpacity>
    )
}

const SellerSettingsContent = ({navigation}) => {
  const [loading, setLoading] = useState(false)

  const {mode , setMode} = useBuyerSwitchVendorContext()

  const logout = async () => {
    try {
      setLoading(true);

      //clearthe stored token from AsyncStorage
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('isLoggedIn');
      const token = await AsyncStorage.getItem('token');
        console.log('tok',token)
        setMode('buyer')
        navigation.navigate('hometab')
      Alert.alert('Logout', 'Logged out successfully.');
    } catch (error){
      console.error(error);
      Alert.alert('Error','An error occured during logout');

    } finally {
      setLoading(false);
    }
  }


  return (
    <View>
        <Text>SettingsContent</Text>
        <View style={{height:100,width:375,backgroundColor:"#191600"}}>
            <Image style={{borderRadius:50,height:60,width:60, marginLeft:20,marginTop:20}} source={require('../../../assets/profile.jpg')}/>
            <Text style={{marginLeft:100,marginTop:-50, color:"#FFF", fontWeight:"500",fontSize:16}}>The Cuddle Club</Text>
            <Text style={{marginLeft:100,marginTop:0, color:"#FFF", fontWeight:"400",fontSize:12}}>+234 814 692 452</Text>
        </View>
        <Text style={{marginLeft:5,marginTop:20, color:"#000", fontWeight:"600",fontSize:16}}>Buyer Mode</Text>

        <SettingsTiles name={"Store Settings"} icon={"settings"} navigation={navigation} route={'storesettings'} />
        <SettingsTiles name={"Wallet"} icon={"wallet"}  navigation={navigation} route={'wallet'} />
        <SettingsTiles name={"Discounts"} icon={"badge"} navigation={navigation} route={'discounts'} />
        <SettingsTiles name={"Teams & staffs"} icon={"people"} navigation={navigation} route={'team'}/>
        <SettingsTiles name={"Password & Security"} icon={"lock"} navigation={navigation} route={'paymentmethod'}/>
        <SettingsTiles name={"Notification Settings"} icon={"bell"} navigation={navigation} route={'notification'}/>
       
       

        <Pressable onPress={logout}>
        <Text style={{marginLeft:20,marginTop:20, color:"#EB270B", fontWeight:"400",fontSize:16}}>Log Out</Text>
        </Pressable>
        {loading && <ActivityIndicator size="large" />}

























    </View>
  )
}

export default SellerSettingsContent