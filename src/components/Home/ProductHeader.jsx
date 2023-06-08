import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from "react-native"
import { AntDesign } from '@expo/vector-icons'; 

const ProductHeader = ({name,step}) => {
  return (
   <View style={{height:54, weight:375, backgroundColor:"#FAFAFA",marginTop:20}}>
<Text style={{fontWeight:"500", fontSize:24, color:"#0B0B0E",marginLeft:30,paddingTop:15}}>{name}<AntDesign name="exclamationcircleo" size={19} color="black" /> </Text>
<Text style={{fontWeight:"500", fontSize:12, color:"#0485E8",marginLeft:320,marginTop:-20}}>{step}</Text>
</View>
  
  )
}

export default ProductHeader