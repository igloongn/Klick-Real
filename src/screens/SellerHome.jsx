import React from 'react'
import {Text, View, SafeAreaView,Dimensions, StatusBar} from "react-native"
import HomeContent from '../components/Home/HomeContent'
import SellerHomeContent from '../components/Home/SellerHomeContent'





const {height,width} = Dimensions.get('window')

const SellerHome = ({navigation}) => {
  return (
    <SafeAreaView  style={{
       backgroundColor: '#FFFFFF',
        flex: 1,
      //   alignItems:"center",
      //   justifyContent:"center",
      //   // height:height,
      //   // width:width,
      //   marginHorizontal:20,
      //   paddingTop:StatusBar.currentHeight,
      

     }}>
      
   
    <SellerHomeContent navigation={navigation}/>
    {/* <SellerHome navigation={navigation}/> */}
    </SafeAreaView>
  )
}

export default SellerHome