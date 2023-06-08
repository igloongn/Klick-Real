import React, { useState,useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, Button, Image, } from "react-native"
import GeneralButton from '../General/GeneralButton'
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetLogginedUser } from '../../utils/apiHooks';
import { useIsFocused } from "@react-navigation/native";


const Tiles = () => {
    return (
        <View>
            <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image style={{ height: 60, width: 60, borderRadius: 50 }} source={require('../../../assets/orderpic.png')}></Image>
                    <View style={{ marginRight: 80 }}>
                        <Text style={{ marginLeft: 0, fontSize: 18, marginTop: 0 }}>The Cuddle Club</Text>
                        <Text style={{ marginLeft: 0, fontSize: 18, marginTop: 0, color: "#98999A" }}>Dec 15, 2024</Text>
                    </View>
                    <Text style={{ marginLeft: 0, fontSize: 18, marginTop: 10, color: "#EB270B" }}>- N165,000.00</Text>
                </View>
            </View>
        </View>
    )
}


const Wallet = ({ navigation,name }) => {
    const [eye, setEye] = useState(true)
    const [data, setData] = useState([])
    const [showGallery, setShowGallery] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const focus = useIsFocused();
    const { user, Loading, isErorr, people, getUserData } = useGetLogginedUser()
    console.log('user------',user)
    
    const getAllData = async () => {
    //    console.log(user)
      

      console.log('loading data');
      const token = await AsyncStorage.getItem('token');
    //   console.log('tok', token)
      const userData = await getUserData()

    //   fetch(`https://klick-api.onrender.com/brand/discount/${userData?.stores[0].id}`, {
        fetch(`https://klick-api.onrender.com/wallet/${userData.id}`, {
        method: "GET",
        mode: "no-cors",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })
        .then(res => res.json())
        .then(data => {
          setData(data?.data?.user)
            // console.log(data?.user?.email)
        // console.log(userData)
          //console.log('--all',data?.user)
        })
        .catch(e => console.log(e))
    }
  
  
    useEffect(() => {
      getAllData()
  
    }, [focus])

    const eyetoggle = () => {
        console.log(eye)
        setEye((prevState) => !prevState)
    }

  
    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: '#0485E8' }}>
                <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                        <Text style={{ color: 'white', fontSize: 28, fontWeight: '700', marginBottom: 10 }}>{user?.user?.firstName}</Text>
                            <Text style={{ color: 'white', fontSize: 18, fontWeight: '300' }}>Total balance</Text>
                            <Text style={{ color: 'white', fontSize: 35, fontWeight: '600' }}> {eye ? 'xxxxxxxxx' : '0.0'}</Text>
                            {/* {eye ? 'xxxxxxxxx' : {data.amount}} */}
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <TouchableOpacity onPress={() => eyetoggle()}>
                                {eye ? <Feather name="eye-off" size={24} color="white" style={{}} /> : <Feather name="eye" size={24} color="white" style={{}} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "row", marginTop: 60, justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => navigation.navigate('topup')}>
                            <View style={{ backgroundColor: 'white', height: 54, width: 159, borderRadius: 80 }}><Text style={{ fontSize: 18, fontWeight: '300', textAlign: 'center', top: 15 }}>Top-Up</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('withdraw')}>
                            <View style={{ backgroundColor: '#0485E8', height: 54, width: 159, borderWidth: 1, borderColor: "white", borderRadius: 80, }}><Text style={{ fontSize: 18, fontWeight: '300', color: "white", textAlign: 'center', top: 15 }}>Withdraw</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            
            <Text style={{ marginLeft: 30, fontSize: 22, marginTop: 30 ,marginBottom: 10 }}>Transaction History</Text>
            <Tiles />
            <Tiles />
            <Tiles />



        </View>
    )
}

/***
 * 
 * 
 * 
 * 
 * <Text style={{ paddingLeft: 30, color: 'white', fontSize: 18, fontWeight: '300', top: 40 }}>Total balance</Text>
                <View style={{ display: "flex", flexDirection: "row", }}>
                    {eye ? (<Text style={{ paddingLeft: 30, color: 'white', fontSize: 35, fontWeight: '600', top: 40 }}>200,00.00</Text>) : (<Text style={{ paddingLeft: 30, color: 'white', fontSize: 35, fontWeight: '600', top: 40 }}>Nxxx,xxx,xxx</Text>)}

                    <Feather name="eye" size={24} color="white" style={{left:140,top:45}} /> 
                    <TouchableOpacity onPress={() => console.log('Hello')}>
                        <Feather name="eye-off" size={24} color="white" style={{  }} />
                    </TouchableOpacity>
                     <View style={{ backgroundColor: "red" }}>
                        <TouchableOpacity style={{display :'flex', backgroundColor: "red" }} onPress={() => console.log('lllll')} >
                            
                        </TouchableOpacity>
                    </View>
                </View>
 */

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flex: 1,
        // paddingLeft: 30,
        //   alignItems: 'center',
        //   justifyContent: 'center',

    },

})


export default Wallet