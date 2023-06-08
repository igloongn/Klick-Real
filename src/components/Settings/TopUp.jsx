import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, TextInput, Alert } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetLogginedUser } from '../../utils/apiHooks';
import { ActivityIndicator } from 'react-native-paper';


const TopUp = () => {
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [change, setChange] = useState('');



  const topup = async () => {
    setIsLoading(true)
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('tok', token)

      const submitdata = {

        amount: parseInt(amount),
        reference,
        description



      }
      console.log(submitdata)
      // const url = `https://klick-api.onrender.com/product/?category=${selectCatId}`
      const response = await fetch('https://klick-api.onrender.com/wallet', {
        method: "POST",
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(submitdata)
      })

      let res_status = await response?.statusText
      res_status = parseInt(res_status)
      if (response?.status >= 200 && response?.status < 203) {
        // const _data = await response?.json();
        // console.log('y', _data)

        //   navigation.navigate('wallet')
        Alert.alert('Success', 'Top up added successfully');
      } else {
        // throw Error(`${response?.statusText}`)
        Alert.alert('Error', `Top up added unsuccessfully ${response?.status}`);
      }



    } catch (error) {
      // Handle network or other errors
      console.error(error);
      Alert.alert('Error', 'An error occured ');
    } finally {
      setIsLoading(false)
    }

  };

  return (
    <View style={styles.container}>
      <Text style={{ textAlign: "center", fontSize: 18, color: "#0B0B0E" }}>How much do you want to Top up?</Text>
      <View style={{ paddingTop: 30 }}>
        <TextInput
          style={styles.input}
          onChangeText={text => setAmount(text)}
          value={amount}
          placeholder="e.g N10000"
        />

      </View>
      <Text style={{ textAlign: "center", fontSize: 18, color: "#0B0B0E", paddingTop: 20 }}>Total Available Balance - N0.0</Text>
      <View style={{ marginLeft: -30 }}>
        <GeneralInput name={'reference'} placeholder={'e.g first deposit'} width={335} value={reference} onChangeValue={(text) => setReference(text)} />
        <GeneralInput name={'description'} placeholder={'e.g new money'} width={335} value={description} onChangeValue={(text) => setDescription(text)} />
      </View>

      <TouchableOpacity onPress={() => topup()} style={{ paddingTop: 30 }}>
        <GeneralButton message={isLoading ? 'Loading...' : 'Continue'} color={change ? '#191600' : '#98999A'} marginLeft={130} top={15} backgroundColor={change ? '#FEDD00' : '#F7F7F7'} borderColor={'#F7F7F7'} height={54} width={335} />
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    // paddingLeft: 30,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    alignItems: "center",
    paddingTop: 30

  },
  input: {
    width: 335,
    height: 100,
    borderWidth: 2,
    borderColor: '#FEDD00',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontSize: 30,
  },

})

export default TopUp