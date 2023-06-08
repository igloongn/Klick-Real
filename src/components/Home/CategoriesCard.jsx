import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity} from "react-native"

function CategoriesCard({navigation,route,pic,label}) {
  return (
    <TouchableOpacity onPress={()=>navigation.navigate(route)}>
        <View style={styles.mumcover}>
        <Image  style={styles.mum} source={pic}/>
        <Text style={{marginLeft:5}}>{label}</Text>
        {/* require('../../../assets/1.png') */}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
      mumcover:{
        width: 50,
        height: 50,
        backgroundColor:"#E6E6FA",
        borderRadius:50,
       // marginHorizontal:20,
        marginTop:20,
        marginLeft:30
      },
      mum: {
        marginHorizontal:0,
        marginTop:0,  
        width: 50,
        height: 50,
        borderRadius:50,
      },
     
  });

export default CategoriesCard