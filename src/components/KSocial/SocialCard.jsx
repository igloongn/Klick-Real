import React, { useState } from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

const SocialCard = ({name,location,rate,image,navigation,route}) => {
    const [comment, setComment] = useState(false);
  return (
    <TouchableOpacity  style={styles.sponsoredcard} onPress={() => navigation.navigate("socialpage")}>
     <Image  style={{width:40, height:40, borderRadius:50, marginTop:20,marginLeft:20}} source={require('../../../assets/sponsorimage.png')}/>
    
    <Text style={styles.sponsorbigtext}>{name}</Text>
    <Text style={{
        fontSize:13,
        fontWeight:"400",
        color:"#6A6B6C",
        marginHorizontal:90,
        marginTop:5,
        }}>Yaba,Lagos</Text>
    {/* <Text style={{
        fontSize:13,
        fontWeight:"400",
        color:"#6A6B6C",
        marginHorizontal:90,
        marginTop:10,
        }}>{location}</Text> */}
    {/* </View> */}
    <Text style={{
        fontSize:14,
        fontWeight:"400",
        color:"#6A6B6C",
        marginHorizontal:20,
        marginTop:20,
        }}>We are offering free yoga classes tuesdays{"\n"} from 8AM -  9AM.</Text>
    <Image  style={{width:375, height:302, marginTop:15,marginLeft:0}} source={require('../../../assets/yogapic.png')}/>
    <View style={{flexDirection:"row",display:"flex"}}>
    <Ionicons style={{marginLeft:20,marginTop:7}} name="heart-sharp" size={24} color="red" />
    <Text style={{marginLeft:20,marginTop:7}} >234</Text>
    <Ionicons style={{marginLeft:20,marginTop:7}} name="chatbox-ellipses-outline" size={24} color="black" />
    <Text style={{marginLeft:20,marginTop:7}} >32</Text>
    <Entypo style={{marginLeft:160,marginTop:7}} name="share" size={24} color="black" />

        </View>
      
     
     
     
     
     
        
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    sponsoredcard:{
        height:482,
        width:375,
        borderRadius:16,
        backgroundColor:"#FFF",
        marginTop:20,
        marginHorizontal: 0,
      },
    //   sponsoredimage:{
    //     marginHorizontal:0,
    //     height:139,
    //     width:193,
    //    // marginTop:-73,  
         
    //    },
       sponsorbigtext:{
        fontSize:16,
        fontWeight:"500",
        color:"#000",
        marginHorizontal:90,
        marginTop:-40,
      },
      sponsorsmalltext:{
        fontSize:13,
        fontWeight:"400",
        color:"#6A6B6C",
        marginHorizontal:90,
        marginTop:0,
      },
   
});

export default SocialCard