import React from 'react'
import {View ,Dimensions, StyleSheet, Image , Text} from 'react-native'

function GeneralButton({navigation, onPress, message, backgroundColor, color, marginLeft,borderColor,height,width,marginHorizintal,size,top,marginTop}) {
  return (
    <View style={{...styles.button, backgroundColor: backgroundColor, borderColor:borderColor,height:height, width:width,marginHorizontal:marginHorizintal,marginTop:marginTop }}>
    <Text style={{...styles.buttontext, color: color, marginLeft: marginLeft, fontSize:size,marginTop:top}}>{message}</Text>
</View>
  )
}

const styles = StyleSheet.create({
    button:{
        height: 63,
        width: 329,
        backgroundColor: '#273B4A',
        borderRadius: 80,
        marginTop: 25,
        borderColor: '#808080',
        borderWidth: 1,
        
    },
    buttontext:{
        fontWeight: '400',
        fontSize: 20,
        color: '#FFFFFF',
        marginTop: 18,
        marginLeft: 130
    },
})


export default GeneralButton