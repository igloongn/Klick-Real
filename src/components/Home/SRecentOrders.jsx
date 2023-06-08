import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, ScrollView, } from "react-native"

const SRecentOrders = () => {
  return (
    <View style={styles.container}>
 <Image  style={{height:64, width:64, borderRadius:8}} source={require('../../../assets/orderpic.png')}></Image>
    <Text style={{color:"#0B0B0E",fontSize:14, fontWeight:"500",marginTop:-60,marginLeft:80 }}>Black Double Strap Sports Bra</Text>
    <Text style={{color:"#0485E8",fontSize:14, fontWeight:"500",marginTop:10,marginLeft:80 }}>N20,000 <Text  style={{color:"#0B0B0E"}}>April 29, 2023</Text></Text>
   
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        height:60,
        width:375,
        backgroundColor:"white",

     
     
    //   alignItems: 'center',
    //   justifyContent: 'center',
    
    },
   
})

export default SRecentOrders