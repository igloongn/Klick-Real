import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TextInput, FlatList, ScrollView, TouchableOpacity } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { useIsFocused, useRoute } from '@react-navigation/native';

const Stories = ({ navigation, route }) => {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const focus = useIsFocused()
  const timer = useRef(null)

  const getAllData = async () => {
    const { id } = route.params;
    setLoading(true)
    console.log('loading data');
    const token = await AsyncStorage.getItem('token');
    console.log('tok', token)

    fetch("https://klick-api.onrender.com/post/" + id, {
      method: "GET",
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(data => {
        setData(data?.data)
        console.log('--all', data)
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    getAllData()

  }, [focus])


  useEffect(()=>{

    if(timer.current){
      clearTimeout(timer.current)
    }
      timer.current = setTimeout(()=>{
        navigation.goBack()
      },8000)
    
    
    return () => {
      clearTimeout(timer.current)
    }

  },[focus, isLoading, data])

  console.log(route)
  return (
    <>
      {data ? <View>

        <ImageBackground style={{ width: 375, height: 680, marginTop: 0, marginLeft: 20 }} source={{ uri: data?.contentUrl[0] ?? "" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={{ height: 5, width: 150.5, borderRadius: 5, backgroundColor: "#FFF", position: "absolute", marginTop: 20, marginLeft: 20 }} />
            <View style={{ height: 5, width: 150.5, borderRadius: 5, backgroundColor: "#FFF", position: "absolute", marginTop: 20, marginLeft: 180 }} />
          </View>
          <Image style={{ width: 40, height: 40, borderRadius: 50, marginTop: 40, marginLeft: 20 }} source={require('../../../assets/picasso.png')} />

          <Text style={{ fontWeight: "500", fontSize: 17, marginLeft: 70, marginTop: -40, color: "white" }}>Little Picassos</Text>
          <Text style={{
            fontSize: 13,
            fontWeight: "400",
            color: "white",
            marginHorizontal: 70,
            marginTop: -1,
          }}>40m ago</Text>
        </ImageBackground>

      </View> : <></>}
    </>
  )

  // const { id } = route.params;
  // // const {id} = useParams();


  // const getAllData = async () => {
  //   const { id } = route.params;
  //   console.log('loading data');
  //   const token = await AsyncStorage.getItem('token');
  //   console.log('tok', token)

  //   fetch("https://klick-api.onrender.com/post/" + id, {
  //     method: "GET",
  //     mode: "no-cors",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       setData(data?.data?.rows)
  //       console.log('--all',data)
  //     })
  //     .catch(e => console.log(e))
  // }

  // useEffect(() => {
  //   getAllData()

  // }, [focus, isLoading])



  // const [data, setData] = useState([])
  // const route = useRoute();
  // const { id } = route.params;
  // console.log(route)
  // const navigate = useNavigation()
  // const {id} = useParams();
  // useEffect(() => {
  //   axios.get("https://klick-api.onrender.com/post/" + 1)
  //     // .then(res => {
  //     //   setData(res.data)
  //     //   console.log(res.data)
  //     // }
  //     // )
  //     // .catch(err => console.log(err))
  // }, [])


  return (
    <View>

      <ImageBackground style={{ width: 375, height: 680, marginTop: 0, marginLeft: 20 }} source={{ uri: data?.contentUrl[0] ?? "" }}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <View style={{ height: 5, width: 150.5, borderRadius: 5, backgroundColor: "#FFF", position: "absolute", marginTop: 20, marginLeft: 20 }} />
          <View style={{ height: 5, width: 150.5, borderRadius: 5, backgroundColor: "#FFF", position: "absolute", marginTop: 20, marginLeft: 180 }} />
        </View>
        <Image style={{ width: 40, height: 40, borderRadius: 50, marginTop: 40, marginLeft: 20 }} source={require('../../../assets/picasso.png')} />

        <Text style={{ fontWeight: "500", fontSize: 17, marginLeft: 70, marginTop: -40, color: "white" }}>Little Picassos</Text>
        <Text style={{
          fontSize: 13,
          fontWeight: "400",
          color: "white",
          marginHorizontal: 70,
          marginTop: -1,
        }}>40m ago</Text>
      </ImageBackground>

    </View>
  )
}

export default Stories