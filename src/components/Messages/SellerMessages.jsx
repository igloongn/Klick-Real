import React, { useState } from 'react';
import {Text,View, StyleSheet, Image, TouchableOpacity,FlatList,ActivityIndicator} from "react-native"



const SellerMessages = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);



  return (
    <View style={{marginTop:250}}>
         {/* <Text style={{fontSize:30,fontWeight:'600', alignItems:'center',justifyItems:'center',marginTop:50}}>Loading....</Text> */}
         <ActivityIndicator size={70} />
         {/* {isLoading && <ActivityIndicator size="large" color="#0000ff" />} */}

    </View>
   
  )
}

export default SellerMessages