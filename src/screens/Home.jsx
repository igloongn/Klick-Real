import React from 'react'
import {Text, View, SafeAreaView,Dimensions, StatusBar} from "react-native"
import HomeContent from '../components/Home/HomeContent'



const {height,width} = Dimensions.get('window')

const Home = ({navigation}) => {
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
      
    <HomeContent navigation={navigation}/>
    
    </SafeAreaView>
  )
}

export default Home