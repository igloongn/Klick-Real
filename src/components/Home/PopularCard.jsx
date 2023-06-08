import React from 'react'
import {Text,View, StyleSheet, Image, } from "react-native"

const PopularCard = ({name,location,rate,image}) => {
  return (
    <View  style={styles.sponsoredcard}>
      <Image  style={styles.sponsoredimage} source={require('../../../assets/playmat.png')}/>
      <Text style={styles.sponsorbigtext}>{name}</Text>
      <View style={{flexDirection:"row",display:"flex"}}>
      <Text style={styles.sponsorsmalltext}>{location}</Text>
      <Text style={styles.sponsorsmalltext}>{rate}</Text>
      </View>
     
     
        
      </View>
  )
}

const styles = StyleSheet.create({
    sponsoredcard:{
        height:239,
        width:193,
        borderRadius:16,
        backgroundColor:"#FFF",
        marginTop:20,
        marginHorizontal: 22,
      },
      sponsoredimage:{
        marginHorizontal:20,
       // marginTop:-73,  
       borderRadius:16,
         
       },
       sponsorbigtext:{
        fontSize:16,
        fontWeight:"500",
        color:"#000",
        marginHorizontal:20,
        marginTop:20,
      },
      sponsorsmalltext:{
        fontSize:14,
        fontWeight:"400",
        color:"#6A6B6C",
        marginHorizontal:20,
        marginTop:5,
      },
   
});

export default PopularCard