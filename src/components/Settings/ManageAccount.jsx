import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

const ManageTiles = ({name,route,navigation,littlename}) => {
    return (
        <TouchableOpacity style={{marginTop:20}} onPress={()=>navigation.navigate(route)}>
        <SimpleLineIcons  style={{marginTop:25, marginLeft:20}}  name="wallet" size={14} color="black" />
        <Text style={{marginLeft:45,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>{name}</Text>
        <Text style={{marginLeft:45,marginTop:-4, color:"#6A6B6C", fontWeight:"300",fontSize:12}}>{littlename}</Text>
        <AntDesign style={{marginLeft:340,marginTop:-20}} name="right" size={14} color="black" />

        </TouchableOpacity>
    )
}


const ManageAccount = ({navigation}) => {
  return (
    <View>
        <ManageTiles name={"Email"} littlename={"michael@gmail.com"} route={"emailsettings"} navigation={navigation} />
        <ManageTiles name={"Phone number"}  littlename={"+234 213495231"}  route={"phonesettings"} navigation={navigation}/>
        <ManageTiles name={"Password Setting"}  route={"passwordsettings"} navigation={navigation}/>
   
    </View>
  )
}

export default ManageAccount