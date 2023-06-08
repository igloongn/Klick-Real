import React from 'react'
import {SafeAreaView, Text} from "react-native"
import OrderContent from '../components/Orders/OrderContent'

const Orders = ({navigation}) => {
  return (
    <SafeAreaView  style={{
     
         marginHorizontal:20,
         marginTop:50,
  
       }}>
      <OrderContent navigation={navigation}/>
     
    </SafeAreaView>
  
  )
}

export default Orders