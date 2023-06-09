import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import GeneralButton from '../General/GeneralButton';



const DeliveryChange = ({name,address,navigation}) => {
    return (
        <View style={{ marginBottom: 0 }}>
        <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* <Image style={{ width: 102, height: 102, marginTop: 15, borderRadius: 10 }} source={require('../../../assets/orderpic.png')}></Image> */}
               
                <View>
                    <Text style={{ marginHorizontal: 0, marginTop: 0, fontWeight: "600", fontSize: 17, marginRight: 100 }}>{name}</Text>
                    <Text style={{ color: "#6A6B6C", marginHorizontal: 0, fontWeight: "500", fontSize: 15, marginTop: 5 }}>N{address}</Text>
                    {/* <Text style={{marginHorizontal:0,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text> */}
                    
                </View>
               

            </View>
        </View>
    </View>

    )
}




const Cart = ({ name, price,navigation }) => {
    return (
        <View style={{ marginBottom: 30 }}>
            <View style={{ paddingHorizontal: 30, paddingVertical: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Image style={{ width: 102, height: 102, marginTop: 15, borderRadius: 10 }} source={require('../../../assets/orderpic.png')}></Image>
                    <View>
                        <Text style={{ marginHorizontal: 0, marginTop: 0, fontWeight: "500", fontSize: 17, marginRight: 100 }}>{name}</Text>
                        <Text style={{ color: "#0485E8", marginHorizontal: 0, fontWeight: "500", fontSize: 15, marginTop: 5 }}>N{price}</Text>
                        {/* <Text style={{marginHorizontal:0,fontWeight:"500",fontSize:15,marginTop:5}}>QTY:2</Text> */}
                        
                    </View>
                    <FontAwesome name="trash" size={24} color="red" />

                </View>
            </View>
        </View>
    )
}


const CheckOut = ({navigation}) => {
    return (
        <View>
            <View style={{backgroundColor:'#E5E5E5',height:50}}>  
            <Text style={{color:'#6A6B6C',marginTop:20, marginLeft:30}}>Delivery to:</Text>
            </View>
          
            <DeliveryChange name={'Michael Steven'} address={'2,Block B, XYZ Building, Ikoyi, Lagos.'}/>
            <Cart name={'HD SLR Camera'} price={'20,000'} />
            <TouchableOpacity onPress={()=> navigation.navigate('shippingmethod')} style={{alignItems:'center'}}>
            <GeneralButton message={'Continue to Shipping'} marginLeft={110} top={15} backgroundColor={'#FEDD00'} borderColor={'#FEDD00'} height={45} width={335}/>
            </TouchableOpacity>
        </View>
    )
}

export default CheckOut