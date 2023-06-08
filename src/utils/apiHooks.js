

import React, { useState, useEffect } from 'react';

import { useIsFocused } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useGetLogginedUser = () => {

    const [user, setUser] = useState(null)
    const [Loading, setLoading] = useState(null)
    const [error, seterror] = useState(null)
    const [isErorr, setisErorr] = useState(null)
    const focused = useIsFocused()
    const getUserData = async () => {
        setLoading(true)
        setisErorr(false)
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            const userresponse = await fetch(`https://klick-api.onrender.com/auth/user`, {
                method: "GET",
                mode: 'no-cors',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            if (userresponse?.status >= 200 && userresponse?.status < 203) {
                const userdata = await userresponse.json()
                setUser(userdata)
                console.log(userdata)
                return userdata
            } else {
                throw Error('status code not 200')
            }

        } catch (e) {
            console.log(e)
            setisErorr(true)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        getUserData();
        () => console.log('out...........')
     },[focused])

    return {
        user, 
        Loading,
        isErorr,
        people: 'yam',
        getUserData
    }

}

