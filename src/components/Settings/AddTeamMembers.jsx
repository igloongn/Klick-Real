import React,{useState} from 'react'
import GeneralButton from '../General/GeneralButton'
import {Text,View, StyleSheet, Image, TextInput, TouchableOpacity, Pressable} from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralInput from '../General/GeneralInput';
import { MaterialIcons } from '@expo/vector-icons'; 



const SettingsTiles = ({name,route,navigation}) => {
    const [toggle, setToggle] = useState(false)
    return (
    <View style={{marginTop:15}}>
       
        {/* <Image style={{height:20,width:20, marginLeft:20,marginTop:25}} source={require('../../../assets/mastercard.png')}/> */}
        <Text style={{marginLeft:40,marginTop:-16, color:"#000", fontWeight:"500", fontSize:16,marginTop:10}}>{name}</Text>
        {/* <AntDesign style={{marginLeft:320,marginTop:-15}} name="right" size={14} color="black" /> */}
        <TouchableOpacity onPress={()=>setToggle(!toggle)}>
        <MaterialIcons style={{marginLeft:320,marginTop:-25}} name= {toggle ? "toggle-on" : "toggle-off" } size={37} color={toggle ? "#0485E8" : "black"} />
        </TouchableOpacity>
        {/* {toggle ? ( <MaterialIcons style={{marginLeft:320,marginTop:-25}} name="toggle-off" size={37} color="#0485E8" />):
        ( <MaterialIcons style={{marginLeft:320,marginTop:-25}} name="toggle-on" size={37} color="#0485E8" />)} */}
   
   


        </View>
    )
}


function AddTeamMembers({navigation}) {
    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
  return (
    <View>
    <GeneralInput placeholder={'e.g Susan Adora'} name="Full Name" width={335} value={name} onChangeValue={text => setName(text)}/>
    <GeneralInput placeholder={'susaadora@gmail.com'} name="Email Address" width={335} value={email} onChangeValue={text => setEmail(text)}/>
    <Text style={{fontSize:16,marginLeft:40,marginTop:20}}>Access:</Text>
  
    <SettingsTiles name={"Product Management"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Order Management"} navigation={navigation} route={'profilesettings'} />
        <SettingsTiles name={"Store Analytics"} navigation={navigation} route={'profilesettings'} />
        
        <Pressable onPress={()=> navigation.navigate('addteam')}>
        <GeneralButton marginTop={40} width={335} height={54} borderColor={"#FEDD00"} marginHorizintal={40} backgroundColor={"#FEDD00"} message={"Add Member"} marginLeft={130} top={15}/>
   </Pressable>
    </View>
  )
}

export default AddTeamMembers