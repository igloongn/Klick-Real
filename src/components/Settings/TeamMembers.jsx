import React ,{useState} from 'react'
import GeneralButton from '../General/GeneralButton'
import {Text,View, StyleSheet, Image, TextInput, TouchableOpacity, Pressable} from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'; 

function TeamMembers({navigation}) {
  return (
    <View>
    
    {/* <SimpleLineIcons name="user" size={74} color="blue" style={{marginLeft:160,marginTop:90}} />
    <Text style={{fontSize:24,fontWeight:"600",marginLeft:120,marginTop:30}}>Add Team Member</Text>
    <Text style={{fontSize:16,marginLeft:70,marginTop:20}}>Your team members will have access to your {'\n'}store and will be able to perform certain tasks{'\n'}                         on your store</Text> */}

<TouchableOpacity onPress={()=>navigation.navigate('teampage')} style={{height:100,width:375}}>
    <Image style={{borderRadius:50,height:60,width:60, marginLeft:30,marginTop:20}} source={require('../../../assets/susan.png')}/>
    <Text style={{marginLeft:100,marginTop:-50, color:"#0B0B0E", fontWeight:"500",fontSize:16}}>Susan Adora</Text>
    <Text style={{marginLeft:100,marginTop:0, color:"#0B0B0E", fontWeight:"400",fontSize:12}}>susaadora@gmail.com</Text>
    <SimpleLineIcons name="arrow-right" size={16} color="black" style={{marginLeft:330,marginTop:-25}} />
</TouchableOpacity>

    <Pressable onPress={()=> navigation.navigate('addteam')}>
   <GeneralButton marginTop={40} width={335} height={54} borderColor={"#FEDD00"} marginHorizintal={40} backgroundColor={"#FEDD00"} message={"Add Team Member"} marginLeft={110} top={15}/>
   </Pressable>

    </View>
  )
}

export default TeamMembers