import React from 'react'
import {View , Text , TextInput , StyleSheet,Image} from 'react-native'
import { AntDesign } from '@expo/vector-icons';


const GeneralInput = ({name, placeholder, value , onChangeValue, requestAmount, password,height,width,marginLeft,onPressOut}) => {
    // console.log(requestAmount)
  return (
    <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <TextInput  style={{...styles.input, height:height, width:width, marginLeft:marginLeft}}
            onChangeText={text => onChangeValue(text)}
            placeholder={placeholder}
            secureTextEntry={password} 
            value = {value}
            leftIcon={<AntDesign name="user" size={24} color="black" />}
            onPressOut={onPressOut}
        />
         
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 25,
        marginLeft: 42,
    },
    text: {
        fontSize: 13,
        marginBottom: 10,
        fontWeight: '500',
        fontSize: 16,
       
    },
    input: {
        height: 32,
        padding: 10,
        backgroundColor: "#F8F8F8",
        //borderColor: '#BABABA',
        borderRadius: 10,
        width: 333,
        borderWidth: 1,
        borderColor: '#C4C4C4'
    
        
       
    },
    desc:{
        height: 135,
    }
})

export default GeneralInput