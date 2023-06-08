import React,{useState,useEffect} from 'react'
import {Text,View, StyleSheet, Image,TouchableOpacity,FlatList,ScrollView,Button, Pressable } from "react-native"
import { AntDesign } from '@expo/vector-icons'; 

function People(){
  return (
    <View>
    <View style={{display:"flex", flexDirection:"row",marginTop:40}}>
    <Image style={{borderRadius:50,height:40,width:40, marginLeft:0}} source={require('../../../assets/susan.png')}/>
    <Text style={{fontSize:18,marginLeft:20,marginTop:10}}>Susan Adeyemo</Text>
    </View>
    <View style={{display:"flex", flexDirection:"row",paddingTop:5,paddingLeft:5}}>
    <AntDesign name="star" size={20} color="yellow" />
    <AntDesign name="star" size={20} color="yellow" />
    <AntDesign name="star" size={20} color="yellow" />
    <AntDesign name="star" size={20} color="yellow" />
    <AntDesign name="star" size={20} color="gray" />
    <Text style={{fontSize:14,marginTop:10}}>12/12/42</Text>
    </View>
    <Text style={{fontSize:14,marginTop:10}}>Excellent items. Lorem ipsum dolor sit amet, consectetur adipiscing{'\n'}elit, sed do eiusmod tempor 😍😍</Text>

    </View>

  )
}


function RatesReviews() {
  return (
    <View style={styles.container}>
      <Text style={styles.left}>Reviews</Text>
      <Text style={{fontSize:50,fontWeight:"500",paddingLeft:30,paddingTop:30}}>4.8</Text>
      <View style={{display:"flex", flexDirection:"row",paddingTop:5,paddingLeft:5}}>
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="gray" />
        <AntDesign name="star" size={20} color="gray" />
        </View>
     
        <Text style={{color:"#0B0B0E",fontSize:12,fontWeight:"400",paddingLeft:22,paddingTop:10}}>4.8(1.2K reviews)</Text>
        <View style={{height:150, width:1,backgroundColor:"#E1E1E1",marginLeft:150,marginTop:-130}}/>

        <View style={styles.yellowline5}/>
        <View style={styles.grayline5}/>


        {/* <View style={styles.yellowline4}/> */}
        <View style={styles.grayline4}/>

        {/* <View style={styles.yellowline3}/> */}
        <View style={styles.grayline3}/>

        {/* <View style={styles.yellowline2}/> */}
        <View style={styles.grayline2}/>

        {/* <View style={styles.yellowline}/> */}
        <View style={styles.grayline}/>


        <People />
        <People />
        <People />
       
        {/* <View style={{display:"flex", flexDirection:"row",marginTop:50}}>
        <Image style={{borderRadius:50,height:40,width:40, marginLeft:0}} source={require('../../../assets/susan.png')}/>
        <Text style={{fontSize:18,marginLeft:20,marginTop:10}}>Susan Adeyemo</Text>
        </View>
        <View style={{display:"flex", flexDirection:"row",paddingTop:5,paddingLeft:5}}>
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="gray" />
        <Text style={{fontSize:14,marginTop:10}}>12/12/42</Text>
        </View>
        <Text style={{fontSize:14,marginTop:10}}>Excellent items. Lorem ipsum dolor sit amet, consectetur adipiscing{'\n'}elit, sed do eiusmod tempor 😍😍</Text> */}


      
        
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
      backgroundColor:"#FFF",
      flex:1,
      paddingLeft:30
    
  },
  left:{
      
      backgroundColor:"#FFF",
      marginTop:30,
      fontSize:17,
      fontWeight:'500'
  },
  grayline5:{
    backgroundColor:"#E1E1E1",
    height:5,
    width:170,
    //position:"absolute",
    marginTop:-120,
    marginLeft: 170,
    borderRadius:10
  
  },
  grayline4:{
    backgroundColor:"#E1E1E1",
    height:5,
    width:170,
    //position:"absolute",
    marginTop:20,
    marginLeft:170
  
  },
  grayline3:{
    backgroundColor:"#E1E1E1",
    height:5,
    width:170,
   // position:"absolute",
    marginTop:20,
    marginLeft:170,
  
  },
  grayline2:{
    backgroundColor:"#E1E1E1",
    height:5,
    width:170,
   // position:"absolute",
    marginTop:20,
    marginLeft:170,
  
  },
  grayline:{
    backgroundColor:"#E1E1E1",
    height:5,
    width:170,
    //position:"absolute",
    marginTop:20,
    marginLeft:170,
  
  },

 
  yellowline5:{
    backgroundColor:"#FEDD00",
    height:5,
    width:250,
    position:"absolute",
    marginTop:-30,
    marginLeft:150,
  
  },
  yellowline4:{
    backgroundColor:"#FEDD00",
    height:5,
    width:170,
    position:"absolute",
    marginTop:100,
    marginLeft: 200,
    borderRadius:10
  
  },
  yellowline3:{
    backgroundColor:"#FEDD00",
    height:5,
    width:170,
    position:"absolute",
    marginTop:130,
    marginLeft: 200,
    borderRadius:10
  
  },
  yellowline2:{
    backgroundColor:"#FEDD00",
    height:5,
    width:170,
    position:"absolute",
    marginTop:160,
    marginLeft: 200,
    borderRadius:10
  
  },
  yellowline:{
    backgroundColor:"#FEDD00",
    height:5,
    width:170,
    position:"absolute",
    marginTop:190,
    marginLeft: 200,
    borderRadius:10
  
  },
  

})

export default RatesReviews