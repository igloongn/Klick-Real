import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity} from "react-native"

const SponsorCard = ({item, name,location,rate,image, navigation}) => {
  console.log(item?.id)
  return (
    <TouchableOpacity  style={styles.sponsoredcard} onPress={()=> navigation.navigate({name:'productdetails',params:{id: item?.id}})}>
      <Image  style={styles.sponsoredimage} source={{uri:item?.images[0]}}/>
      <Text numberOfLines={1} style={styles.sponsorbigtext}>{item?.name}</Text>
      <View style={{flexDirection:"row",display:"flex"}}>
      <Text style={styles.sponsorsmalltext}>N{item?.price}</Text>
      <Text style={styles.sponsorsmalltext}>{item?.discount}</Text>
      </View>
     
     
        
      </TouchableOpacity>
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
       height: 140, 
       width: 140,
       borderRadius:10,
         
       },
       sponsorbigtext:{
        fontSize:16,
        fontWeight:"500",
        color:"#000",
        marginHorizontal:20,
        marginTop:20,
      },
      sponsorsmalltext:{
        fontSize:12,
        fontWeight:"400",
        color:"#6A6B6C",
        marginHorizontal:20,
        marginTop:5,
      },
   
});

export default SponsorCard