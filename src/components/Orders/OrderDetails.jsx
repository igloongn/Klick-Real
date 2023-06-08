import React, { useState } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, } from "react-native"
import GeneralButton from '../General/GeneralButton';
import { AntDesign } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

const OrderDetails = ({ navigation }) => {
    const [tracker, setTracker] = useState(false)
    const [cancel, setCancel] = useState(false)
    return (
        <View>
            <View style={{ height: 50, width: 400, backgroundColor: "#E0E0E0" }}>
                <Text style={{ marginTop: 15, marginHorizontal: 20 }}>ORDER ID:21234974363334</Text>
                <Octicons style={{ marginLeft: 300, marginTop: -20 }} name="copy" size={24} color="black" />
                <Text style={{ marginLeft: 330, marginTop: -22 }}>copy</Text>
            </View>
            <ScrollView>
                <View style={styles.row2}>
                    <Image style={styles.stretch} source={require('../../../assets/Ellipse.png')}></Image>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.central}>The Cuddle Club</Text>
                        <Text style={styles.location}>ikoyi, Lagos</Text>
                    </View>
                    {/* <GeneralButton style={styles.shift} message="Contact" backgroundColor={"#iFEDD00"}
          color="black" width={89} height={42} borderColor={"#FEDD00"} size={15} top={10}
           marginLeft={20} marginTop={0} marginHorizintal={65}/> */}
                    <TouchableOpacity onPress={() => navigation.navigate("orderdetails")}>
                        <Text style={{ color: "#0485E8", marginLeft: 115, fontWeight: "500", fontSize: 15, marginTop: 5 }}>Contact</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 12, fontWeight: "400", color: "#98999A", marginHorizontal: 10, marginTop: 30 }}>Delivery to:</Text>
                <Text style={{ fontSize: 16, fontWeight: "500", color: "#0B0B0E", marginHorizontal: 10, marginTop: 10 }}>Michael Steven</Text>
                <Text style={{ fontSize: 12, fontWeight: "400", color: "#98999A", marginHorizontal: 10, marginTop: 10 }}>2, Block B, XYZ Building, Ikoyi, Lagos</Text>
                <View style={{ width: 63, height: 27, borderRadius: 6, backgroundColor: "#D0D0D0", marginHorizontal: 330, marginTop: -20 }}>
                    <Text style={{ marginTop: 3, marginLeft: 5 }}>Ongoing</Text></View>

                <View style={{ width: 400, height: 2, backgroundColor: "#E5E5E5", marginTop: 20 }} />
                <Text style={{ color: "#6A6B6C", fontWeight: "500", fontSize: 15, marginTop: 10, marginHorizontal: 10 }}>Product</Text>



                <Image style={styles.orderpic} source={require('../../../assets/orderpic.png')}></Image>
                <Text style={{ marginHorizontal: 125, marginTop: -95, fontWeight: "500", fontSize: 17 }}>HD SLR Camera</Text>
                <Text style={{ color: "#0485E8", marginHorizontal: 125, fontWeight: "500", fontSize: 15, marginTop: 5 }}>N20,000</Text>
                <Text style={{ marginHorizontal: 125, fontWeight: "500", fontSize: 15, marginTop: 5 }}>QTY:2</Text>

                <View style={{ width: 400, height: 2, backgroundColor: "#E5E5E5", marginTop: 20 }} />


                <Text style={{ color: "#6A6B6C", fontWeight: "500", fontSize: 15, marginTop: 10, marginHorizontal: 10 }}>Shipping Method</Text>
                <View style={{ height: 40, width: 40, backgroundColor: "#FEDD00", borderRadius: 50, marginTop: 15, marginHorizontal: 10 }}></View>
                <Text style={{ color: "#0B0B0E", fontWeight: "500", fontSize: 15, marginTop: -34, marginHorizontal: 60 }}>Ship with K-Secure</Text>


                <View style={{ width: 400, height: 2, backgroundColor: "#E5E5E5", marginTop: 20 }} />

                <View style={styles.row2}>
                    <Text style={{ color: "#6A6B6C", fontWeight: "500", fontSize: 15, marginTop: 10, marginHorizontal: 10 }}>Subtotal</Text>
                    <Text style={{ color: "#0B0B0E", fontWeight: "500", fontSize: 15, marginTop: 10, marginLeft: 250 }}>N206,000</Text>
                </View>
                <View style={styles.row2}>
                    <Text style={{ color: "#6A6B6C", fontWeight: "500", fontSize: 15, marginTop: 10, marginHorizontal: 10 }}>Discount</Text>
                    <Text style={{ color: "#0485E8", fontWeight: "500", fontSize: 15, marginTop: 10, marginLeft: 260 }}>-N5,000</Text>
                </View>
                <View style={styles.row2}>
                    <Text style={{ color: "#6A6B6C", fontWeight: "500", fontSize: 15, marginTop: 10, marginHorizontal: 10 }}>Shipping fee</Text>
                    <Text style={{ color: "#0B0B0E", fontWeight: "500", fontSize: 15, marginTop: 10, marginLeft: 245 }}>N1,500</Text>
                </View>
                <View style={styles.row2}>
                    <Text style={{ color: "#6A6B6C", fontWeight: "500", fontSize: 15, marginTop: 10, marginHorizontal: 10 }}>Total</Text>
                    <Text style={{ color: "#0B0B0E", fontWeight: "500", fontSize: 15, marginTop: 10, marginLeft: 260 }}>N204,300.00</Text>
                </View>

                <View style={styles.row4}>
                    <TouchableOpacity onPress={() => setCancel(!cancel)}>
                        <GeneralButton style={styles.shift} message="Cancel Order" backgroundColor={"#iFEDD00"}
                            color="black" width={159.5} height={42} borderColor={"#FEDD00"} size={15} top={10}
                            marginLeft={35} marginTop={0} marginHorizintal={10} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setTracker(!tracker)}>
                        <GeneralButton style={styles.shift} message="Track Order" backgroundColor={"#FEDD00"}
                            color="black" width={159.5} height={42} borderColor={"#FEDD00"} size={15} top={10}
                            marginLeft={40} marginTop={0} marginHorizintal={20} />
                    </TouchableOpacity>



                </View>
                <View style={{ marginTop: 100 }}></View>
            </ScrollView>


            <View style={{ height: 400, marginTop: tracker ? -360 : 0, width: 415, backgroundColor: "white", borderRadius: 35, position: "relative" }}>


                <TouchableOpacity onPress={() => setTracker(!tracker)}>
                    <View style={{ height: 6, width: 45, backgroundColor: "#E1E1E1", borderRadius: 5, position: "absolute", marginHorizontal: 170, marginTop: 15 }} />
                </TouchableOpacity>


                <Text style={{ marginHorizontal: 20, fontSize: 15, fontWeight: "600", marginTop: 40 }}>Track Order</Text>

                <View style={styles.row4}>
                    <View>
                        <Text style={{ fontWeight: "600", marginHorizontal: 20, }}>Order Confirmed</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 20, }}>Your order has been confirmed</Text>
                    </View>

                    <View>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 100, }}>15/02/23</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 100, }}>04:32PM</Text>
                    </View>
                </View>


                <View style={styles.row4}>
                    <View>
                        <Text style={{ fontWeight: "600", marginHorizontal: 20, }}>Order Shipped</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 20, }}>Your order has been shipped</Text>
                    </View>

                    <View>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 117, }}>15/02/23</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 117, }}>04:32PM</Text>
                    </View>
                </View>


                <View style={styles.row4}>
                    <View>
                        <Text style={{ fontWeight: "600", marginHorizontal: 20, }}>Out for Delivery</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 20, }}>Order will get delivered to you soon</Text>
                    </View>

                    <View>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 110, }}>--</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 100, }}></Text>
                    </View>
                </View>


                <View style={styles.row4}>
                    <View>
                        <Text style={{ fontWeight: "600", marginHorizontal: 20, }}>Order Delivered</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 20, }}>Product will get delivered to you soon</Text>
                    </View>

                    <View>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 100, }}>--</Text>
                        <Text style={{ color: "#6A6B6C", marginHorizontal: 100, }}></Text>
                    </View>
                </View>
            </View>

            <View style={{ height: 320, marginTop: cancel ? 150 : 800, width: 335, backgroundColor: "white", borderRadius: 35, position: "absolute", marginLeft: 42 }}>
                <Text style={{ marginLeft: 110, fontSize: 18, fontWeight: "600", marginTop: 110 }}>Cancel Order</Text>
                <Text style={{ color: "#6A6B6C", marginHorizontal: 30, }}>Are you sure you want to cancel your order?</Text>

                <View style={styles.row4}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <GeneralButton style={styles.shift} message="Go Back" backgroundColor={"#iFEDD00"}
                            color="black" width={139.5} height={54} borderColor={"#FEDD00"} size={15} top={15}
                            marginLeft={35} marginTop={0} marginHorizintal={20} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setCancel(!cancel)}>
                        <GeneralButton style={styles.shift} message="Yes,Cancel" backgroundColor={"#FEDD00"}
                            color="black" width={139.5} height={54} borderColor={"#FEDD00"} size={15} top={15}
                            marginLeft={30} marginTop={0} marginHorizintal={-10} />
                    </TouchableOpacity>



                </View>
            </View>







        </View>
    )
}


const styles = StyleSheet.create({

    row2: {
        display: "flex",
        flexDirection: "row",
        marginTop: 20,
        // marginLeft:-90,
    },


    stretch: {
        width: 50,
        height: 50,
        marginHorizontal: 10,

        borderRadius: 50,
    },
    location: {
        fontSize: 12,
        fontWeight: "400",
        color: "#98999A",
        marginHorizontal: 5,

    },
    central: {
        fontSize: 16,
        fontWeight: "500",
        color: "#0B0B0E",
        marginHorizontal: 5,
    },
    shift: {
        marginLeft: 120,
        marginTop: 0
    },
    orderpic: {
        width: 102,
        height: 102,
        marginHorizontal: 10,
        marginTop: 15,
        borderRadius: 10,
    },
    row4: {
        display: "flex",
        flexDirection: "row",
        marginTop: 25,
        marginLeft: 0,
    },



});


export default OrderDetails