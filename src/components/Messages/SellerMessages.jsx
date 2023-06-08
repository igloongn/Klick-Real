import React from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity,FlatList} from "react-native"



const DATA = [
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


const MessageList = ({navigation,item}) => {
  return (
    <View>
      <Text>Henry lala</Text>
    </View>
   
  )
}


const SellerMessages = ({navigation}) => {
  return (
    <View>
         <FlatList
       style={{marginTop: 20}}
        data={DATA}
        renderItem={({item}) =>  <MessageList navigation={navigation} />}
        keyExtractor={item => item.id}
      
      />
     

    </View>
   
  )
}

export default SellerMessages