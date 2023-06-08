import React, { useState } from 'react'
import {Text,View,TouchableOpacity,Image} from 'react-native'
import GeneralInput from '../General/GeneralInput'
import { Ionicons } from '@expo/vector-icons';
import GeneralButton from '../General/GeneralButton';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

const EditTiles = ({name,route,navigation}) => {
  return (
      <TouchableOpacity onPress={()=>navigation.navigate(route)} >
      <SimpleLineIcons  style={{marginTop:25, marginLeft:5}}  name="wallet" size={14} color="black" />
      <Text style={{marginLeft:27,marginTop:-16, color:"#000", fontWeight:"400",fontSize:14}}>{name}</Text>
      </TouchableOpacity>
  )
}

const ProfileSettings = ({navigation}) => {
  const [edit,setEdit] = useState(false);
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  return (
    <View>
        <View style={{width:132, height:132, backgroundColor:"#E6E6FA",borderRadius:60,marginLeft:130,marginTop:30}}>
        <Ionicons  style={{marginLeft:50,marginTop:50}} name="person" size={32} color="#9932CC" />
        </View>
        <TouchableOpacity  onPress={()=>setEdit(!edit)}>
        <MaterialCommunityIcons name="image-edit" size={24} color="black" style={{position:"absolute",marginLeft:230,marginTop:-25}}  />
        </TouchableOpacity>
        <GeneralInput  style={{marginLeft:60,marginTop:50}} name={"Full Name"} placeholder={"John Doe"} value={name} onChangeValue={setName} width={333}/>
            <GeneralInput  style={{marginLeft:20,}} name={"Email"}  placeholder={"John@gmail.com"} value={email} onChangeValue={setEmail} width={333}/>
            <GeneralButton message="Save" backgroundColor={"#FEDD00"}
          color="black" width={330} height={42} borderColor={"#FEDD00"} size={15} top={10}
           marginLeft={150} marginTop={25} marginHorizintal={45}/>
           <View style={{height:700,backgroundColor:"#FFF",borderRadius:40,marginTop: edit ? -20:200}}>
          
            <View style={{marginTop:20,marginLeft:20}}>
           <EditTiles name={"Take another photo"}/>
           <EditTiles name={"choose gallery"}/>
           <EditTiles name={"Delete photo"}/>
           </View>
           </View>
          
    </View>
    
  )
}

export default ProfileSettings