import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./src/components/tabs/Tab";
import { ActivityIndicator ,View,Text,StyleSheet} from "react-native";


// import Counter from "./src/demonstration/Counter";


const App=()=>{
 
  

  
    return( 
     <NavigationContainer>
      {/* <Counter/> */}
       <Tabs />
      </NavigationContainer>
    
    )

  
  

  // style={styles.container}
  return(
    <View style={styles.container} >
   
      
    </View>
  )
  
}

const styles=StyleSheet.create({
  container:{
    justifyContent:'center',
    flex: 1,
    backgroundColor: '#f5eeb8',
    alignItems:"center",},
    
})



export default App;
// import { StatusBar } from 'expo-status-bar';
// import { View } from 'react-native';
// import tw from 'twrnc';
// import CurrencyScreen from './src/components/CurrencyScreen';
// import CameraScreen from './src/components/CameraScreen';
// import Camera2 from './src/components/Camera2'

// export default function App() {
//   return (
//     <View style={tw`flex-1 `}>
//     {/* <CameraScreen/> */}
//     <Camera2/>
    
//     {/* <View style={tw`flex-1 justify-center items-center bg-purple-200`}>
//       {/* <CurrencyScreen /> */}
      
      
//       {/* </View>  */}
    
//     </View>
//   );
// }



