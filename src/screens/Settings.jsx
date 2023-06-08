import React from 'react'
import {Text, View, SafeAreaView} from "react-native"
import SettingsContent from '../components/Settings/SettingsContent'
import SellerSettingsContent from '../components/Settings/SellerSettingsContent'

const Settings = ({navigation}) => {
  return (
    <SafeAreaView style={{
     
      marginHorizontal:20,
      marginTop:50,

    }}>
       {/* <SettingsContent navigation={navigation}/> */}
       <SellerSettingsContent navigation={navigation}/>
    </SafeAreaView>
   
  )
}

export default Settings