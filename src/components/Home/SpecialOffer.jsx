import React from 'react'
import {Text,View, StyleSheet, Image, } from "react-native"


const Special = ({background}) => {
    return(
        <View  style={{...styles.specialcard, backgroundColor:background}}>
        <Text style={styles.specialbigtext}>40% Discount on {"\n"} New Arrivals</Text>
        <Text style={styles.specialsmalltext}>Get started for free</Text>
        <Image  style={styles.specialimage} source={require('../../../assets/specialimage.png')}/>
           <View style={styles.specialinner}><Text style={{color:"#6C5FBC", marginHorizontal:20, marginTop:10}}>Shop Now</Text></View>
        </View>

    )
}

const SpecialOffer = ({navigation}) => {
  return (
   <View>
    <Special background={"#FF7A28"} />
    <Special background={"#0485E8"} />
    <Special background={"#5FBC68"}/>
   </View>
  )
}

const styles = StyleSheet.create({
    specialcard:{
        height:184,
        width:294,
        borderRadius:16,
       // backgroundColor:background,
        marginTop:20,
        marginHorizontal:15
      },
      specialbigtext:{
        fontSize:24,
        fontWeight:"500",
        color:"#FFF",
        marginHorizontal:20,
        marginTop:20,
      },
      specialsmalltext:{
        fontSize:14,
        fontWeight:"400",
        color:"#FFF",
        marginHorizontal:20,
        marginTop:5,
      },
      specialinner:{
        height:42,
        width:118,
        borderRadius:80,
        backgroundColor:"#FFF",
        marginTop:-20,
        marginHorizontal:20
      },
      specialimage:{
       marginHorizontal:165,
       marginTop:-73,  
        
      }
     
   
});

export default SpecialOffer