import React,{useState} from 'react'
import GeneralButton from '../General/GeneralButton'
import {Text,View, StyleSheet, Image, TextInput, TouchableOpacity, Pressable,Modal} from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'; 
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


const TeamPage = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
        <View onPress={()=>navigation.navigate('')} style={{height:100,width:375}}>
    <Image style={{borderRadius:50,height:60,width:60, marginLeft:30,marginTop:20}} source={require('../../../assets/susan.png')}/>
    <Text style={{marginLeft:100,marginTop:-50, color:"#0B0B0E", fontWeight:"500",fontSize:16}}>Susan Adora</Text>
    <Text style={{marginLeft:100,marginTop:0, color:"#0B0B0E", fontWeight:"400",fontSize:12}}>susaadora@gmail.com</Text>
  
    </View>
    <Text style={{fontSize:16,marginLeft:40,marginTop:20}}>Access:</Text>
  
  <SettingsTiles name={"Product Management"} navigation={navigation} route={'profilesettings'} />
      <SettingsTiles name={"Order Management"} navigation={navigation} route={'profilesettings'} />
      <SettingsTiles name={"Store Analytics"} navigation={navigation} route={'profilesettings'} />


      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View >
       
          <View style={{width:270, height:270, backgroundColor:"white", borderRadius:15, marginTop:200,marginLeft:70}}>
          <SimpleLineIcons name="close" size={44} color="blue" style={{paddingTop:40,marginLeft:105}}/>
            <Text style={{fontSize:23, fontWeight:600,color:"#0B0B0E",marginLeft:65,marginTop:10}}>Remove Member</Text>
            <Text style={{fontSize:16, fontWeight:400,color:"#6A6B6C",marginLeft:25}}>Are you sure you want to remove Susan{'\n'}Adora from accessing your store?</Text>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}>
                <View style={{display:"flex", flexDirection:"row",marginTop:30}}>
             <GeneralButton height={50} width={100} borderColor={"#FEDD00"} backgroundColor={"#FFF"} message={"Cancel"} marginHorizintal={20}  marginLeft={30} top={15}/>
             <GeneralButton height={50} width={100} borderColor={"#FEDD00"} backgroundColor={"#FEDD00"} message={"Remove"} marginLeft={30} top={15} color={"#0B0B0E"}/>
             </View>
            </Pressable>
          </View>
        </View>
      </Modal>
      
      <Pressable onPress={()=>setModalVisible(true)}>
      <GeneralButton marginTop={40} width={335} height={54} borderColor={"#FEDD00"} marginHorizintal={40} backgroundColor={"#FFF"} message={"Remove"} marginLeft={140} top={15}/>
 </Pressable>

    </View>
    
  )
}

export default TeamPage