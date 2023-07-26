import React from "react";

import CurrencyScreen from "../CurrencyScreen";
import Camera2 from '../Camera2';
import {Feather ,MaterialCommunityIcons} from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

 


const Tab = createBottomTabNavigator()

const Tabs = ({weather})=>{
    return(
        <Tab.Navigator 
        screenOptions={{
            tabBarActiveTintColor:'brown',
            tabBarInactiveTintColor:'grey',
            tabBarStyle:{
                backgroundColor:"lightblue",
            },
            // headerShown:false, //important,
            headerStyle:{
                backgroundColor:'lightblue'
            },
            headerTitleStyle:{
                fontWeight:"bold",
                fontSize:20,
                textAlign:'center',
                color:'brown'
            }

        }}>
       
     
      <Tab.Screen  
      name={'Currency Convertor'} 
      options={{
        tabBarIcon:({focused})=>(
          
        <MaterialCommunityIcons size={25}  
        color={focused? 'brown' :'black'} 
        name="currency-ils"/>),
        
      }}>
        {()=><CurrencyScreen/>}
      </Tab.Screen>


      <Tab.Screen name={'Camera'}  options={{
        
        tabBarIcon:({focused})=>(<Feather size={25}  color={focused? 'brown' :'black'} name="camera"/>)
      }}>{()=><Camera2/>}</Tab.Screen>

      {/* <Tab.Screen name={'City'}  options={{
        tabBarIcon:({focused})=><Feather size={25}  color={focused? 'brown' :'black'} name="home"/>
      }}>{()=><City weatherData={weather.city}/>}</Tab.Screen> */}
      
      </Tab.Navigator>
    )
}

export default Tabs