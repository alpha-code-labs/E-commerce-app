import React, { useState, useEffect } from 'react';
import { SafeAreaView,Keyboard, Text,TouchableWithoutFeedback, TextInput, View, Image, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const CurrencyScreen = () => {
  const [amount, setAmount] = useState('0');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [convertedAmt, setConvertedAmt] = useState('');
  const [currencySymbol, setCurrencySymbol] = useState([]);
  const [isToOpen, setIsToOpen] = useState(false); //for dropdown
  const [isOpen, setIsOpen] = useState(false); //for dropdown
  const [isFromOpen, setIsFromOpen] = useState(false); //for dropdown

  const handleSearch = (text) => {
    const filtered = dropdownItems.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const YOUR_APP_ID = 'a8d236fa7d3345e0afbc88390c23215d';
  const openExchangeApi = `https://openexchangerates.org/api/latest.json?app_id=${YOUR_APP_ID}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(openExchangeApi);
        const symbol = Object.keys(response.data.rates);
        setCurrencySymbol(symbol);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleConvert = () => {
    const url = `http://172.16.1.28:9001/api/currency/convert?from=${from}&to=${to}&amount=${amount}`;

    axios
      .get(url)
      .then((res) => {
        const convertedAmount = res.data.convertedAmount.toFixed(2);
        setConvertedAmt(convertedAmount);
      })
      .catch((error) => {
        console.log('AxiosError:', error);
        Alert.alert('Error', 'Failed to convert currency. Please try again later.');
      });
  };

  const dropdownItems = currencySymbol.map((symbol) => ({ label: symbol, value: symbol }));

  return (
    <TouchableWithoutFeedback  onPress={() => {
      if (isFromOpen) {
        setIsFromOpen(false);
        
      }
      Keyboard.dismiss();if(isToOpen){
        setIsToOpen(false);
      }
    }}>
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Currency Converter</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Amount</Text>
          <TextInput
            style={styles.amountInput}
            keyboardType='numeric'
            value={amount}
            onChangeText={(text) => setAmount(text)}
            maxLength={10}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdownItem}>
            <Text style={styles.label}>From</Text>
            <DropDownPicker
              style={styles.dropdown}
              items={dropdownItems}
              open={isFromOpen}
              setOpen={() => setIsFromOpen(!isFromOpen)}
              value={from}
              setValue={(val) => setFrom(val)}
              maxHeight={200}
              dropDownContainerStyle={styles.dropdownPickerContainer}
              searchablePlaceholder="Search"
              searchable
              onSearch={handleSearch}
              dropDownPosition="top"
              autoScroll
            />
          </View>
          <Image style={styles.arrowIcon} source={require('../../assets/two-arrows.png')} />
          <View style={styles.dropdownItem}>
            <Text style={styles.label}>To</Text>
            <DropDownPicker
              style={styles.dropdown}
              items={dropdownItems}
              open={isToOpen}
              setOpen={() => setIsToOpen(!isToOpen)}
              value={to}
              setValue={(val) => setTo(val)}
              maxHeight={200}
              dropDownContainerStyle={styles.dropdownPickerContainer}
              searchablePlaceholder="Search"
              searchable
              onSearch={handleSearch}
              dropDownPosition="top"
              autoScroll
            />
          </View>
        </View>
        {convertedAmt ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              {parseFloat(amount).toFixed(2)} {from} = {convertedAmt} {to}
            </Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.convertButton} onPress={handleConvert}>
          <Text style={styles.convertButtonText}>Convert</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 25,
    backgroundColor: '#D8E6FF',
    alignItems: 'center',
  },
  contentContainer: {
    height:500,
    width: 350,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    marginTop: 5,
    alignItems:'center'
  },
  title: {
    
    textAlign: 'center',
    borderWidth: 1,
    backgroundColor: '#F7FAFC',
    borderRadius: 5,
    color: '#3182CE',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 50,
    
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    marginLeft: 3,
  },
  amountInput: {
    width: 240,
    height: 50,
    margin: 3,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    padding: 8,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 10,
    
  },
  dropdownItem: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIcon: {
    height: 20,
    width: 20,
    
  },
  dropdown: {
    width: 100,
  },
  dropdownPickerContainer: {
    width: 100,
  },
  resultContainer: {
    marginVertical: 10,
  },
  resultText: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 3,
    marginBottom: 4,
    marginTop: 2,
    marginRight: 5,
    width: 'auto',
    backgroundColor: '#F7FAFC',
    borderRadius: 5,
  },
  convertButton: {
    bottom: 0,
    textAlign: 'center',
    margin: 8,
    marginRight: 20,
    width: 240,
    padding: 3,
    backgroundColor: '#3182CE',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 5,
    color: 'white',
    position: 'absolute',
  },
  convertButtonText: {
    textAlign: 'center',
    color: 'white',
    padding:10,
    fontSize:20
  },
});

export default CurrencyScreen;



// import React, { useState ,useEffect} from 'react';
// import { SafeAreaView, Text, TextInput, View, Image, Button, Alert } from 'react-native';
// import tw from 'twrnc';
// import axios from 'axios';
// import DropDownPicker from 'react-native-dropdown-picker';

// const CurrencyScreen = () => {
//   const [amount, setAmount] = useState('');
//   const [to ,setTo]=useState('')
//   const [from , setFrom]=useState('')
//   const [convertedAmt,setConvertedAmt]=useState('');
//   const[currencySymbol,setCurrencySymbol]=useState([]);
//   const[isOpen ,setIsOpen]=useState(false) //for dropdown
  
  
  
// //

//   const [filteredItems, setFilteredItems] = useState(dropdownItems);
//   const [searchValue, setSearchValue] = useState('');

//   const handleSearch = (text) => {
//     setSearchValue(text);
//     const filtered = dropdownItems.filter((item) =>
//       item.label.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };

//   //

//   const YOUR_APP_ID = 'a8d236fa7d3345e0afbc88390c23215d';
//   const openExchangeApi = `https://openexchangerates.org/api/latest.json?app_id=${YOUR_APP_ID}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(openExchangeApi);
//         const symbol = Object.keys(response.data.rates);
//         console.log(symbol);
//         setCurrencySymbol((prevSymbol) => {
//           if (prevSymbol.length === 0) {
//             return symbol;
//           } else {
//             return prevSymbol;
//           }
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     fetchData();
//   }, []);
  


      
//   const handleConvert = () => {
    
//     console.log('handles');
    

    
//     const url = `http://172.16.1.28:9002/api/currency/convert?from=${from}&to=${to}&amount=${amount}`

//     axios
//       .get(url)
//       .then((res) => {
//         const getCurrnecy = res.data.convertedAmount;
//         console.log(getCurrnecy);
//         setConvertedAmt(getCurrnecy.toFixed(2));
//         // setConvertCurrency(getCurrnecy.toFixed(2));
//       })
//       .catch((error) => {
//         console.log('AxiosError:', error);
//         Alert.alert('Error', 'Failed to convert currency. Please try again later.');
//       });
//   };

//   const dropdownItems = currencySymbol.map((symbol) => ({ label: symbol, value: symbol }));
  
  

//   return (
//     <SafeAreaView style={tw`flex-1 p-10  mt-[25px] rounded items-center bg-purple-200`}>
//       <View style={tw`flex justify-center relative`}>
       
//         <View style={tw`w-[350px]  flex-col bg-white rounded-sm p-10 items-end mb-20  mt-5 h-[550px]  relative`}>
//           <View style={tw``}>
//             <Text style={tw`text-center border bg-gray-100  rounded text-blue-800 text-xl font-bold mb-[50px]`}>Currency Converter</Text>
//             <Text style={tw`ml-3`}>Enter Amount</Text>
//             <TextInput
//               style={tw`w-[240px]  h-[50px] m-3 border border-gray-400  p-3`}
//               keyboardType='numeric'
//               value={amount}
//               onChangeText={(text) => setAmount(text)}
//               maxLength={10}
//             />
//           </View>
          
//           <View style={tw`flex-row items-center justify-center z-10`}>
            

//             <View style={tw`p-8`}>
//             <Text style={tw`ml-3`}>From</Text>
//             <DropDownPicker 
//             style={tw`w-[100px]`}
//             items={dropdownItems} open={isOpen} 
//             setOpen={()=>setIsOpen(!isOpen)}
//              value={from}
//              setValue={(val)=>setFrom(val)}
//              maxHeight={200}
//              dropDownContainerStyle={tw`w-[100px] `}
//              searchablePlaceholder="Search"
//           searchable
//           onSearch={handleSearch}
//           dropDownPosition="top"

//              autoScroll/>

//           </View>

         

           
//               <Image style={tw`h-[20px] w-[20px] `} source={require('../assets/two-arrows.png')} />
            
//              <View style={tw`p-8`}>
//              <Text style={tw`ml-3`}>To</Text>
//             <DropDownPicker 
//             style={tw`w-[100px]`}
//             items={dropdownItems} open={isOpen} 
//             setOpen={()=>setIsOpen(!isOpen)}
//              value={to}
//              setValue={(val)=>setTo(val)}
//              maxHeight={200}
//              dropDownContainerStyle={tw`w-[100px]`}
//              searchablePlaceholder="Search"
//           searchable
//           onSearch={handleSearch}
//           dropDownPosition="top"

//              autoScroll/>

//           </View>
//           </View>

//           {!convertedAmt ? null :<View style={tw` `}>
//             <Text style={tw`font-semibold text-xl p-3 mb-4 mt-2 mr-5 w-auto bg-gray-100 rounded`}>{parseFloat(amount).toFixed(2)} {from} = {convertedAmt} {to}</Text>
//             {/* <Text style={tw`font-semibold text-xl p-3 mb-4 mt-2 mr-5 w-auto bg-gray-100 rounded`}>{parseFloat(amount).toFixed(2)} {from} = {convertedAmt} {to}</Text> */}
//           </View>}
          

//           <Text
           
//             style={tw`bottom-0 text-center m-8 mr-20 w-[240px] p-3 bg-blue-500 font-semibold text-xl rounded-sm text-white text-center  absolute`}
//             onPress={handleConvert}
//           >Convert</Text>
          

      
          
        
         



//         </View>
        
//       </View>
//     </SafeAreaView>
//   );
// };



// export default CurrencyScreen;
// import React, { useState ,useEffect} from 'react';
// import { SafeAreaView, Text, TextInput, View, Image, Button, Alert } from 'react-native';
// import tw from 'twrnc';
// import axios from 'axios';
// import DropDownPicker from 'react-native-dropdown-picker';

// const CurrencyScreen = () => {
//   const [amount, setAmount] = useState('');
//   const [to ,setTo]=useState('')
//   const [from , setFrom]=useState('')
//   const [convertedAmt,setConvertedAmt]=useState('');
//   const[currencySymbol,setCurrencySymbol]=useState([]);
//   const[isOpen ,setIsOpen]=useState(false) //for dropdown
  
// //

//   const [filteredItems, setFilteredItems] = useState(dropdownItems);
//   const [searchValue, setSearchValue] = useState('');

//   const handleSearch = (text) => {
//     setSearchValue(text);
//     const filtered = dropdownItems.filter((item) =>
//       item.label.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };

//   //

//   const YOUR_APP_ID = 'a8d236fa7d3345e0afbc88390c23215d';
//   const openExchangeApi = `https://openexchangerates.org/api/latest.json?app_id=${YOUR_APP_ID}`;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(openExchangeApi);
//         const symbol = Object.keys(response.data.rates);
//         console.log(symbol);
//         setCurrencySymbol((prevSymbol) => {
//           if (prevSymbol.length === 0) {
//             return symbol;
//           } else {
//             return prevSymbol;
//           }
//         });
//       } catch (error) {
//         console.log(error);
//       }
//     };
  
//     fetchData();
//   }, []);
  


      
//   const handleConvert = () => {
    
//     console.log('handles');
    

    
//     const url = `http://172.16.1.28:9002/api/currency/convert?from=${from}&to=${to}&amount=${amount}`

//     axios
//       .get(url)
//       .then((res) => {
//         const getCurrnecy = res.data.convertedAmount;
//         console.log(getCurrnecy);
//         setConvertedAmt(getCurrnecy.toFixed(2));
//         // setConvertCurrency(getCurrnecy.toFixed(2));
//       })
//       .catch((error) => {
//         console.log('AxiosError:', error);
//         Alert.alert('Error', 'Failed to convert currency. Please try again later.');
//       });
//   };

//   const dropdownItems = currencySymbol.map((symbol) => ({ label: symbol, value: symbol }));
  
  

//   return (
//     <SafeAreaView style={tw`flex-1 p-10  mt-[25px] rounded items-center bg-purple-200`}>
//       <View style={tw`flex justify-center`}>
       
//         <View style={tw`w-[350px] flex-col bg-white rounded-sm p-10 items-end mb-20  mt-5 h-[500px]  relative`}>
//           <View style={tw``}>
//             <Text style={tw`text-center border bg-gray-100  rounded text-blue-800 text-xl font-bold mb-[50px]`}>Currency Converter</Text>
//             <Text style={tw`ml-3`}>Enter Amount</Text>
//             <TextInput
//               style={tw`w-[240px]  h-[50px] m-3 border border-gray-400  p-3`}
//               keyboardType='numeric'
//               value={amount}
//               onChangeText={(text) => setAmount(text)}
//               maxLength={10}
//             />
//           </View>
          
//           <View style={tw`flex-row`}>
            

//             <View style={tw`p-8`}>
//             <Text style={tw`ml-3`}>From</Text>
//             <DropDownPicker 
//             style={tw`w-[100px] z-2`}
//             items={dropdownItems} open={isOpen} 
//             setOpen={()=>setIsOpen(!isOpen)}
//              value={from}
//              setValue={(val)=>setFrom(val)}
//              maxHeight={200}
//              dropDownContainerStyle={tw`w-[100px]`}
//              searchablePlaceholder="Search"
//           searchable
//           onSearch={handleSearch}
//           dropDownPosition="top"

//              autoScroll/>

//           </View>

         

//             {/* <View style={tw`items-center `}> */}
//               <Image style={tw`h-[20px] w-[20px] `} source={require('../assets/two-arrows.png')} />
//             {/* </View> */}
//              <View style={tw`p-8`}>
//              <Text style={tw`ml-3`}>To</Text>
//             <DropDownPicker 
//             style={tw`w-[100px] z-2`}
//             items={dropdownItems} open={isOpen} 
//             setOpen={()=>setIsOpen(!isOpen)}
//              value={to}
//              setValue={(val)=>setTo(val)}
//              maxHeight={200}
//              dropDownContainerStyle={tw`w-[100px]`}
//              searchablePlaceholder="Search"
//           searchable
//           onSearch={handleSearch}
//           dropDownPosition="top"

//              autoScroll/>

//           </View>
//           </View>

//           {!convertedAmt ? null :<View style={tw` `}>
//             <Text style={tw`font-semibold text-xl p-3 mb-4 mt-2 mr-5 w-auto bg-gray-100 rounded`}>{parseFloat(amount).toFixed(2)} {from} = {convertedAmt} {to}</Text>
//           </View>}
          

//           <Text
           
//             style={tw`w-[240px] mr-2 p-3 bg-blue-500 font-semibold text-xl rounded-sm text-white text-center `}
//             onPress={handleConvert}
//           >Convert</Text>

      
          
        
         



//         </View>
        
//       </View>
//     </SafeAreaView>
//   );
// };



// export default CurrencyScreen;


