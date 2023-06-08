import React, { useState, useContext } from 'react'
import SellerBetter from './SellerBetter'
import SellerAddAddress from './SellerAddAddress'
import SellerAddLogo from './SellerAddLogo'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const SelleronBoardingContext = React.createContext();

const SellerOnboarding = ({navigation}) => {
    const [stage, setStage] = useState(1)
    const nextStage = () => setStage((prevState) => prevState + 1 > 3 ? 3 : prevState + 1)
    const prevStage = () => setStage((prevState) => prevState - 1 < 1 ? 1 : prevState - 1)

    const [storeName, setStoreName] = useState("");
    const [phone, setPhone] = useState("");
    const [industry, setIndustry] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [postal, setPostal] = useState("");
    const [file, setFile] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)





    const submit = async (navigation) => {
        setLoading(true);
        console.log({
            storeName,
            phone,
            state,
            postal,
            city,
            address,
            industry,
            country,
        })
        // if (true) return;
        let formData = new FormData();
        formData.append("storeName", storeName);
        formData.append("phone", phone);
        formData.append("state", state);
        formData.append("postal", postal);
        formData.append("city", city);
        formData.append("address", address);
        formData.append("industry", industry);
        formData.append("country", country);
        // formData.append('UPLOADCARE_PUB_KEY', 'c271ff5c8a4f6b806c36');
        // file.forEach(element => {
        //    
        //       uri: element.uri,
        //       name: element.filename,
        //       type: element.mediaType,
        //     })
        //   });
       
        formData.append("file",{
            uri: file[0]?.uri,
            type: 'image/jpg',
            name: file[0]?.filename,
        })
        console.log(formData)
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            const response = await fetch("https://klick-api.onrender.com/auth/registerstore", {
            // const response = await fetch("https://upload.uploadcare.com/base/", {
                method: "POST",
                mode: 'no-cors',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`
                },
                body: formData
                //   body:JSON.stringify({
                //     storeName,
                //     phone,
                //     state,
                //     postal,
                //     city,
                //     address,
                //     industry,
                //     country,
                //     // file

                // })
            })
            const _data = await response.json();
            // const _data = await response.text();
            console.log('y', _data)
            Alert.alert('Success', 'Your Store was created successfully');
            navigation.navigate('sellerstab')
        } catch (error) {
            // Handle network or other errors
            console.error(error);
            Alert.alert('Error', 'An error occured while creating store.');
        } finally {
            setLoading(false);
        }
    }

    const values = {
        storeName, setStoreName,
        phone, setPhone,
        industry, setIndustry,
        address, setAddress,
        state, setState,
        city, setCity,
        postal, setPostal,
        file, setFile,
        country, setCountry,
        navigation,
        submit: () => submit(navigation)
    }
    return (
        <>
            <SelleronBoardingContext.Provider value={values}>
                {stage === 1 ? <SellerBetter

                    prevStage={prevStage}
                    nextStage={nextStage}
                /> : <></>}
                {stage === 2 ? <SellerAddAddress prevStage={prevStage}
                    nextStage={nextStage} /> : <></>}
                {stage === 3 ? <SellerAddLogo loading={loading} prevStage={prevStage}
                    nextStage={nextStage} /> : <></>}
            </SelleronBoardingContext.Provider>
        </>
    )
}

export const useSellerOnboardingContext = () => {
    const context = useContext(SelleronBoardingContext)
    if (!context) throw Error();
    return context
}

export default SellerOnboarding