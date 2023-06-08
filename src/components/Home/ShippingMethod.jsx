import React from 'react'
import {Text,View, StyleSheet, Image,TouchableOpacity,FlatList,ScrollView,Button, Pressable } from "react-native"
import { Octicons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 


const ShippingMethod = () => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=> navigation.navigate()}>
    <Text style={styles.titles}>Ship with Seller</Text>
    <Octicons name="person-fill" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-30}}>Your order will be handled completely by the seller from {'\n'}payment to delivery.
Contact seller for delivery information</Text>
</TouchableOpacity>


    <Text style={styles.titles}>Ship with K-Ship</Text>
    <Octicons name="id-badge" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Delivered by K-verified shippers</Text>
<Feather name="package" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Real-Time package tracking</Text>
<Ionicons name="bicycle" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Insurance on good in transit</Text>


    <Text style={styles.titles}>Ship with K-Secure</Text>
    <Octicons name="id-badge" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Delivered by K-verified shippers</Text>
<Feather name="package" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Real-Time package tracking</Text>
<Ionicons name="bicycle" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Insurance on good in transit</Text>
<Entypo name="wallet" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Payment secured by Klick</Text>
   
<MaterialIcons name="security" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>Buyer’s protection with K-secure</Text>
<Ionicons name="ios-return-up-back-sharp" size={24} color="blue" style={{marginLeft:30, marginTop:20}} />
    <Text style={{marginLeft:65, marginTop:-20}}>3 days return</Text>
    <View style={{height:35,width:70, backgroundColor:"#FEDD00", borderRadius:20, marginLeft:30,marginTop:12}}>
        <Text  style={{marginLeft:15, marginTop:10}}>N500</Text></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFF",
        flex:1,
    },
    row:{
        display: "flex",
        flexDirection:"row",
        marginTop:20
    },
    titles:{
        fontSize:18,
        fontWeight:"500",
        color:"#0B0B0E",
        marginLeft: 30,
        marginTop:30,
    }
})

export default ShippingMethod