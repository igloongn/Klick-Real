import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity,ScrollView} from "react-native"

const SellerProductList = ({navigation}) => {
  return (
    <View style={styles.container}>
    <ScrollView>
    <Text>SellerProductList</Text>
    <View >
    <Image style={{height:100,width:100,borderRadius:10}} source={require('../../../assets/Ellipse.png')}></Image>
    <Text>Car Tire</Text>
    <Text>ID: 088134NT</Text>
    <Text>N20,000</Text>
    <Text>Available Stock: 234</Text>
    </View>
    </ScrollView>
  </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    //   alignItems: 'center',
      justifyContent: 'center',
    },
  
  })

export default SellerProductList