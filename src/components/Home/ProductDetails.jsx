import React,{useState,useEffect} from 'react'
import {Text,View, StyleSheet, Image,TouchableOpacity,FlatList,ScrollView,Button, Pressable } from "react-native"
import { SimpleLineIcons } from '@expo/vector-icons'; 
import GeneralButton from '../General/GeneralButton';
import SponsorCard from './SponsorCard';
import PopularCard from './PopularCard';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


import { useRoute,useNavigation } from '@react-navigation/native';




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
]


const ProductDetails = ({navigation,route}) => {
    const [toggle, setToggle] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState([])
    const [count, setCount] = useState(1)
    const { id } = route.params;
    // const {id} = useParams();


    useEffect(() => {
        axios.get("https://klick-api.onrender.com/product/" + id  )
        .then(res => {
          setData(res?.data.data)
          console.log(res?.data)
          setIsLoading(true)
        }
          )
        .catch(err => console.log(err))
    },[])




      
// const TopUp = () => {
//   const [amount, setAmount] = useState('');
//   const [reference, setReference] = useState('')
//   const [description, setDescription] = useState('')
//   const [isLoading, setIsLoading] = useState(false)
//   const [change, setChange] = useState('');



  // const buynow = async () => {
  //   setIsLoading(true)
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     console.log('tok', token)

  //     const submitdata = {

  //       amount: parseInt(amount),
  //       reference,
  //       description



  //     }
  //     console.log(submitdata)
  //     // const url = `https://klick-api.onrender.com/product/?category=${selectCatId}`
  //     const response = await fetch('https://klick-api.onrender.com/wallet', {
  //       method: "POST",
  //       mode: 'no-cors',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(submitdata)
  //     })

  //     let res_status = await response?.statusText
  //     res_status = parseInt(res_status)
  //     if (response?.status >= 200 && response?.status < 203) {
  //       // const _data = await response?.json();
  //       // console.log('y', _data)

  //       //   navigation.navigate('wallet')
  //       Alert.alert('Success', 'Top up added successfully');
  //     } else {
  //       // throw Error(`${response?.statusText}`)
  //       Alert.alert('Error', `Top up added unsuccessfully ${response?.status}`);
  //     }



  //   } catch (error) {
  //     // Handle network or other errors
  //     console.error(error);
  //     Alert.alert('Error', 'An error occured ');
  //   } finally {
  //     setIsLoading(false)
  //   }

  // };


    const increment = () => {
        setCount(count + 1);
      };
    
      const decrement = () => {
        setCount(count - 1);
      };
    // const route = useRoute();
//     const { id } = route.params;
//   console.log(route)
    // const navigate = useNavigation()
    // const {id} = useParams();
//     useEffect(() => {
//       axios.get("https://fakestoreapi.com/products/" + id  )
//       .then(res => {
//         setData(res.data)
//         console.log(res.data)
//       }
//         )
//       .catch(err => console.log(err))
//   },[])
  return (
    <View style={styles.container}>
      <ScrollView>
        {isLoading && <Image style={{height:200,width:357,marginLeft:20,marginTop:5}} source={{uri:data?.images[0]}}></Image> }



        <Text style={{color:"#0B0B0E",fontSize:20,fontWeight:"500",marginLeft:20,marginTop:30}}>{data?.title}</Text>
        <Text style={{color:"#0B0B0E",fontSize:12,fontWeight:"400",marginLeft:20,marginTop:5}}>{data?.rating}(1.2K reviews)</Text>
        <Text style={{color:"#0485E8",fontSize:16,fontWeight:"500",marginLeft:20,marginTop:5}}>{data?.price}</Text>
        <Text style={{color:"#0B0B0E",fontSize:12,fontWeight:"400",marginLeft:20,marginTop:5}}>Quantity</Text>
        <View style={{backgroundColor:"#F7F7F7",width:118,height:48, borderRadius:30,marginLeft:20,marginTop:10 }}>
           <View style={{display:"flex",flexDirection:"row"}}>
            <Pressable onPress={decrement}><Text style={{fontSize:24, fontWeight:"500",marginLeft:20,marginTop:10}}>-</Text></Pressable>
            <Text style={{marginLeft:20,marginTop:15}}>{count}</Text>
             <Pressable onPress={increment}><Text style={{fontSize:24, fontWeight:"500",fontSize:24, fontWeight:"500", marginLeft:20,marginTop:10}}>+</Text></Pressable>
             </View>
        </View>

        <View style={{backgroundColor:"#F7F7F7",width:375,height:76,marginLeft:0,marginTop:10 }}>
        <Text style={{color:"#0B0B0E",fontSize:14,fontWeight:"500",marginLeft:20,marginTop:20}}>K-Secured Return Option</Text>
        <Text style={{color:"#0B0B0E",fontSize:12,fontWeight:"400",marginLeft:20,marginTop:0}}>Free return within 3 days. Money back guarantee</Text>
        </View>

        <Text style={{color:"#0B0B0E",fontSize:16,fontWeight:"500",marginLeft:20,marginTop:20}}>Description</Text>
        <Text style={{color:"#0B0B0E",fontSize:12,fontWeight:"400",marginLeft:20,marginTop:0}}>{data?.description}</Text>

        <TouchableOpacity onPress={()=>navigation.navigate('rates')}>
        <Text style={{color:"#0B0B0E",fontSize:14,fontWeight:"500",marginLeft:20,marginTop:20}}>Ratings & Reviews</Text>
        <Text style={{color:"#0B0B0E",fontSize:12,fontWeight:"400",marginLeft:20,marginTop:0}}>4.8(1.2K reviews)</Text>
        <View style={{display:"flex", flexDirection:"row",marginTop:10,marginLeft:20}}>
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="yellow" />
        <AntDesign name="star" size={20} color="gray" />
        <AntDesign name="star" size={20} color="gray" />
        </View>
        </TouchableOpacity>

        <Text style={{color:"#0B0B0E",fontSize:14,fontWeight:"500",marginLeft:20,marginTop:20}}>It's Lovely</Text>
        <Text style={{color:"#0B0B0E",fontSize:12,fontWeight:"400",marginLeft:20,marginTop:0}}>However rare side effects observed among children{"\n"}can be metabolic acidosis, coma, respiratory{"\n"}depression, and hypoglycemia</Text>




 

  

           {/* <Text style={{fontSize:17,fontWeight:"600",marginHorizontal:10,marginTop:10}}>Popular</Text>

           <FlatList
       style={{marginTop: 20}}
        data={DATA2}
        renderItem={({item}) =>  <PopularCard name={"Play Mat"} location={"N20,000"} rate={"4.8(1.2k)"}/>}
        keyExtractor={item => item.id}
        horizontal
      /> */}

    <Text style={{fontSize:17,fontWeight:"600",marginHorizontal:10,marginTop:20,marginLeft:20}}>Similar Products</Text>

      <View style={{marginBottom:30}}>
    <Image  style={styles.orderpic} source={require('../../../assets/orderpic.png')}></Image>
    <Text style={{ marginHorizontal:130,marginTop:-95,fontWeight:"500", fontSize:17 }}>HD SLR Camera</Text>
    <Text style={{color:"#0485E8", marginHorizontal:130,fontWeight:"500",fontSize:15,marginTop:5}}>N20,000</Text>
    <Text style={{marginHorizontal:130,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text>
    </View>

    
    <View style={{marginBottom:30}}>
    <Image  style={styles.orderpic} source={require('../../../assets/orderpic.png')}></Image>
    <Text style={{ marginHorizontal:130,marginTop:-95,fontWeight:"500", fontSize:17 }}>HD SLR Camera</Text>
    <Text style={{color:"#0485E8", marginHorizontal:130,fontWeight:"500",fontSize:15,marginTop:5}}>N20,000</Text>
    <Text style={{marginHorizontal:130,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text>
    </View>

    <View style={{marginBottom:30}}>
    <Image  style={styles.orderpic} source={require('../../../assets/orderpic.png')}></Image>
    <Text style={{ marginHorizontal:130,marginTop:-95,fontWeight:"500", fontSize:17 }}>HD SLR Camera</Text>
    <Text style={{color:"#0485E8", marginHorizontal:130,fontWeight:"500",fontSize:15,marginTop:5}}>N20,000</Text>
    <Text style={{marginHorizontal:130,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text>
    </View>

   



      <View style={{marginTop:70}} />
   
</ScrollView>

<View style={{position:"absolute",display:"flex",flexDirection:"row", bottom:5}}>
<GeneralButton style={styles.shift} message="Buy Later" backgroundColor={"#FFF"}
          color="black" width={159.5} height={54} borderColor={"#FEDD00"} size={15} top={10}
           marginLeft={45} marginTop={80} marginHorizintal={25}/>
           <Pressable onPress={()=> buynow()}>
           <GeneralButton style={styles.shift} message="Buy Now" backgroundColor={"#FEDD00"}
          color="black" width={159.5} height={54} borderColor={"#FEDD00"} size={15} top={10}
           marginLeft={45} marginTop={80} marginHorizintal={0}/>
           </Pressable>
        </View>



    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:"#FFF",
        flex:1,
    },
    row:{
        display: "flex",
        flexDirection:"row",
        marginTop:20
    },
    row2:{
        display: "flex",
        flexDirection:"row",
        marginTop:30
    },
    stretch: {
        width: 50,
        height: 50,
        marginHorizontal:10,
       
        borderRadius:50,
      },
      location:{
        fontSize:12,
        fontWeight:"400",
        color:"#98999A",
        marginHorizontal:5,
       
      },
      central:{
        fontSize:16,
        fontWeight:"500",
        color:"#0B0B0E",
        marginHorizontal:5, 
      },
      shift:{
        marginLeft:120,
        marginTop:0
      },
      orderpic: {
        width: 102,
        height: 102,
        marginHorizontal:20,
        marginTop:15,
        borderRadius:10,
      },
})

export default ProductDetails