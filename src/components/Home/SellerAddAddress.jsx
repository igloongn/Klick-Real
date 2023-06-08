import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'
import { useSellerOnboardingContext } from './SellerOnboarding'

const SellerAddAddress = ({ navigation, prevStage, nextStage }) => {

  const {setCountry,setAddress,setState,setCity,setPostal, country, address,state,city,postal} = useSellerOnboardingContext()

  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={{ fontWeight: "500", fontSize: 24, color: "#0B0B0E", marginLeft: 40 }}>Add an Address</Text>
        {/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",}}>Create an account so you can start selling on Klick.</Text> */}
        <GeneralInput placeholder={"e.g Nigeria"} name="Country" width={335} value={country} onChangeValue={text => setCountry(text)} />
        <GeneralInput placeholder={"e.g 7 wale Ademola lane, Ikeja"} name="Address" width={335} value={address} onChangeValue={text => setAddress(text)} />
        <GeneralInput placeholder={"e.g Lagos"} name="State" width={335} value={state} onChangeValue={text => setState(text)} />
        <GeneralInput placeholder={"e.g "} name="City" width={335} value={city} onChangeValue={text => setCity(text)} />
        <GeneralInput placeholder={"e.g 01573"} name="Postal" width={335} value={postal} onChangeValue={text => setPostal(text)} />
        <TouchableOpacity onPress={() => nextStage()}>
          <GeneralButton backgroundColor={'#FEDD00'} message={'Continue'} width={335} height={54} borderColor={'#FEDD00'} marginLeft={130} top={15} marginHorizintal={40} marginTop={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => prevStage()}>
          <GeneralButton backgroundColor={'#FEDD00'} message={'Previous'} width={335} height={54} borderColor={'#FEDD00'} marginLeft={130} top={15} marginHorizintal={40} marginTop={30} />
        </TouchableOpacity>

        <View style={{ marginTop: 70 }} />
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

export default SellerAddAddress