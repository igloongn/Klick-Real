import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'
import { SelectList } from 'react-native-dropdown-select-list'
// import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import { useSellerOnboardingContext } from './SellerOnboarding'



const SellerBetter = ({ navigation, prevStage, nextStage }) => {
  
  const { setIndustry , setStoreName, setPhone, industry , storeName, phone} = useSellerOnboardingContext()

  const data = [
    { key: '1', value: 'Electronics' },
    { key: '2', value: 'Fashion' },
    { key: '3', value: 'Home and Garden' },
    { key: '4', value: 'Toys and Games' },
    { key: '5', value: 'Food and beverages' },
    { key: '6', value: 'Beauty and personal care' },
    { key: '7', value: 'Travel' },
    { key: '8', value: 'Education' },
    { key: '9', value: 'Healthcare' },
    { key: '10', value: 'Business' },

  ]




  fetch('https://klick-api.onrender.com/auth/registerstore', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Add any additional headers if required
    },
    body: JSON.stringify({
      title: 'New Post',
      content: 'This is the content of the post.',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Handle the response data
    })
    .catch((error) => {
      console.error(error); // Handle any error that occurred
    });


  return (
    <View style={styles.container}>
      <ScrollView>

        <Text style={{ fontWeight: "500", fontSize: 24, color: "#0B0B0E", marginLeft: 40, marginTop: 50 }}>Let’s Get to Know Your Business Better</Text>
        {/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",}}>Create an account so you can start selling on Klick.</Text> */}
        <GeneralInput placeholder={'e.g Lilli Stores'} name="Name of Store" width={335} value={storeName} onChangeValue={text => setStoreName(text)} />
        <GeneralInput placeholder={"e.g 07068820193"} name="Business Phone number" width={335} value={phone} onChangeValue={text => setPhone(text)} />
        <View style={{ marginTop: 20, width: 335, marginLeft: 43 }}>
          <SelectList
            placeholder={'e.g Food'}
            setSelected={(val) =>  setIndustry(val)}
            data={data}
            save="value"
          />
        </View>



        {/* <GeneralInput name="Which industry will you be primarily operating in?" width={335}/> */}



        <TouchableOpacity onPress={() => nextStage()}>
          <GeneralButton backgroundColor={'#FEDD00'} message={'Continue'} width={335} height={54} borderColor={'#FEDD00'} marginLeft={130} top={15} marginHorizintal={40} marginTop={30} />
        </TouchableOpacity>

        <View style={{ marginTop: 50 }} />
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
  containerStyle: {
    flex: 1,
  },
  spacerStyle: {
    marginBottom: 15,
  },
  safeContainerStyle: {
    flex: 1,
    margin: 20,
    justifyContent: "center",
  },

})

export default SellerBetter