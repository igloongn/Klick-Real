import React,{useState} from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralInput from '../General/GeneralInput';
import GeneralButton from '../General/GeneralButton';

const PasswordSettings = ({navigation}) => {
    const [current,setCurrent] = useState("");
    const [newpass, setNewPass] = useState("");
    const [confirm,setConfirm] = useState("");
  return (
   <View>
    <Text style={{fontWeight:"500", fontSize:24, marginLeft:20,marginTop:20}}>Change account password</Text>
    <GeneralInput name={"Current Password"} value={current} onChangeValue={setCurrent} width={333} />
    <GeneralInput name={"New Pasword"} value={newpass} onChangeValue={setNewPass} width={333} />
    <GeneralInput name={"Confirm New Password"} value={confirm} onChangeValue={setConfirm} width={333} />
   
    <GeneralButton message="Continue" backgroundColor={"#E6E6FA"}
          color="black" width={330} height={42} borderColor={"#E6E6FA"} size={15} top={10}
           marginLeft={140} marginTop={25} marginHorizintal={45}/>
   </View>
  )
}

export default PasswordSettings