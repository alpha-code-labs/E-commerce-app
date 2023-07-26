import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, SafeAreaView} from 'react-native';
import { Entypo ,MaterialCommunityIcons} from '@expo/vector-icons';
const Btn = ({btnText,onPress,icon ,color}) => {
  return (
    
    <View>
         <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={onPress}
        >
            <MaterialCommunityIcons name={icon} size={28} color={color ? color : 'white'}/>
          <Text
            style={styles.text}
           
          >
            {btnText}
          </Text>
        </TouchableOpacity>
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
    text:{
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
      paddingLeft:6

    },
    touchableOpacity:{
      width: 80,
      borderRadius: 4,
      backgroundColor: '#14274e',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 40,
      marginRight:4
    },
    container2:{
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    }
  })

export default Btn
