import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'


const SellerStoreCreate = ({navigation}) => {
  return (
     <View style={styles.container}>
    
    <Text style={{fontWeight:"500", fontSize:24, color:"#0B0B0E",marginLeft:100}}>Create your Klick Store</Text>
 <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",marginLeft:70}}>Create an account so you can start selling on Klick.</Text>
 <GeneralInput placeholder={'johndoe@gmail.com'} name="Email" width={335}  />
 <GeneralInput name="Password" width={335}/>
 <TouchableOpacity onPress={() => navigation.navigate('sellerbetter')}>
 <GeneralButton backgroundColor={'#FEDD00'} message={'Continue'} width={335} height={54} borderColor={'#FEDD00'}   marginLeft={130} top={15} marginHorizintal={40} marginTop={30}/>
 </TouchableOpacity>

  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      // alignItems: 'center',
      justifyContent: 'center',
    },
  
  })

export default SellerStoreCreate;