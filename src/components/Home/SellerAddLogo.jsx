import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Pressable, Alert, Modal, Dimensions,Image,ActivityIndicator } from "react-native"
import GeneralInput from '../General/GeneralInput'
import GeneralButton from '../General/GeneralButton'
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useSellerOnboardingContext } from './SellerOnboarding';
import { ImagePicker } from 'expo-image-multiple-picker'

const SellerAddLogo = ({ navigation, prevStage, nextStage , loading }) => {
  const { setFile, file, submit } = useSellerOnboardingContext()
  const [showGallery, setShowGallery] = useState(false)

  return (
    <>
      <View style={{...styles.container }}>

        <TouchableOpacity onPress={() => setShowGallery(true)} style={{ height: 100, width: 100, borderRadius: 50,  marginTop: 90, marginLeft: 140, borderWidth: file  && file.length > 0 ? 0 : 1, borderColor: file  && file.length > 0 ? "none" : "black", borderStyle: "dashed", backgroundColor: "#E1E1E1", }}>
          
          {file  && file.length > 0 ? <Image style={{
            width: 100,
            height: 100, width: 100, borderRadius: 50,
          }} source={{uri: file[0]?.uri}}/>:<Ionicons name="person-add-outline" size={24} color="black" style={{ marginLeft: 35, marginTop: 35 }} />
          
          }
        </TouchableOpacity>

        <Text style={{ fontWeight: "500", fontSize: 24, color: "#0B0B0E", marginLeft: 100, marginTop: 50 }}>Add your Business Logo</Text>
        <Text style={{ fontWeight: "400", fontSize: 14, color: "#6A6B6C", marginLeft: 40 }}>This will represent your profile photo. It will help users on Makten to easily discover you and connect with you.</Text>


        {/* <GeneralInput placeholder={""} name="Business Logo" width={335} value={file} onChangeValue={text => setFile(text)} /> */}
        <TouchableOpacity onPress={() => submit()}>
          {
           !loading ? <GeneralButton backgroundColor={'#FEDD00'} message={'Continue'} width={335} height={54} borderColor={'#FEDD00'} marginLeft={130} top={15} marginHorizintal={40} marginTop={30} /> :<>
           <ActivityIndicator/>
           </>
          }
            </TouchableOpacity>
        <TouchableOpacity onPress={() => prevStage()}>
          <GeneralButton backgroundColor={'#FEDD00'} message={'Previous'} width={335} height={54} borderColor={'#FEDD00'} marginLeft={130} top={15} marginHorizintal={40} marginTop={30} />
        </TouchableOpacity>


      </View>
      {showGallery && <View style={{backgroundColor: 'red',postion: 'absolute', marginTop: -50, height: Dimensions.get('screen').height, width: Dimensions.get('screen').width }}>
        <ImagePicker
          onSave={(assets) => { setFile(assets); console.log(assets); setShowGallery(false) }}
          onCancel={() => setShowGallery(false)}
          limit={1}
        />
      </View>}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    //   alignItems: 'center',
    // justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    width: 330,
    height: 330,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    // backgroundColor:"#FEDD00",
    width: 200,
    height: 54,
    marginTop: 30,
  },
  buttonOpen: {
    // backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: "#FEDD00",

  },
  textStyle: {
    color: "#0B0B0E",
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },


})

export default SellerAddLogo