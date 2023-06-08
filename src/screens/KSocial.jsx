import React from 'react'
import {SafeAreaView, Text} from "react-native"
import KSocialContent from '../components/KSocial/KSocialContent'
import SellerKSocialContent from '../components/KSocial/SellerKSocialContent'

const KSocial = ({navigation}) => {
  return (
    <SafeAreaView  style={{
         marginHorizontal:20,
         marginTop:50,
  
       }}>
      {/* <KSocialContent navigation={navigation}/> */}
      <SellerKSocialContent navigation={navigation}/>
    </SafeAreaView>
  )
}

export default KSocial