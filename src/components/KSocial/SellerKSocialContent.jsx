import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, TextInput, FlatList, ScrollView, Alert, Modal, Dimensions, TouchableOpacity, Pressable, ActivityIndicator } from "react-native"
import { Ionicons } from '@expo/vector-icons';
// import SocialCard from './SocialCard';
import GeneralInput from '../General/GeneralInput';
import { useFocusEffect } from '@react-navigation/native';
import axios from "axios"

import { useIsFocused } from "@react-navigation/native";
import GeneralButton from '../General/GeneralButton'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';

import { ImagePicker } from 'expo-image-multiple-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetLogginedUser } from '../../utils/apiHooks';
import { Entypo } from '@expo/vector-icons';





const Item = ({ title, navigation, onPress, item }) => (
  <>
    <TouchableOpacity onPress={() => navigation.navigate({name:'stories',params:{id: item?.id}})} style={styles.item}>
      <Image style={{
        width: 55,
        height: 55,
        borderRadius: 100,
        marginTop:-8,
        right:9,
        borderColor:'#0485E8',
        borderWidth:2,
        
      // }} source={{ uri: item?.contentUrl[0] ?? "" }} />
    }} source={{ uri: item?.contentUrl[0] ?? "" }} />

    </TouchableOpacity>
    {/* <Text style={{fontSize: 8}}>{item.contentUrl[0]}</Text> */}
  </>

);

const Item2 = ({ title }) => (
  <View style={styles.item2}>
    <Text style={styles.title}>{title}</Text>
  </View>
);



const SocialCard = ({ name, location, rate, image, navigation, route, item }) => {
  const [comment, setComment] = useState(false);
  return (
    <View style={styles.sponsoredcard} onPress={() => navigation.navigate("socialpage")}>
      <Image style={{ width: 40, height: 40, borderRadius: 50, marginTop: 20, marginLeft: 20 }} source={{ uri: item?.Brand.logo }} />

      <Text style={styles.sponsorbigtext}>{item?.Brand.name}</Text>
      <Text style={{
        fontSize: 13,
        fontWeight: "400",
        color: "#6A6B6C",
        marginHorizontal: 90,
        marginTop: 5,
      }}>Yaba,Lagos</Text>
      {/* <Text style={{
      fontSize:13,
      fontWeight:"400",
      color:"#6A6B6C",
      marginHorizontal:90,
      marginTop:10,
      }}>{location}</Text> */}
      {/* </View> */}
      <Text style={{
        fontSize: 14,
        fontWeight: "400",
        color: "#6A6B6C",
        marginHorizontal: 20,
        marginTop: 20,
      }}>{item?.caption}</Text>
      <Image style={{ width: 375, height: 302, marginTop: 15, marginLeft: 0 }} source={{uri : item?.contentUrl ?item?.contentUrl[0] : "" }} />
      <View style={{ flexDirection: "row", display: "flex" }}>
        <Ionicons style={{ marginLeft: 20, marginTop: 7 }} name="heart-sharp" size={24} color="red" />
        <Text style={{ marginLeft: 20, marginTop: 7 }} >{item?.likesCount}</Text>
        <Ionicons style={{ marginLeft: 20, marginTop: 7 }} name="chatbox-ellipses-outline" size={24} color="black" />
        <Text style={{ marginLeft: 20, marginTop: 7 }} >{item?.commentsCount}</Text>
        <Entypo style={{ marginLeft: 160, marginTop: 7 }} name="share" size={24} color="black" />

      </View>







    </View>
  )
}




const SellerKSocialContent = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');

  const [data, setData] = useState([])
  const [showGallery, setShowGallery] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const focus = useIsFocused();
  const { user, Loading, isErorr, getUserData } = useGetLogginedUser()
  const getAllData = async () => {
    console.log('loading data');
    const token = await AsyncStorage.getItem('token');
    console.log('tok', token)

    fetch("https://klick-api.onrender.com/post/", {
      method: "GET",
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(res => res.json())
      .then(data => {
        setData(data?.data?.rows)
        console.log('--all',data)
      })
      .catch(e => console.log(e))
  }

  // useEffect(() => {
  //   getPostData()
  // }, [focus]);



  const getPostData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const response = await fetch("https://klick-api.onrender.com/post/", {
        method: "GET",
        mode: 'no-cors',
        headers: {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      })
      if (response?.status >= 200 && response?.status < 203) {
        const _data = await response.json();
        console.log(_data)
        setData(_data)

      } else {
        throw Error('status code not 200')
      }



    } catch (error) {
      // Handle network or other errors
      console.error(error);
      Alert.alert('Error', 'An error occured while loading status ');
    } finally {
      // setIsLoading(false)
    }
  }


  const uploadStatus = async (assets) => {
    setIsLoading(true)
    let formdata = new FormData();
    assets.forEach(element => {
      formdata.append("files", {
        uri: element.uri,
        name: element?.filename,
        type: 'image/jpg',
      })
    });
    formdata.append("post_type", 'status')
    formdata.append("caption", "")
    console.log('--form', formdata)


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
      if (response?.status >= 200 && response?.status < 203) {
        const _data = await response.json();
        console.log('y----', _data)
        Alert.alert('Success', 'Status added successfully');
        navigation.navigate('sellerksocialcontent')
      } else {
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

  useEffect(() => {
    getAllData()

  }, [focus, isLoading])

  console.log(showGallery)

  return (<>
    {
      isLoading && <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(240,240,240,0.1)', postion: 'absolute', marginLeft: -10, marginTop: -50, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
        <ActivityIndicator size={60} />
        <Text>Uploading your status ......</Text>
      </View>
    }
    {showGallery && <View style={{ backgroundColor: 'white', postion: 'absolute', marginLeft: -10, marginTop: -50, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
      <ImagePicker
        onSave={(assets) => { /*setFile(assets);*/ uploadStatus(assets); console.log(assets); setShowGallery(false) }}
        onCancel={() => setShowGallery(false)}
        limit={3}
      />
    </View>}
    {<View>

      <ScrollView style={styles.scrollView}>




        <FlatList
          style={{ marginTop: 20 }}
          data={data}
          renderItem={({ item }) => item?.posttype === "status" ? <Item navigation={navigation} item={item} /> : <></>}
          keyExtractor={(item) => item.id}
          horizontal
        />

        <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
          <TouchableOpacity onPress={() => { setShowGallery(true); console.log('Pressed') }} style={{ height: 60, width: 60, borderRadius: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: "black", /*borderStyle: "dashed",*/ backgroundColor: "#E1E1E1", }}>

            {<Ionicons name="person-add-outline" size={20} color="black" />

            }
          </TouchableOpacity>
          <Pressable onPress={() => navigation.navigate('createpost')}>
            {/* <GeneralInput width={275} placeholder={"Start a post..."} marginLeft={-30}/> */}
            <View style={{ height: 42, width: 275, borderRadius: 8, borderColor: "#E1E1E1", borderStyle: "solid", backgroundColor: "#FAFAFA", marginLeft: 15, marginTop: 10 }}>
              <Text style={{ marginLeft: 20, marginTop: 10 }}>Start a post...</Text></View>
          </Pressable>
        </View>

        <FlatList
          style={{ marginTop: 20 }}
          // data={data.map((item)=>{return {user: user , data: item}})}
          data={data}
          renderItem={({ item }) => item?.posttype === "ksocial" ? <SocialCard navigation={navigation} item={item} name={"Zen Yoga Studio "} location={"Yaba,Lagos"} /> : <></>}
          keyExtractor={item => item.id}

        />





      </ScrollView>
    </View>}

  </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    display: "flex",
    flexDirection: "row"
  },
  stretch: {
    width: 50,
    height: 50,

    borderRadius: 50,
  },
  location: {
    fontSize: 12,
    fontWeight: "400",
    color: "#98999A",
    marginHorizontal: 10,

  },
  central: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0B0B0E",
    marginHorizontal: 10,

  },
  bellcover: {
    width: 50,
    height: 50,
    backgroundColor: "#E6E6FA",
    borderRadius: 50,
    marginHorizontal: 110,
  },
  bell: {
    marginHorizontal: 17,
    marginTop: 15,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 40,
    borderWidth: 1,
    padding: 10,
    borderColor: "#98999A",
    borderRadius: 8
  },
  item: {
    // backgroundColor: '#f9c2ff',

    marginVertical: 8,
    marginHorizontal: 16,
    width: 46,
    height: 46,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#007FFF",
  },
  item2: {
    backgroundColor: '#E6E6FA',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 104,
    height: 46,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#007FFF",
  },
  title: {
    fontSize: 32,
    color: "#000",

  },
  mumcover: {
    width: 50,
    height: 50,
    backgroundColor: "#E6E6FA",
    borderRadius: 50,
    marginHorizontal: 20,
    marginTop: 20,
  },
  mum: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  specialcard: {
    height: 184,
    width: 335,
    borderRadius: 16,
    backgroundColor: "#6C5FBC",
    marginTop: 20
  },
  specialbigtext: {
    fontSize: 24,
    fontWeight: "500",
    color: "#FFF",
    marginHorizontal: 20,
    marginTop: 20,
  },
  specialsmalltext: {
    fontSize: 14,
    fontWeight: "400",
    color: "#FFF",
    marginHorizontal: 20,
    marginTop: 5,
  },
  specialinner: {
    height: 42,
    width: 118,
    borderRadius: 80,
    backgroundColor: "#FFF",
    marginTop: -20,
    marginHorizontal: 20
  },
  specialimage: {
    marginHorizontal: 180,
    marginTop: -73,

  },

  sponsoredcard: {
    height: 482,
    width: 375,
    borderRadius: 16,
    backgroundColor: "#FFF",
    marginTop: 20,
    marginHorizontal: 0,
  },
  //   sponsoredimage:{
  //     marginHorizontal:0,
  //     height:139,
  //     width:193,
  //    // marginTop:-73,  

  //    },
  sponsorbigtext: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    marginHorizontal: 90,
    marginTop: -40,
  },
  sponsorsmalltext: {
    fontSize: 13,
    fontWeight: "400",
    color: "#6A6B6C",
    marginHorizontal: 90,
    marginTop: 0,
  },


});

const stylesSocial = StyleSheet.create({


});

export default SellerKSocialContent