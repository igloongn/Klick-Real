import React, { useState,useEffect } from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, Pressable,FlatList,ScrollView} from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralButton from '../General/GeneralButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetLogginedUser } from '../../utils/apiHooks';
import { useIsFocused } from "@react-navigation/native";

const SettingsTiles = ({name,route,icon, navigation,item}) => {
    return (
        <TouchableOpacity onPress={()=>navigation.navigate(route)} style={{marginLeft:20,marginBottom:20,marginTop:25}} >
        {/* <SimpleLineIcons  style={{marginTop:25, marginLeft:5}}  name={icon} size={14} color="black" /> */}
        <Text style={{marginLeft:27,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>{item?.title}</Text>
        <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" />

        </TouchableOpacity>
    )
}

const Discounts = ({navigation}) => {
  const [data, setData] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const focus = useIsFocused();
  const { user, Loading, isErorr, getUserData } = useGetLogginedUser()
  const getAllData = async () => {
    console.log('loading data');
    const token = await AsyncStorage.getItem('token');
    console.log('tok', token)
    const userData = await getUserData()
    fetch(`https://klick-api.onrender.com/brand/discount/${userData?.stores[0].id}`, {
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
        console.log('--all',data)
      })
      .catch(e => console.log(e))
  }


  useEffect(() => {
    getAllData()

  }, [focus, isLoading])
  return (
    <View style={{backgroundColor:"white", flex:1,}}>
      <ScrollView>
<View>
<FlatList
          style={{ marginTop: 20 }}
          data={data}
          renderItem={({ item }) => item ? <SettingsTiles navigation={navigation} item={item} /> : <></>}
          keyExtractor={(item) => item.id}
          
        />
        </View>
        <Pressable onPress={()=> navigation.navigate("addnewdiscount")} style={{}}>
        <GeneralButton backgroundColor={"#FFF"} borderColor={"#FEDD00"} width={320} 
    marginTop={30} marginHorizintal={43} message={"+ Add New Discount offer"} marginLeft={100} height={52} top={15}/>
    </Pressable>
       </ScrollView>
       
        
   
      


    </View>
  )
}

export default Discounts