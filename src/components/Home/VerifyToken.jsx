import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, ScrollView, ActivityIndicator, Alert } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_URL from "../../settings"

const VerifyToken = ({ navigation }) => {
    const [verify, setVerify] = useState('')

    const [loading, setLoading] = useState(false)

    const navigate = useNavigation()

    const registerUser = async () => {
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            console.log(verify)
            const response = await fetch(API_URL + "/auth/verify", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    code: verify
                })
            });
            
            const res_status_code = response.status;
            const res_data = await response.json();
            console.log(res_data)
            console.log(res_status_code)
            if (res_status_code != 200) {
                throw new Error(res_data.message);
            }

            await AsyncStorage.setItem('isLoggedIn', 'true');

            Alert.alert('Verification succesful', 'Verification was successful', [
                { text: 'OK', onPress: () => navigation.navigate('hometab') },
            ])

            navigation.navigate('hometab')
        } catch (error) {
            // Handle network or other errors
            console.error(error);
            Alert.alert('Error', 'An error occured while verifying email.');
        } finally {
            setLoading(false);
        }
    }


    return (
        <View style={styles.container}>
            <ScrollView>

                <Text style={{ fontWeight: "500", fontSize: 24, color: "#0B0B0E", marginLeft: 145, marginTop: 40 }}>Verify Token</Text>
                {/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",marginLeft:70}}>Register an account so you can start selling on Klick.</Text> */}
                <GeneralInput placeholder={''} name="Input Token" width={335} value={verify} onChangeValue={text => setVerify(text)} />

                <TouchableOpacity onPress={() => registerUser()}>
                    <GeneralButton backgroundColor={'#FEDD00'} message={(loading ? 'Loading .....' : 'Continue')} width={335} height={54} borderColor={'#FEDD00'} marginLeft={130} top={15} marginHorizintal={40} marginTop={30} />
                </TouchableOpacity>
                {loading && <ActivityIndicator size="large" />}


                {/* <Text style={{ fontWeight: "500", fontSize: 20, color: "#0B0B0E", marginLeft: 60, marginTop:15 }}>Don't have an account yet? </Text>
        <Pressable onPress={() => navigation.navigate('login')}><Text style={{ fontWeight: "500", fontSize: 20, color: "blue", marginLeft: 260, marginTop: -22 }}>Log in</Text></Pressable> */}

                <View style={{ marginTop: 50 }} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        // alignItems: 'center',
        justifyContent: 'center',
    },

})

export default VerifyToken;