import React from 'react'
import {Text,View,StyleSheet,TouchableOpacity} from "react-native"


const Each = () => {
  return (
    <View style={{display: "flex", flexDirection: "row", marginTop: 30}}>
      <View style={{height:50,width:50,backgroundColor:"#eec0c8",borderRadius:40,marginLeft:20}}/>
      <View>
      <Text style={{ color: "#0B0B0E", fontSize: 20, fontWeight: "500", marginLeft:10}}>Refund Successful</Text>
      <Text numberOfLines={3} style={{ color: "#98999A", fontSize: 12, fontWeight: "400", marginLeft: 10 }}>N200,000 has successfully been refunded refunded{"\n"}to  K-Credit.. Please check your profile to withdraw or use your credits. </Text>
      </View>
    </View>
  )
}


const Notifications = () => {
  return (
    <View style={styles.container}>
   
    <Each />
    <Each />
    <Each />
    <Each />
    <Each />
    <Each />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
    //   alignItems: 'center',
      // justifyContent: 'center',
    },
  
  })


export default Notifications