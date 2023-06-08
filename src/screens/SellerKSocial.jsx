import React from 'react'
import {SafeAreaView, Text} from "react-native"
import SellerKSocialContent from '../components/KSocial/SellerKSocialContent'
const SellerKSocial = ({navigation}) => {
  return (
    <SafeAreaView  style={{
         marginHorizontal:20,
         marginTop:50,
  
       }}>
      <SellerKSocialContent navigation={navigation}/>
    </SafeAreaView>
  )
}

export default  SellerKSocial