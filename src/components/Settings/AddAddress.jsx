import React,{useState} from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, ScrollView, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralInput from '../General/GeneralInput';
import GeneralButton from '../General/GeneralButton';

const  AddAddress = ({navigation}) => {
    const [current,setCurrent] = useState("");
    const [newpass, setNewPass] = useState("");
    const [confirm,setConfirm] = useState("");
  return (
   <View>
    <Text style={{fontWeight:"500", fontSize:24, marginLeft:20,marginTop:20}}>Change account password</Text>
    <ScrollView>
    <GeneralInput name={"Name"} value={current} onChangeValue={setCurrent} height={40} width={333}/>
    <GeneralInput name={"Phone number"} value={newpass} onChangeValue={setNewPass} width={333} />
    <GeneralInput name={"Delivery address"} value={confirm} onChangeValue={setConfirm} width={333} />
    <GeneralInput name={"State"} value={current} onChangeValue={setCurrent} height={40} width={333}/>
    <GeneralInput name={"City"} value={newpass} onChangeValue={setNewPass}width={333} />
    <GeneralInput name={"Address type"} value={confirm} onChangeValue={setConfirm} width={333} />
   
    <GeneralButton message="Continue" backgroundColor={"#B0B0B0"}
          color="black" width={330} height={42} borderColor={"#B0B0B0"} size={15} top={10}
           marginLeft={140} marginTop={25} marginHorizintal={45}/>
    <View style={{marginTop:80}}/>
           </ScrollView>
   </View>
  )
}

export default AddAddress