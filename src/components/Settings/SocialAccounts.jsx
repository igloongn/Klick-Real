import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'

const SocialAccounts = () => {
  return (
    <View>

    <GeneralInput name={"Instagram"} width={320} placeholder={"https://instagram.com/the_cuddleclub"}/>
    <GeneralInput name={"Facebook"} width={320}  placeholder={"https://facebook.com/the_cuddleclub"}/>
    <GeneralInput name={"Twitter"} width={320}  placeholder={"https://twitter.com/"}/>
    <GeneralInput name={"TikTok"} width={320} placeholder={"https://tiktok.com/"}/>
    <GeneralInput name={"Whatsapp"} width={320} placeholder={"https://wa.me/9062056518"}/>
   
    <GeneralButton backgroundColor={"#E1E1E1"} borderColor={"#E1E1E1"} width={320} 
    marginTop={30} marginHorizintal={43} message={"Save"} marginLeft={135} height={52} top={15}/>
    </View>
  )
}

export default SocialAccounts