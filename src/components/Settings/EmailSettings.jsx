import React,{useState} from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralInput from '../General/GeneralInput';
import GeneralButton from '../General/GeneralButton';

const EmailSettings = ({navigation}) => {
    const [email,setEmail] = useState("");
  return (
   <View>
    <Text style={{fontWeight:"500", fontSize:24, marginLeft:20,marginTop:20}}>Change account email</Text>
    <GeneralInput name={"Email"} value={email} onChangeValue={setEmail} width={333}/>
    <Text style={{marginLeft:40,marginTop:20}}>Your account password will be required to secure your account and be sure it’s really you.
</Text>
    <Text style={{marginLeft:40,marginTop:20}}>You’ll also need to verify your new email address before {"\n"}the change will be applied. A verification code will be{"\n"}sent to your new email address</Text>

    <GeneralButton message="Continue" backgroundColor={"#E6E6FA"}
          color="black" width={330} height={42} borderColor={"#E6E6FA"} size={15} top={10}
           marginLeft={140} marginTop={25} marginHorizintal={45}/>
   </View>
  )
}

export default EmailSettings