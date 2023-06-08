import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"


const SHomeCubes = ({navigation,name}) => {
  return (
    <View style={{height:139,width:159.5,backgroundColor:"#FAFAFA",borderRadius:8, marginLeft:20}}>
        <View style={{height:36,width:36,borderRadius:50, backgroundColor:"#FEDD00",marginTop:10, marginLeft:10}}></View>
        <Text style={{marginTop:-28, marginLeft:55}}>{name}</Text>
        <Text style={{marginTop:20, marginLeft:10, color:"#0B0B0E",fontWeight:"500", fontSize:24}}>N105k</Text>
        <Text style={{marginTop:10, marginLeft:10, color:"#6A6B6C" ,fontWeight:"400", fontSize:10}}><Text style={{color:"red"}}>-0.5%</Text> from last week</Text>
     
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
     
    
      alignItems: 'center',
      justifyContent: 'center',
    
    },
   
})

export default SHomeCubes