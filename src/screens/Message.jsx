import React from 'react'
import {Text,View} from "react-native"
import SellerMessages from '../components/Messages/SellerMessages'


const Message = ({navigation}) => {
  return (
    <View>
  
     <SellerMessages navigation={navigation} />
     </View>
  )
}

export default Message