import React, { useState ,useEffect} from 'react';
import { SafeAreaView, Text, TextInput, View, Image, Button, Alert } from 'react-native';
import tw from 'twrnc';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

const CurrencyScreen = () => {
  const [amount, setAmount] = useState('');
  const [to ,setTo]=useState('')
  const [from , setFrom]=useState('')
  const [convertedAmt,setConvertedAmt]=useState('');
  const[currencySymbol,setCurrencySymbol]=useState([]);
  const[isOpen ,setIsOpen]=useState(false) //for dropdown
  
//

  const [filteredItems, setFilteredItems] = useState(dropdownItems);
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (text) => {
    setSearchValue(text);
    const filtered = dropdownItems.filter((item) =>
      item.label.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  //

  const YOUR_APP_ID = 'a8d236fa7d3345e0afbc88390c23215d';
  const openExchangeApi = `https://openexchangerates.org/api/latest.json?app_id=${YOUR_APP_ID}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(openExchangeApi);
        const symbol = Object.keys(response.data.rates);
        console.log(symbol);
        setCurrencySymbol((prevSymbol) => {
          if (prevSymbol.length === 0) {
            return symbol;
          } else {
            return prevSymbol;
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);
  


      
  const handleConvert = () => {
    
    console.log('handles');
    

    
    const url = `http://172.16.1.28:9002/api/currency/convert?from=${from}&to=${to}&amount=${amount}`

    axios
      .get(url)
      .then((res) => {
        const getCurrnecy = res.data.convertedAmount;
        console.log(getCurrnecy);
        setConvertedAmt(getCurrnecy.toFixed(2));
        // setConvertCurrency(getCurrnecy.toFixed(2));
      })
      .catch((error) => {
        console.log('AxiosError:', error);
        Alert.alert('Error', 'Failed to convert currency. Please try again later.');
      });
  };

  const dropdownItems = currencySymbol.map((symbol) => ({ label: symbol, value: symbol }));
  
  

  return (
    <SafeAreaView style={tw`flex-1 p-10  mt-[25px] rounded items-center bg-purple-200`}>
      <View style={tw`flex justify-center`}>
       
        <View style={tw`w-[350px] flex-col space-y-8 bg-white rounded-sm p-10 items-end mb-20  mt-5 h-[500px]  relative`}>
          <View style={tw``}>
            <Text style={tw`text-center border bg-gray-100  rounded text-blue-800 text-xl font-bold mb-[50px]`}>Currency Converter</Text>
            <Text style={tw`ml-3`}>Enter Amount</Text>
            <TextInput
              style={tw`w-[240px]  h-[50px] m-3 border border-gray-400  p-3`}
              keyboardType='numeric'
              value={amount}
              onChangeText={(text) => setAmount(text)}
              maxLength={10}
            />
          </View>
          
          <View style={tw`flex-row justify-center  items-center justify-center"`}>
            

            <View style={tw`p-8  `}>
            <Text style={tw`ml-3`}>From</Text>
            <DropDownPicker 
            style={tw`w-[100px] z-2`}
            items={dropdownItems} open={isOpen} 
            setOpen={()=>setIsOpen(!isOpen)}
             value={from}
             setValue={(val)=>setFrom(val)}
             maxHeight={200}
             dropDownContainerStyle={tw`w-[100px]`}
             searchablePlaceholder="Search"
          searchable
          onSearch={handleSearch}
          dropDownPosition="top"

             autoScroll/>

          </View>

         

            {/* <View style={tw`items-center `}> */}
              <Image style={tw`h-[20px] w-[20px] `} source={require('../assets/two-arrows.png')} />
            {/* </View> */}
             <View style={tw`p-8 z-2`}>
             <Text style={tw`ml-3`}>To</Text>
            <DropDownPicker 
            style={tw`w-[100px] z-2`}
            items={dropdownItems} open={isOpen} 
            setOpen={()=>setIsOpen(!isOpen)}
             value={to}
             setValue={(val)=>setTo(val)}
             maxHeight={200}
             dropDownContainerStyle={tw`w-[100px]`}
             searchablePlaceholder="Search"
          searchable
          onSearch={handleSearch}
          dropDownPosition="top"

             autoScroll/>

          </View>
          </View>

          {!convertedAmt ? null :<View style={tw` `}>
            <Text style={tw`font-semibold text-xl p-3 mb-4 mt-2 mr-5 w-auto bg-gray-100 rounded`}>{parseFloat(amount).toFixed(2)} {from} = {convertedAmt} {to}</Text>
          </View>}
          

          <Text
           
            style={tw`w-[240px] mr-2 p-3 bg-blue-500 font-semibold text-xl cursor-pointer rounded-sm text-white text-center `}
            onPress={handleConvert}
          >Convert</Text>

      
          
        
         



        </View>
        
      </View>
    </SafeAreaView>
  );
};



export default CurrencyScreen;


