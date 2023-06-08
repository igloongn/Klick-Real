import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import SHomeCubes from './SHomeCubes'
import VendorDashboard from './VendorDashboard'

const SellerHomeContent = ({navigation}) => {
  return (
    <View style={styles.container}>

   <VendorDashboard navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
     
    
    },
   
})

export default SellerHomeContent