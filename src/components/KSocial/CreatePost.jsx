import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert, Dimensions , ActivityIndicator } from "react-native"
import GeneralInput from '../General/GeneralInput'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImagePicker } from 'expo-image-multiple-picker'
import {Ionicons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

const CreatePost = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showGallery, setShowGallery] = useState(false)
  const [file, setFile] = useState([])



  // const onSubmit = async () => {
  //   setIsLoading(true)
  //   try {
  //     // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI1Yjc4ZmMzLTRmNjEtNDI1MS04YTBhLTBjNGZkNGQ0MjE3NiIsImZ1bGxOYW1lIjoiVGVzdDYgVGVzdGVyNiIsImVtYWlsIjoidGVzdDZAZnVsbGFuZ2xlLm9yZyIsInJvbGUiOiJndWVzdCIsImlzQWN0aXZhdGVkIjp0cnVlLCJ2ZW5kb3JNb2RlIjp0cnVlLCJ3ZWJzaXRlIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwianRpIjoiZDVhNmYyZTYtYzM3OS00ODU2LTlhMDItNzJkNTEwMGZhMWFjIiwic3RvcmVJZCI6IjkzNTYxMDNlLTcwYTktNDM5NS1hNmE3LTEwYTU5MWFhMmEzMiIsImlhdCI6MTY4NTA4NjQyNSwiZXhwIjoxNjg1MTU4NDI1fQ.gShUMOGsX97sVv0DeBe5ZZRvm6XqUndj89My_hh7EHk' //await AsyncStorage.getItem('token');

  //     const token = await AsyncStorage.getItem('token');
  //     console.log(token)
  //     const response = await fetch("https://klick-api.onrender.com/post/", {
  //       method: "POST",
  //       mode: 'no-cors',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         caption: text,
  //         "post_type": 'ksocial'
  //       })
  //     })
  //     const _data = await response.json();
  //     console.log(_data)
  //     Alert.alert('Success', 'Post created');
  //     setText('')
  //   } catch (error) {
  //     // Handle network or other errors
  //     console.error(error);
  //     Alert.alert('Error', 'An error occured during login.');
  //   } finally {
  //     setIsLoading(false);
  //   }

  // }

  const onSubmit = async () => {
    setIsLoading(true)
    let formdata = new FormData();
    file.forEach(element => {
      formdata.append("files", {
        uri: element.uri,
        name: element?.filename,
        type: 'image/jpg',
      })
    });
    formdata.append("post_type", 'ksocial')
    formdata.append("caption", text)
    console.log('--form',formdata)


    try {
      const token = await AsyncStorage.getItem('token');
      console.log('tok', token)
     
      const response = await fetch("https://klick-api.onrender.com/post/", {
        method: "POST",
        mode: 'no-cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
        body: formdata
      })
      if(response?.status >= 200 && response?.status < 203 ){
        const _data = await response.json();
        console.log('y----', _data)
        Alert.alert('Success', 'Status added successfully');
        // navigation.navigate('sellerksocialcontent')
      } else{
        throw Error('statsuc code not 200')
      }
     
      

    } catch (error) {
      // Handle network or other errors
      console.error(error);
      Alert.alert('Error', 'An error occured ');
    } finally {
      setIsLoading(false)
    }
  }
  return (<>

    {
      isLoading && <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(240,240,240,0.1)', postion: 'absolute', marginLeft: -10, marginTop: -50, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
        <ActivityIndicator size={60} />
        <Text>Uploading your status ......</Text>
      </View>
    }
    {showGallery && <View style={{ backgroundColor: 'white', postion: 'absolute', marginLeft: -10, marginTop: -50, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
      <ImagePicker
        onSave={(assets) => { setFile(assets); console.log(assets); setShowGallery(false) }}
        onCancel={() => setShowGallery(false)}
        limit={3}
      />
    </View>}

    <View style={styles.container}>


      <View style={{ marginRight: 25, marginBottom: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItem: 'center' }}>
        <TouchableOpacity onPress={() => { setShowGallery(true); console.log('Pressed') }} style={{ height: 60, width: 60, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

          {<FontAwesome name="photo" size={24} color="black" />

          }
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onSubmit()} style={{

          borderRadius: 10, display: 'flex', justifyContent: 'center', alignContent: 'center',
        }}><Text style={{ color: 'blue', fontSize: 20, right:20 }}>Post</Text></TouchableOpacity>
      </View>
      <TextInput style={{ ...styles.input, border: 'none' }}
        onChangeText={text => setText(text)}
        placeholder={"|What do you want to talk about?"}
        // secureTextEntry={password} 
        value={text}
        multiline={true}
        numberOfLines={4}
        leftIcon={<AntDesign name="user" size={24} color="black" />}
      />

    </View>

    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {/* <Text>Uploaded image</Text> */}
      <Image style={{width: 300 , height: 100 }} source={{uri: file[0]?.uri ?file[0]?.uri : "" }}></Image>
    </View>

  </>
  )
}


const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginLeft: 42,
    //backgroundColor:"white"
  },
  text: {
    fontSize: 13,
    marginBottom: 10,
    fontWeight: '500',
    fontSize: 16,

  },
  input: {
    // height: 432,
    padding: 10,
    // backgroundColor: "#F8F8F8",
    //borderColor: '#BABABA',
    // borderRadius: 10,
    width: 333,
    // borderWidth: 1,
    // borderColor: '#C4C4C4'



  },
  desc: {
    height: 135,
  }
})

export default CreatePost