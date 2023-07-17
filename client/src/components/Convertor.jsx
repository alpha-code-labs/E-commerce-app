import Button from "./common/Button";
import icon_convert from "../assets/two-arrows.png";
import { useState ,useEffect} from "react";
import axios from "axios";
export default function Convertor() {
    const [currency, setCurrency] = useState([]);
    const [amount, setAmount] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [convertCurrency, setConvertCurrency] = useState("");
  
    const YOUR_APP_ID = 'a8d236fa7d3345e0afbc88390c23215d';
    const openExchangeApi = `https://openexchangerates.org/api/latest.json?app_id=${YOUR_APP_ID}`;
  
    useEffect(() => {
        const storedCurrency = localStorage.getItem("currency");
    
        if (storedCurrency) {
          setCurrency(JSON.parse(storedCurrency));
        } else {
          const fetchData = async () => {
            try {
              const response = await axios.get(openExchangeApi);
              const symbol = Object.keys(response.data.rates);
              console.log(symbol);
              setCurrency(symbol);
              localStorage.setItem("currency", JSON.stringify(symbol));
            } catch (error) {
              console.log(error);
            }
          };
    
          fetchData();
        }
      }, []);
      const fromCurrency = from === "" ? "INR" : from;
      const toCurrency = to === "" ? "USD" : to;
    const handleConvert = () => {
      // Check if the 'from' currency is empty and set it to "INR"
      
      const url = `http://localhost:9002/api/currency/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`;
  
      axios.get(url).then((res) => {
        const getCurrnecy = res.data.convertedAmount;
        console.log(getCurrnecy);
        setConvertCurrency(getCurrnecy.toFixed(2));
      });
    };
  
    const handleAmountChange = (e) => {
      setAmount(e.target.value.slice(0, 10));
    };
  
    return (
      <div className="bg-gradient-to-b from-purple-200 via-pink-200 to-red-200">
        <div className="flex justify-center">
          <div className="flex-col space-y-8 bg-white rounded-sm p-10 items-end mb-20 mt-5 h-[550px]">
            <h1 className="text-center text-xl">Currency Convertor</h1>
            <div className="space-y-2">
              <span>Enter Amount</span>
              <input
                className="w-full h-[50px] border px-2 appearance-none"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={amount}
                onKeyPress={(e) => {
                  const keyCode = e.which || e.keyCode;
                  const keyValue = String.fromCharCode(keyCode);
  
                  // Allow only numeric values and backspace
                  if (!/^\d+$/.test(keyValue) && keyCode !== 8) {
                    e.preventDefault();
                  }
                }}
                onChange={handleAmountChange}
              />
            </div>
  
            <div className="flex gap-4 justify-center space-y-2 items-center">
              <div className="space-y-2">
                <div>From</div>
                <select
                 
                  className="border p-4"
                  value={!from? 'INR' : from }
                  onChange={(e) => setFrom(e.target.value)}
                >
                  {currency.map((currency) => {
                    return (
         
                      <option key={currency} className="p-2">
                        {currency}
                      </option>
                      
                    );
                  })}
                </select>
              </div>
  
              <div className="">
                <img className="w-[30px] h-[30px] mt-5" src={icon_convert} alt="Convert Icon" />
              </div>
  
              <div className="space-y-2">
                <div>To</div>
                <select className="border p-4" value={!to? 'USD' : to } onChange={(e) => setTo(e.target.value)}>
                  {currency.map((currency) => {
                    return (
                      <option  key={currency} className="p-2">
                        {currency}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
  
            <div className="flex justify-center items-center">
              {!convertCurrency ? null : (
                <div className="p-3 text-center flex-col w-64 h-auto bg-gray-100 rounded-md flex items-center justify-center">
                  {amount} {!from ? "INR" :from} = {convertCurrency} {!to ? "USD" :to}
                </div>
              )}
            </div>
  
            <div className="mb-5">
              <Button type="simple" buttonText="Convert" onClick={handleConvert} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  