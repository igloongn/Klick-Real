import React,{useState} from 'react'
import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralInput from '../General/GeneralInput';
import GeneralButton from '../General/GeneralButton';

const  AddNewCard = ({navigation}) => {
    const [current,setCurrent] = useState("");
    const [newpass, setNewPass] = useState("");
    const [confirm,setConfirm] = useState("");
  return (
   <View style={{marginTop:30}}>
   
    <GeneralInput name={"Card Number"} value={current} 
    ChangeValue={setCurrent} width={333} />
    <View style={{display:"flex",flexDirection:"row"}}>
    <GeneralInput name={"Expiry Date"} value={newpass} onChangeValue={setNewPass} width={158} />
    <GeneralInput name={"CVV"} value={confirm} onChangeValue={setConfirm} width={158}  marginLeft={-23}/>
    </View>
    <GeneralInput name={"Card Holder's Name"} value={confirm} onChangeValue={setConfirm}  width={333}/>
   
    <GeneralButton message="Add Card" backgroundColor={"#E6E6FA"}
          color="black" width={330} height={42} borderColor={"#E6E6FA"} size={15} top={10}
           marginLeft={130} marginTop={25} marginHorizintal={45}/>
   </View>
  )
}

export default AddNewCard