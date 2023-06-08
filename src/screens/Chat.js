import React from 'react'
import {Text,View} from "react-native"


const Chat = () => {
  return (
    // <GiftedChat/>
    <View style={styles.container}>
        <Message />
    <Text>Henry is trying!</Text>
     </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

})

export default Chat