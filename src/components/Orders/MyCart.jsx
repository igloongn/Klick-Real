import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, Pressable } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import GeneralButton from '../General/GeneralButton';





const Counter = ({navigation}) => {
    const [counter, setCounter] = useState(0)

    const increment = () => {
        setCounter(counter + 1);
    };

    const decrement = () => {
        setCounter(counter - 1);
    };
    return (
        <View style={{ height: 38, width: 113, backgroundColor: '#E1E1E1', borderRadius: 20, marginTop: 10 }}>
            <View style={{ paddingHorizontal: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Pressable onPress={decrement}><Text style={{ fontSize: 30 }}>-</Text></Pressable>
                <Text style={{ fontSize: 20 }}>{counter}</Text>
                <Pressable onPress={increment}><Text style={{ fontSize: 30 }}>+</Text></Pressable>
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
                        <Counter />
                    </View>
                    <FontAwesome name="trash" size={24} color="red" />

                </View>
            </View>
        </View>
    )
}


const MyCart = ({navigation}) => {
    return (
        <View>
            <Cart name={'HD SLR Camera'} price={'20,000'} />
            <TouchableOpacity onPress={()=> navigation.navigate('checkout')} style={{alignItems:'center'}}>
            <GeneralButton message={'Checkout'} marginLeft={140} top={15} backgroundColor={'#FEDD00'} borderColor={'#FEDD00'} height={45} width={335}/>
            </TouchableOpacity>
        </View>
    )
}

export default MyCart