import React,{useState,useEffect} from 'react'
import { Text, View, StyleSheet, Image, TextInput, FlatList, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native"
import axios from 'axios'

const SponsorCard = ({item, name,location,rate,image, navigation}) => {
    console.log(item?.id)
    return (
      <TouchableOpacity  style={{...styles.sponsoredcard}} onPress={()=> navigation.navigate({name:'productdetails',params:{id: item?.id}})}>
        <Image  style={styles.sponsoredimage} source={{uri:item?.images[0]}}/>
        <Text numberOfLines={1} style={styles.sponsorbigtext}>{item?.name}</Text>
        <View style={{flexDirection:"row",display:"flex"}}>
        <Text style={styles.sponsorsmalltext}>N{item?.price}</Text>
        <Text style={styles.sponsorsmalltext}>{item?.discount}</Text>
        </View>
       
       
          
        </TouchableOpacity>
    )
  }

const FakeCategories = ({navigation}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("https://klick-api.onrender.com/product/")
          .then(res => setData(res.data.data))
          .catch(err => console.log(res.err))
          .finally(item => setLoading(false))
      }, []);

  return (
   <View>
                {loading && <View>
          <ActivityIndicator />
          {/* <Text>Loading...</Text> */}
        </View>}
        {data && (<>

          <FlatList
            style={{ marginTop: 20 }}
            data={data?.rows}
            renderItem={({ item }) => <SponsorCard item={item} navigation={navigation} />}
            keyExtractor={item => item.id}
           
          />
        </>
        )}

   </View>
  )
}



const styles = StyleSheet.create({
    sponsoredcard:{
        height:239,
       // width:193,
       width:335,
        borderRadius:16,
        backgroundColor:"#FFF",
        marginTop:20,
        marginHorizontal: 22,
        alignItems:'center'
        
      },
      sponsoredimage:{
        marginHorizontal:20,
       // marginTop:-73,  
       height: 140, 
       width: 140,
       borderRadius:10,
       marginTop:20
         
       },
       sponsorbigtext:{
        fontSize:16,
        fontWeight:"500",
        color:"#000",
        marginHorizontal:20,
        marginTop:20,
      },
      sponsorsmalltext:{
        fontSize:12,
        fontWeight:"400",
        color:"#6A6B6C",
        marginHorizontal:20,
        marginTop:5,
      },
   
});

export default FakeCategories