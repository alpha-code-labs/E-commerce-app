import { StatusBar } from 'expo-status-bar';
import {  Text, View } from 'react-native';
import tw from 'twrnc';
import CurrencyScreen from './components/CurrencyScreen';

export default function App() {
  return (
    <CurrencyScreen/>
    // <View style={tw`flex-1 justify-center items-center`}>
    //   <Text style={tw`text-red-400 `}>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}


