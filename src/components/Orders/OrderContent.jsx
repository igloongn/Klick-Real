// import React, { useState } from 'react'
// import {Text,View, StyleSheet, Image, TouchableOpacity, } from "react-native"
// import GeneralButton from '../General/GeneralButton';
// import { AntDesign } from '@expo/vector-icons'; 





// const OrderContent = ({navigation}) => {
// //  const [currentTab, setCurrentTab] = useState(1);
//   const [activeTab, setActiveTab] = useState(true);
//   const [completedTab, setCompletedTab] = useState(false);
//   const [cancelledTab, setCancelledTab] = useState(false);




//   const active = () =>  {
//       setActiveTab(true)
//       setCompletedTab(false)
//       setCancelledTab(false)
//   }
//   const completed = () =>  {
//     setActiveTab(false)
//     setCompletedTab(true)
//     setCancelledTab(false)
// }
// const cancelled = () =>  {
//   setActiveTab(false)
//   setCompletedTab(false)
//   setCancelledTab(true)
// }

//   return (
//     <View >
//       <View style={styles.row}>


//          <TouchableOpacity onPress={active}> 
//          <Text >Active</Text>
//       </TouchableOpacity>
//         <TouchableOpacity  onPress={completed}>
//            <Text>Completed</Text>
//            </TouchableOpacity>
//         <TouchableOpacity  onPress={cancelled}>
//            <Text>Cancelled</Text>
//            </TouchableOpacity>

//       </View>
//         <View style={styles.greyline}/>


//         {activeTab &&  <View style={styles.yellowline}/>}
//         {completedTab &&  <View style={styles.yellowline2}/>}
//         {cancelledTab &&  <View style={styles.yellowline3}/>}

//         <View style={styles.row2}>
//        <Image  style={styles.stretch} source={require('../../../assets/Ellipse.png')}></Image>
//        <View style={{marginTop:5}}>
//        <Text style={styles.central}>The Cuddle Club</Text>
//        <Text style={styles.location}>3 items . 30th April 2023</Text>
//        </View>
//        {/* <GeneralButton style={styles.shift} message="Contact" backgroundColor={"#iFEDD00"}
//           color="black" width={89} height={42} borderColor={"#FEDD00"} size={15} top={10}
//            marginLeft={20} marginTop={0} marginHorizintal={65}/> */}
//            <TouchableOpacity onPress={()=>navigation.navigate("orderdetails")}>
//            <AntDesign style={styles.shift} name="right" size={24} color="black" />
//            </TouchableOpacity>
//         </View> 
//     <View style={styles.row3}>
//            <Image  style={styles.boughtpic} source={require('../../../assets/boughtpic1.png')}></Image>
//            <Image  style={styles.boughtpic} source={require('../../../assets/boughtpic2.png')}></Image>
//            <Image  style={styles.boughtpic} source={require('../../../assets/boughtpic3.png')}></Image>
//            </View> 
//            <Text style={{color:"#0485E8", marginLeft:70, marginTop:13}}>N20,000</Text>
//            <View style={{width:63,height:27, borderRadius:6, backgroundColor:"#D0D0D0",marginHorizontal:140,marginTop:-20}}>
//             <Text  style={{marginTop:3, marginLeft:5}}>Ongoing</Text></View>


//             <View style={styles.row4}> 
//              <GeneralButton style={styles.shift} message="Cancel Order" backgroundColor={"#iFEDD00"}
//           color="black" width={159.5} height={42} borderColor={"#FEDD00"} size={15} top={10}
//            marginLeft={35} marginTop={0} marginHorizintal={10}/>
//             <GeneralButton style={styles.shift} message="Track Order" backgroundColor={"#FEDD00"}
//           color="black" width={159.5} height={42} borderColor={"#FEDD00"} size={15} top={10}
//            marginLeft={40} marginTop={0} marginHorizintal={20}/>
//          </View>

//     </View>
//   )
// }

//const styles = StyleSheet.create({

//   row2:{
//     display: "flex",
//     flexDirection:"row",
//     marginTop:20,
//    // marginLeft:-90,
// },
// row3:{
//   display: "flex",
//   flexDirection:"row",
//   marginTop:-25,
//   marginLeft:60,
// },
// row4:{
//   display: "flex",
//   flexDirection:"row",
//   marginTop:25,
//   marginLeft:0,
// },


// stretch: {
//     width: 50,
//     height: 50,
//     marginHorizontal:10,

//     borderRadius:50,
//   },
//   location:{
//     fontSize:12,
//     fontWeight:"400",
//     color:"#98999A",
//     marginHorizontal:5,

//   },
//   central:{
//     fontSize:16,
//     fontWeight:"500",
//     color:"#0B0B0E",
//     marginHorizontal:5, 
//   },
//   shift:{
//     marginLeft:100,
//     marginTop:0
//   },
//   boughtpic: {
//     width: 48,
//     height: 48,
//     marginHorizontal:10,
//     marginTop: 35,


//     borderRadius:4,
//   },

// });

// export default OrderContent

import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, } from "react-native"

const OrderContent = ({ navigation }) => {
    const [currentTab, setCurrentTab] = useState(1);
    const [activeTab, setActiveTab] = useState(true);
    const [completedTab, setCompletedTab] = useState(false);
    const [cancelledTab, setCancelledTab] = useState(false);




    const active = () => {
        setActiveTab(true)
        setCompletedTab(false)
        setCancelledTab(false)
    }
    const completed = () => {
        setActiveTab(false)
        setCompletedTab(true)
        setCancelledTab(false)
    }
    const cancelled = () => {
        setActiveTab(false)
        setCompletedTab(false)
        setCancelledTab(true)
    }
    return (
        <View style={styles.container}>

            <View style={styles.row}>


                <TouchableOpacity onPress={active}>
                    <Text >Active</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={completed}>
                    <Text>Completed</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cancelled}>
                    <Text>Cancelled</Text>
                </TouchableOpacity>

            </View>
            <View style={styles.greyline} />


            {activeTab && <View style={styles.yellowline} />}
            {completedTab && <View style={styles.yellowline2} />}
            {cancelledTab && <View style={styles.yellowline3} />}


            <Text style={{ textAlign: 'center', fontSize: 24, fontWeight: '500', paddingTop: 200 }}>No Orders Found</Text>
            <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: '200', color: '#6A6B6C' }}>You currently do not have any orders. Orders{'\n'} that you make will appear here</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        // flex: 1,
        //backgroundColor: '#FFF',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    row: {
        display: "flex",
        flexDirection: "row",
        marginTop: 150,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    yellowline: {
        backgroundColor: "#FEDD00",
        height: 5,
        width: 110,
        position: "relative",
        marginTop: -5,
        marginLeft: 0,

    },
    yellowline2: {
        backgroundColor: "#FEDD00",
        height: 5,
        width: 110,
        position: "relative",
        marginTop: -5,
        marginLeft: 120,

    },
    yellowline3: {
        backgroundColor: "#FEDD00",
        height: 5,
        width: 110,
        position: "relative",
        marginTop: -5,
        marginLeft: 240,
    },
    row: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "center"
    },
    greyline: {
        backgroundColor: "#E5E5E5",
        height: 5,
        width: 360,
        position: "relative",
        marginTop: 10,
        alignContent: "center"
    },
})

export default OrderContent