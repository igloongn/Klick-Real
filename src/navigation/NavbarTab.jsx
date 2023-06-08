import React from 'react'
import {View, ScrollView, Text ,StyleSheet ,TouchableOpacity, SafeAreaView, Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 



function NavbarTab({navigation, name, email, backgroundColor, message, imageuri, focused, id}) {
    let image = ''

    const imageHandler = () => {
        if (id == '1'){
            // return <Image source={require('../../assets/Vector-12.png')}></Image>
            return <AntDesign name="home" size={24} color="black" />
        }
        if (id == '2'){
            // return <Image source={require('../../assets/Vector-14.png')}></Image>
            return <Feather name="package" size={24} color="black" />
        }
        if (id == '3'){
            // return <Image source={require('../../assets/Vector-13.png')}></Image>
            return  <AntDesign name="message1" size={24} color="black" />
        }
        if (id == '4'){
            // return <Image source={require('../../assets/Vector-13.png')}></Image>
            return <FontAwesome name="group" size={24} color="black" />
        }
        if (id == '5'){
            // return <Image source={require('../../assets/Vector-13.png')}></Image>
            return <Ionicons name="settings-outline" size={24} color="black" />
        }
    }

  return (
    <View>
        {!focused?
        <View>
            {imageHandler()}
        </View>
      :
         <View style={styles.card}>
        
        <View style={styles.grid}>
        <AntDesign name="home" size={24} color="yellow"  style={{marginLeft:20, marginTop:-10}}/>
         {/* <Image style={{marginLeft:-9, marginTop:6,}} source={imageuri}></Image> */}
         {/* <Text style={styles.text}>{message}</Text> */}
         </View>
           
 
 
            </View>
        }
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        height: 50,
        width: 120,
        backgroundColor: '#FFF',
        borderRadius: 50,
        marginTop: 25,
        paddingLeft: 25,
        paddingVertical: 10,
        marginLeft: 3,
    },
    text:{
        color: '#3FE0D0',
        fontWeight:'700',
        fontSize: 16,
        marginTop: 6
       
    },
    
      grid:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 80
       
      },
})

export default NavbarTab