import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'

const StoreAddress = () => {
  return (
    <View>

    <GeneralInput name={"Country"} width={320} placeholder={"Nigeria"}/>
    <GeneralInput name={"Address"} width={320}  placeholder={"1455A Dammole Street, Off Idejo Street"}/>
    <GeneralInput name={"State"} width={320}  placeholder={"Lagos"}/>
    <GeneralInput name={"City"} width={320} placeholder={"Victoria Island"}/>
    <GeneralInput name={"Postal Code"} width={320} placeholder={"10023"}/>

    <GeneralButton backgroundColor={"#E1E1E1"} borderColor={"#E1E1E1"} width={320} 
    marginTop={30} marginHorizintal={43} message={"Save"} marginLeft={135} height={52} top={15}/>
    </View>
  )
}

export default StoreAddress