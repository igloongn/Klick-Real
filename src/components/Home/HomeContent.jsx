import React, { useState, useEffect, } from 'react'
import { Text, View, StyleSheet, Image, TextInput, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import CategoriesCard from './CategoriesCard';
import SpecialCard from './SpecialCard';
import SponsorCard from './SponsorCard';
import ScrollCard from './ScrollCard';
import SpecialOffer from './SpecialOffer';
import axios from "axios"
import { useBuyerSwitchVendorContext } from '../BuyerSwitchVendor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetLogginedUser } from '../../utils/apiHooks';
import { useIsFocused } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';




const DATA2 = [
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
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Fourth Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Fifth Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },

];





const Item = ({ title, navigation, onPress, item }) => (
  <>
    <TouchableOpacity onPress={() => navigation.navigate({name:'stories',params:{id: item?.id}})} style={styles.items}>
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


const HomeContent = ({ navigation }) => {
  const [search, onChangeSearch] = React.useState('');
 
const { user, Loading, isErorr, getUserData } = useGetLogginedUser()
  const [data, setData] = useState([]);
  const [_data, set_Data] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setisLogginedIn] = useState(false);
  const [buysell, setBuySell] = useState(true);
  const focus = useIsFocused();
  const [showGallery, setShowGallery] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getLoginData = async (navigation, alternative = () => null) => {
    try {
      const value = await AsyncStorage.getItem('isLoggedIn')
      if(value) setisLogginedIn(true);
      else setisLogginedIn(false)
    } catch (e) {
      // error reading value
    }
  }



  const mode_data = useBuyerSwitchVendorContext();
  console.log('mode', mode_data)
  if (mode_data?.mode === "vendor") {
    navigation.navigate({ name: "sellerstab" })
  }
  // useEffect(() => {

  //   if(mode_data?.mode === "buyer"){ navigation.navigate({ name: "sellerstab"})}
  //   return () => {
  //     // will run on every unmount.
  //     console.log("component is unmounting");
  //     }
  //   },[focus])


  useEffect(() => {
    axios.get("https://klick-api.onrender.com/product/")
      .then(res => setData(res.data.data))
      .catch(err => console.log(res.err))
      .finally(item => setLoading(false))
  }, []);



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
      .then(_data => {
        set_Data(_data?.data?.rows)
        console.log('--all',data)
      })
      .catch(e => console.log(e))
  }
  
  


  const renderItem = ({ item }) => {
    return (
      <View style={{ height: 40, width: 200, backgroundColor: "blue", marginBottom: 20 }}>
        <Text> {item.title}</Text>
      </View>
    );
  };



  useEffect(() => {
    getLoginData()
  }, [focus]);

  useEffect(() => {
    getAllData()

  }, [focus, isLoading])

  console.log(showGallery)

  return (
    <View >
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',paddingTop:80 }}>
        <Image style={styles.stretch} source={require('../../../assets/profile.jpg')}></Image>
       { isLoggedIn ?  <View style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 12,
    fontWeight: "400",
    color: "#98999A",
    marginRight: 30,
    }}>Location</Text>
          <Text style={styles.central}>Central Ikoyi</Text>
        </View>:<>
        <TouchableOpacity style={{ marginLeft: 20 , display: 'flex',paddingHorizontal: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center' ,backgroundColor: "#FEDD00"}} onPress={() => navigation.navigate('login')}>
          <Text>Login</Text>
        </TouchableOpacity>
        
        </>}
        <View style={{ width: 50,
    height: 50,
    backgroundColor: "#E6E6FA",
    borderRadius: 50,
    marginRight:30
    //marginLeft: 150,
  }}>
          <Ionicons name="notifications-outline" size={17} color="black" style={styles.bell} />
        </View>
      </View>
       {/* <View style={{ paddingHorizontal: 30, paddingTop: 80 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image style={{ height: 60, width: 60, borderRadius: 50 }} source={require('../../../assets/profile.jpg')}></Image>
                    <View style={{ marginRight: 80 }}>
                        <Text style={{ marginRight: 50, fontSize: 18, marginTop: 20 }}>Central,Ikoyi</Text>
                        <Text style={{ marginRight:50, fontSize: 18, marginTop: 0, color: "#98999A" }}>location</Text>
                    </View>
               
                    <View style={{ //width: 50,
   // height: 50,
    backgroundColor: "#E6E6FA",
    borderRadius: 50,
   
    //marginLeft: 150,
  }}>
          <Ionicons name="notifications-outline" size={17} color="black" style={styles.bell} />
        </View>
                </View>
            </View> */}
      <ScrollView style={styles.scrollView}>

        <TextInput
          style={styles.input}
          onChangeSearch={onChangeSearch}
          value={search}
          placeholder="Looking for something Amazing?"
          keyboardType="numeric"

        />
        <Ionicons name="search-outline" size={24} color="#6A6B6C" style={{ marginTop: -45, marginLeft: 260 }} />


        {loading && <View>
          <ActivityIndicator />
          {/* <Text>Loading...</Text> */}
        </View>}
        {_data && (<>

         <FlatList
          style={{ marginTop: 20 }}
          data={_data}
          renderItem={({ item }) => item?.posttype === "status" ? <Item navigation={navigation} item={item} /> : <></>}
          keyExtractor={(item) => item.id}
          horizontal
        /> 
          </>
        )}


        <Text style={{ fontWeight: "500", fontSize: 16, marginTop: 20, marginHorizontal: 20 }}>Categories</Text>

        <View style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}>
          <CategoriesCard  navigation={navigation} pic={require('../../../assets/1.png')} label={'mum'} route={'categories'}/>
          <CategoriesCard  navigation={navigation}  pic={require('../../../assets/1.png')} label={'mum'} route={'categories'}/>
          <CategoriesCard  navigation={navigation}  pic={require('../../../assets/2.png')} label={'baby'} route={'categories'}/>
          <CategoriesCard  navigation={navigation} pic={require('../../../assets/3.png')} label={'electron'} route={'categories'}/>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}>
          <CategoriesCard navigation={navigation} pic={require('../../../assets/4.png')} label={'homeware'} route={'categories'}/>
          <CategoriesCard navigation={navigation} pic={require('../../../assets/5.png')} label={'health'} route={'categories'}/>
          <CategoriesCard navigation={navigation} pic={require('../../../assets/6.png')} label={'beauty'} route={'categories'} />
          <CategoriesCard navigation={navigation} pic={require('../../../assets/7.png')} label={'fashion'} route={'categories'}/>
        </View>
        <Text style={{ fontWeight: "500", fontSize: 16, marginTop: 20, marginHorizontal: 15 }}>Special Offers</Text>


        <FlatList
          style={{ marginTop: 20 }}
          data={DATA2}
          renderItem={({ item }) => <SpecialCard navigation={navigation} />}
          keyExtractor={item => item.id}
          horizontal
        />

        <Text style={{ fontWeight: "500", fontSize: 16, marginTop: 20, marginHorizontal: 15 }}>Sponsored</Text>


        {/*       
      {loading && <View>
        <Text>Loading...</Text>
        </View>}
      {data && (
    <FlatList
       style={{marginTop: 20}}
        data={data}
        renderItem={({item}) =>  <ScrollCard  item={item} navigation={navigation}/>}
       // renderItem={ScrollCard}
        keyExtractor={item => item.id}
      
      /> 
      )}
 */}


        {loading && <View>
          <ActivityIndicator />
          {/* <Text>Loading...</Text> */}
        </View>}
        {data && (<>

          <FlatList
            style={{ marginTop: 20 }}
            data={data?.rows}
            renderItem={({ item }) => <SponsorCard item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
            horizontal
          />
        </>
        )}

{/* 
        <Text style={{ fontWeight: "500", fontSize: 16, marginTop: 20, marginHorizontal: 15 }}>Recommended For You</Text>

        <FlatList
          style={{ marginTop: 20 }}
          data={DATA2}
          renderItem={({ item }) => <Item2 title={"women"} />}
          keyExtractor={item => item.id}
          horizontal
        /> */}

        {/* {loading && <View>
          <Text>Loading...</Text>
        </View>}
        {data && (
          <FlatList
            style={{ marginTop: 20 }}
            data={data?.rows}
            renderItem={({ item }) => <ScrollCard item={item} navigation={navigation} />}
            // renderItem={ScrollCard}
            keyExtractor={item => item.id}

          />
        )} */}


        {/* {loading && <View>
        <Text>Loading...</Text>
        </View>}
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )} */}

        <View style={{ marginTop: 400 }}></View>



      </ScrollView>
      <TouchableOpacity onPress={() => {

        mode_data?.switchMode('vendor')

      }} style={{
        height: 42, width: 120, borderRadius: 20, backgroundColor: "#FEDD00", position: "absolute", alignItems: 'center',
        justifyContent: 'center', bottom: 180, right: 0
      }}><Text style={{ fontSize: 11 }}>Switch to Seller</Text></TouchableOpacity>

    </View>
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
    flexDirection: "row",
    marginTop: 80,
    justifyContent: 'space-between',
    alignItems:'center'
  },
  stretch: {
    width: 50,
    height: 50,
    marginLeft: 30,

    borderRadius: 50,
  },
  location: {
    fontSize: 12,
    fontWeight: "400",
    color: "#98999A",
    marginHorizontal: 0,

  },
  central: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0B0B0E",
    marginHorizontal: 0,

  },
  bellcover: {
    width: 50,
    height: 50,
    backgroundColor: "#E6E6FA",
    borderRadius: 50,
    marginLeft: 150,
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: 60,
    height: 60,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#007FFF",
  },
  items: {
    // backgroundColor: '#f9c2ff',

    marginVertical: 8,
    marginHorizontal: 16,
    width: 46,
    height: 46,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#007FFF",
    marginTop:30
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


});

export default HomeContent