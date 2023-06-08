import React from 'react'
import {Text,View, StyleSheet, Image, TextInput,FlatList,ScrollView, TouchableOpacity} from "react-native"
import { Ionicons } from '@expo/vector-icons'; 
import CategoriesCard from '../Home/CategoriesCard';
import SpecialCard from '../Home/SpecialCard';
import SponsorCard from '../Home/SponsorCard';
import ScrollCard from '../Home/ScrollCard';
import SpecialOffer from '../Home/SpecialOffer';
import SocialCard from './SocialCard';


const DATA4 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
]

const DATA3 = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Fourth Item',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Fifth Item',
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Fourth Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Fifth Item',
        },
       
     
  ];

const DATA2 = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Fourth Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Fifth Item',
        },
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
          },
          {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
          },
          {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
          },
          {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'Fourth Item',
            },
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'Fifth Item',
            },
           
  ];

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
      {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Fourth Item',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Fifth Item',
        },
  ];
  
  const Item = ({title, navigation,onPress}) => (
    <TouchableOpacity onPress={()=>navigation.navigate("stories")} style={styles.item}>
         <Image style={{marginTop:-21,marginLeft:-21}} source={require('../../../assets/picasso.png')}/>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );

  const Item2 = ({title}) => (
    <View style={styles.item2}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );


const KSocialContent = ({navigation}) => {
    const [search, onChangeSearch] = React.useState('');
   
  return (
    <View >
       
        <ScrollView style={styles.scrollView}>

      

     
      <FlatList
       style={{marginTop: 20}}
        data={DATA}
        renderItem={({item}) => <Item navigation={navigation} title={item.title} />}
        keyExtractor={item => item.id}
        horizontal
      />

      <FlatList
       style={{marginTop: 20}}
        data={DATA2}
        renderItem={({item}) =>  <SocialCard navigation={navigation}  name={"Zen Yoga Studio"} location={"Yaba,Lagos"} />}
        keyExtractor={item => item.id}
       
      />
      
      {/* <Text style={{fontWeight:"500", fontSize:16, marginTop:20, marginHorizontal:15}}>Recommended For You</Text>

      <FlatList
       style={{marginTop: 20}}
        data={DATA}
        renderItem={({item}) => <Item2 title={"women"} />}
        keyExtractor={item => item.id}
        horizontal
      />
      

   <FlatList
       style={{marginTop: 20}}
        data={DATA3}
        renderItem={({item}) =>  <ScrollCard  navigation={navigation}  name={"Bib and Bowl Set"} location={"Ikoyi,Lagos"} rate={"4.8(1.2k)"} price={"N12000"}/>}
        keyExtractor={item => item.id}
      
      /> */}

     
      
    
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    row:{
        display: "flex",
        flexDirection:"row"
    },
    stretch: {
        width: 50,
        height: 50,
       
        borderRadius:50,
      },
      location:{
        fontSize:12,
        fontWeight:"400",
        color:"#98999A",
        marginHorizontal:10,
       
      },
      central:{
        fontSize:16,
        fontWeight:"500",
        color:"#0B0B0E",
        marginHorizontal:10,
       
      },
      bellcover:{
        width: 50,
        height: 50,
        backgroundColor:"#E6E6FA",
        borderRadius:50,
        marginHorizontal:110,
      },
      bell: {
        marginHorizontal:17,
        marginTop:15,  
      },
      input: {
        height: 40,
        margin: 12,
        marginTop: 40,
        borderWidth: 1,
        padding: 10,
        borderColor:"#98999A",
        borderRadius:8
      },
      item: {
       // backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width:46,
        height: 46,
        borderRadius:100,
        borderWidth: 1,
        borderColor:"#007FFF",
      },
      item2: {
        backgroundColor: '#E6E6FA',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width:104,
        height: 46,
        borderRadius:100,
        borderWidth: 1,
        borderColor:"#007FFF",
      },
      title: {
        fontSize: 32,
        color:"#000",

      },
      mumcover:{
        width: 50,
        height: 50,
        backgroundColor:"#E6E6FA",
        borderRadius:50,
        marginHorizontal:20,
        marginTop:20,
      },
      mum: {
        marginHorizontal:10,
        marginTop:10,  
      },
      specialcard:{
        height:184,
        width:335,
        borderRadius:16,
        backgroundColor:"#6C5FBC",
        marginTop:20
      },
      specialbigtext:{
        fontSize:24,
        fontWeight:"500",
        color:"#FFF",
        marginHorizontal:20,
        marginTop:20,
      },
      specialsmalltext:{
        fontSize:14,
        fontWeight:"400",
        color:"#FFF",
        marginHorizontal:20,
        marginTop:5,
      },
      specialinner:{
        height:42,
        width:118,
        borderRadius:80,
        backgroundColor:"#FFF",
        marginTop:-20,
        marginHorizontal:20
      },
      specialimage:{
       marginHorizontal:180,
       marginTop:-73,  
        
      },
     
     
  });

export default KSocialContent