import React, { useState, useEffect, useMemo, } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, FlatList, useWindowDimensions, Button, Image, ActivityIndicator, Dimensions, Alert } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'
import { AntDesign } from '@expo/vector-icons';
import ProductHeader from './ProductHeader';
// import * as ImagePicker from 'expo-image-picker';
// import * as DocumentPicker from 'expo-document-picker';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'expo-image-loader';
import { ImagePicker } from 'expo-image-multiple-picker'
import { base_url } from '../../utils/api';
import axios from 'axios';





const AddNewProduct = ({ navigation }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const {width,height} = useWindowDimensions();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [total, setTotal] = useState("")
  const [instock, setInStock] = useState("")
  const [type, setType] = useState("")
  const [colors, setColors] = useState("")
  // const [shipCategoryId, setShipCategoryId] = useState("")
  const [weight, setWeight] = useState("")
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [shipCategory, setShipCategory] = useState("")
  const [Category, setCategory] = useState("")


  const [listofCat, setListofCat] = useState([])
  const [sheeplistofCat, setsheepListofCat] = useState([])

  const [showGallery, setShowGallery] = useState(false)


  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, [])



  useEffect(() => {
    fetch(`${base_url}category/getAll`)
      .then((res) => res.json())
      .then(data => {
        setListofCat(data?.data)
        // console.log(data?.data)
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    fetch(`${base_url}product/shipping/category`)
      .then((res) => res.json())
      .then(data => {
        setsheepListofCat(data?.data)
        // console.log(data?.data)
      })
      .catch(err => console.log(err))
  }, [])


  const data = useMemo(() => listofCat?.map((item) => { return { key: item?.id, value: item?.name } }), [listofCat])

  const dataSheepbubble = useMemo(() => sheeplistofCat?.map((item) => { return { key: item?.category_id, value: item?.category } }), [sheeplistofCat])


  const selectCatId = useMemo(() => {
    const output = listofCat?.filter((item) => item?.name === Category)
    return output[0] ? output[0]?.id : ''

  }, [Category, listofCat])

  const shipCategoryId = useMemo(() => {
    const output = sheeplistofCat?.filter((item) => item?.category === shipCategory)
    return output[0] ? output[0]?.category_id : ''

  }, [shipCategory, sheeplistofCat])

  // const pickImage = async () => {
  //   try {
  //     const result = await DocumentPicker.getDocumentAsync({
  //       type: 'image/*',
  //       copyToCacheDirectory: false,
  //     });

  //     if (result.type === 'success') {
  //       setImages(result.uri);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const pickImages = async () => {
  //   // no permission request is necessary for launching the library


  //   setIsLoading(true);
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     allowsMultipleSelection:true,
  //     selectionLimit:10,
  //     aspect:[4, 3],
  //     quality:1,
  //     base64:true,
  //   })
  //   setIsLoading(false);
  //   console.log(result);
  //   if(!result.canceled){
  //     // setImages(result.uri ? [result.uri] : result.selected)
  //     setImages(result.assets)
  //   }

  // }

  // if (hasGalleryPermission === false){
  //   return <Text>No access </Text>
  // }



  const submit = async () => {
    // let photo = { uri: source.uri}
    let formdata = new FormData();
    setIsLoading(true)

    formdata.append("name", name)
    formdata.append("description", description)
    formdata.append("price", price)
    formdata.append("quantity[total]", total)
    formdata.append("quantity[instock]", instock)
    formdata.append("specifications[type]", type)
    formdata.append("specifications[colors]", colors)
    formdata.append("specifications[shippingcategory_id]", shipCategoryId)
    formdata.append("specifications[weight]",weight)
    formdata.append("specifications[dimensions][length]", length)
    formdata.append("specifications[dimensions][height]", height)
    formdata.append("specifications[dimensions][width]", width)
    formdata.append("shippingcategory", shipCategory)
    images.forEach(element => {
      formdata.append("images", {
        uri: element.uri,
        name: element?.filename,
        type: 'image/jpg',
      })
    });
    // formdata.append.images

    console.log({
      name,
      description,
      price,
      total,
      instock,
      type,
      colors,
      shipCategoryId,
      weight,
      length,
      width,
      height,
      shipCategory,
      images,
      selectCatId,
    })

    console.log('formd-23r6',formdata)

    // return;

    try {
      const token = await AsyncStorage.getItem('token');
      console.log('tok-1', token)
      const url = `https://klick-api.onrender.com/product/?category=${selectCatId}`
      // const response = await fetch("https://klick-api.onrender.com/product/?category=039c6ea9-45d7-493f-beb1-fd74fb40399d", {
      const response = await fetch(url, {
        method: "POST",
        mode: 'no-cors',
        headers: {
          'Content-Type': 'multipart/form-data',
          // 'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: formdata
        
      })

     
     const res_state = await response?.status
     console.log('llls', res_state)
      
      if(parseInt(res_state) >= 200 && parseInt(res_state) < 203 ){
        // const _data = await response?.json();
        const _data = await response?.data;
      //   // console.log('y', _data)
      //   Alert.alert('Success', 'Product added');
      //   // navigation.navigate('vendordash')
      } else{
        throw new Error('');
      }

      Alert.alert('Success', 'Product added');
      
      

    } catch (error) {
      // Handle network or other errors
      console.error(error);
      Alert.alert('Error', 'An error occured ');
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductHeader name={"Product Information"} step={"Step 1 0f 4"} />


        {/* <Text style={{fontWeight:"400", fontSize:14, color:"#6A6B6C",}}>Create an account so you can start selling on Klick.</Text> */}
        <GeneralInput placeholder={'e.g Cuban chain'} name="Product Name *" width={335} value={name} onChangeValue={text => setName(text)} />
        <GeneralInput name="Product Description *" width={335} height={150} value={description} onChangeValue={text => setDescription(text)} />
        <GeneralInput placeholder={'e.g 2300'} name="Price *" width={335} value={price} onChangeValue={text => setPrice(text)} />
        <GeneralInput placeholder={'e.g 25'} name="Total Quantity *" width={335} value={total} onChangeValue={text => setTotal(text)} />
        <GeneralInput placeholder={'e.g 25'} name="Total Instock *" width={335} value={instock} onChangeValue={text => setInStock(text)} />
        <GeneralInput placeholder={'optional, e.g mens Shoes'} name="Specification Type *" width={335} value={type} onChangeValue={text => setType(text)} />
        <GeneralInput placeholder={'options, e.g red,purple'} name="Colors *" width={335} value={colors} onChangeValue={text => setColors(text)} />

        <GeneralInput placeholder={'in kg, e.g 2'} name="Weight *" width={335} value={weight} onChangeValue={text => setWeight(text)} />
        <GeneralInput placeholder={'in cm, e.g 35'} name="Length *" width={335} value={length} onChangeValue={text => setLength(text)} />
        <GeneralInput placeholder={'in cm, e.g 25'} name="Width *" width={335} value={width} onChangeValue={text => setWidth(text)} />
        <GeneralInput placeholder={'in cm, e.g 45'} name="Height *" width={335} value={height} onChangeValue={text => setHeight(text)} />
        <View style={{ marginTop: 20, width: 335, marginLeft: 43 }}>
          <SelectList
            placeholder={'Category e.g Hot Food'}
            setSelected={(val) => setCategory(val)}
            data={data}
            save="value"
          />
        </View>
        <View style={{ marginTop: 20, width: 335, marginLeft: 43 }}>
          <SelectList
            placeholder={'Shipping Catgory e.g Hot Food'}
            setSelected={(val) => setShipCategory(val)}
            data={dataSheepbubble}
            save="value"
          />
        </View>
        {/* <FlatList
data={images} 
renderItem={({item}) =>(
  <Image source={{uri:item.uri}} style={{width: width/2, height:height}} />
  
)}
numColumns={2}
keyExtractor={(item) => item.uri}
contentContainerStyle={{marginVertical:50, paddingBottom:100}}
ListHeaderComponent={
  isLoading ? (
    <View>
      <Text style={{fontSize:20, textAlign:"center"}}>Loading... </Text>
      <ActivityIndicator/>
    </View>
  ) : ( )
 
}
/> */}

        <View>
          <TouchableOpacity style={{ height: 100, marginTop: 15, width: 335, marginHorizontal: 40, borderWidth: 1, backgroundColor: "white", borderColor: "gray", borderStyle: "dashed" }} title="pick Images" onPress={() => setShowGallery(true)}><Text style={{ marginLeft: 120, marginTop: 40 }}>Select Images</Text></TouchableOpacity>
        </View>





        <TouchableOpacity onPress={() => submit()}>
          <GeneralButton backgroundColor={'#FEDD00'} message={isLoading ? 'loading ....':'Add Product'} width={335} height={54} borderColor={'#FEDD00'} marginLeft={150} top={15} marginHorizintal={40} marginTop={30} />
        </TouchableOpacity>

        <View style={{ marginTop: 70 }} />
      </ScrollView>
      {showGallery && <View style={{ postion: 'absolute', top: 0, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
        <ImagePicker
          onSave={(assets) => { setImages(assets); console.log(assets); setShowGallery(false) }}
          onCancel={() => setShowGallery(false)}
          limit={5}
        />
      </View>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    //   alignItems: 'center',
    justifyContent: 'center',
  },

})

export default AddNewProduct