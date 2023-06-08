import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralInput from '../General/GeneralInput';
import GeneralButton from '../General/GeneralButton';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 

const AddressTiles = ({name, route, navigation}) => {
    return(
        <TouchableOpacity style={{width:335,height:100, borderRadius:10,borderColor:"#B0B0B0",borderWidth:1,marginLeft:40,marginTop:50}} onPress={()=>navigation.navigate(route)}>
            <Text style={{fontSize:16,fontWeight:'500',marginLeft:20,marginTop:10}}>{name}</Text>
            <Text style={{fontSize:16,fontWeight:'500',marginLeft:20,marginTop:5,color:"#6A6B6C"}}>2,Block B, XYZ Building, Ikoyi, Lagos.</Text>
            <View style={{display:"flex",flexDirection:"row"}}>
            <Feather name="edit-2" size={20} color="#0485E8" style={{marginLeft:20,marginTop:5}}/>
            <Text style={{fontSize:16,fontWeight:'500',marginLeft:0,marginTop:5,color:"#0485E8"}}>Edit</Text>
            <MaterialIcons name="delete" size={20} color="#EB270B"  style={{marginLeft:20,marginTop:5}} />
            <Text style={{fontSize:16,fontWeight:'500',marginLeft:0,marginTop:5,color:"#EB270B"}}>Delete</Text>
            </View>

        </TouchableOpacity>
    )
}

const Address = ({navigation}) => {
  return (
   <View>
    <AddressTiles navigation={navigation} route={"addaddress"} name={"Home"} />
    <AddressTiles  navigation={navigation} route={"addaddress"}  name={"Office"}/>
    <AddressTiles  navigation={navigation} route={"addaddress"}  name={"School"}/>
    <GeneralButton message="Add New Address" backgroundColor={"#FFF"}
    color="black" width={330} height={42} borderColor={"#FEDD00"} size={15} top={10}
     marginLeft={100} marginTop={25} marginHorizintal={45}/>
     </View>
  )
}

export default Address