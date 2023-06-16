import React from 'react'
import {SafeAreaView, Text} from "react-native"
import KSocialContent from '../components/KSocial/KSocialContent'
import BuyerKSocial from '../components/KSocial/KSocialContent'

const KSocial = ({navigation}) => {
  return (
    <SafeAreaView  style={{
         marginHorizontal:20,
         marginTop:50,
  
       }}>
      {/* <KSocialContent navigation={navigation}/> */}
      <BuyerKSocial navigation={navigation}/>
    </SafeAreaView>
  )
}

export default KSocial