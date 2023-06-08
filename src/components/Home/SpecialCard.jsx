import React from 'react'
import {Text,View, StyleSheet, Image,ScrollView,FlatList,TouchableOpacity } from "react-native"




const DATA4 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
]


const SpecialCard = ({onPress, navigation, route}) => {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate("specialoffer")}>
    <View  style={styles.specialcard}>
    <Text style={styles.specialbigtext}>Become a {"\n"} Seller</Text>
    <Text style={styles.specialsmalltext}>Get started for free</Text>
    <Image  style={styles.specialimage} source={require('../../../assets/specialimage.png')}/>
       <View style={styles.specialinner}><Text style={{color:"#6C5FBC", marginHorizontal:20, marginTop:10, fontSize:12}}>Register Now</Text></View>
    </View>
   
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    specialcard:{
        height:184,
        width:294,
        borderRadius:16,
        backgroundColor:"#6C5FBC",
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

export default SpecialCard