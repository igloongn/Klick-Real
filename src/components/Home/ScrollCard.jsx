import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"

const ScrollCard = ({item,navigation}) => {
  const navigate = useNavigation()
  console.log(item)
  return (
   
    <TouchableOpacity  onPress={()=> navigation.navigate({name:'shoppage',params:{id: item.id}})} style={styles.sponsoredcard}>
      <Image  style={styles.sponsoredimage} source={{uri:item?.brand?.logo}}/>
      <View style={{flexDirection:"column", display:"flex"}}>
      <Text style={styles.sponsorbigtext} numberOfLines={1} >{item?.name}</Text>
      <View style={{flexDirection:"row",display:"flex"}}>
      <Text style={styles.sponsorsmalltext}>{item.price}</Text>
      <Text style={styles.sponsorsmallesttext}>{item.price}</Text>
      </View>
      </View>
      <Text style={styles.price}>{item.price}</Text>
     
     
        
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    sponsoredcard:{
        height:120,
        width:293,
        borderRadius:16,
        backgroundColor:"#FFF",
        marginTop:20,
        marginHorizontal: 22,
      },
      sponsoredimage:{
        marginHorizontal:20,
        marginTop:12, 
        height:100,
        width:100, 
         
       },
       sponsorbigtext:{
        fontSize:16,
        fontWeight:"500",
        color:"#000",
        marginLeft:130,
        marginTop:-90,
      },
      sponsorsmalltext:{
        
        fontSize:12,
        fontWeight:"400",
        color:"#6A6B6C",
        marginLeft:130,
        marginTop:5,
      },
      sponsorsmallesttext:{
        fontSize:12,
        fontWeight:"400",
        color:"#6A6B6C",
        marginLeft:30,
        marginTop:5,
      },
      price:{
        fontSize:12,
        fontWeight:"400",
        color:"#0000FF",
        marginLeft:130,
        marginTop:10,
      },
   
});

export default ScrollCard