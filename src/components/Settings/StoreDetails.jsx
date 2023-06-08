import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'

const StoreDetails = () => {
  return (
    <View>
   
  
    <Image style={{borderRadius:0,height:160,width:380, marginLeft:20,marginTop:0}} source={require('../../../assets/profile.jpg')}/>
    <GeneralInput name={"Store Name"} width={320} placeholder={"The Cuddle Club"}/>
    <GeneralInput name={"Email"} width={320}  placeholder={"john@gmail.com"}/>
    <GeneralInput name={"Phone number"} width={320} />
    <GeneralInput name={"Store Bio"} width={320} height={100}/>
    <GeneralButton backgroundColor={"#E1E1E1"} borderColor={"#E1E1E1"} width={320} 
    marginTop={30} marginHorizintal={43} message={"Save"} marginLeft={135} height={52} top={15}/>
    </View>
  )
}

export default StoreDetails