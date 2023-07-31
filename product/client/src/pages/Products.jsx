import { useEffect, useState } from "react"
import DisplayDefaultProducts from '../components/DisplayDefaultProducts'
import DisplaySearchedProducts from '../components/DisplaySearchedProducts'
import Navbar from '../components/navbar/Navbar'
import Profile from "../components/Profile"
import ProductDetails from "../components/productDetails/ProductDetails"
import axios from 'axios'
import _URL from '../connectionStrings'


export default function Products(props){
    //change to const
    const [defaultProductList, setDefaultProducts] = useState(null) 
    const productListUrl = _URL.products
    const [showProfile, setShowProfile] = useState(false) 
    const [showDefault, setShowDefault] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] =  useState(null)

    //these state will be used for handling Product Details page
    const [showProductDetails, setShowProductDetails] = useState(false)
    const [productId, setProductId] = useState(null)
    const [searchedProducts, setSearchedProducts] = useState([])
    //.......


     const onSearchBarChange = (e)=>{
        console.log(e.target.value)

        //needs fix...
        
        if(defaultProductList.length !== 0){
            const productList = defaultProductList.filter(product=>{
                console.log(product.name)
                console.log(product.name.toLowerCase().includes(e.target.value.toLowerCase()))
                return product.name.toLowerCase().includes(e.target.value.toLowerCase())
            })

            setSearchedProducts(productList)
    
            if(e.target.value.length !== 0) setShowDefault(false)
            else setShowDefault(true)
        } 
     }


    useEffect(()=>{
        if(searchedProducts.length = 0){
            setShowEmptyMessage(true)
        }
    },[searchedProducts])

    useEffect(()=>{
        axios.get(productListUrl).then((response)=>{
            setDefaultProducts(response.data)
            console.log(response.data)
        })

    },[])


    const fetchUserData = async ()=>{
        const token = new URLSearchParams(window.location.search).get('token')
        console.log(token)
        const tokenPayload = token.split('.')[1]
        const decodePayload = window.atob(tokenPayload)
        console.log(decodePayload)

        if(token){
            console.log('token got inside', token)

            const url = await axios.get(_URL.customerLogin,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(response=>{
                console.log('Customer Data', response)
                setLoggedIn(true)
                setUserData(response.data)
            })
        }
    }



    useEffect(()=>{
        fetchUserData()

        //temp
       // setUserData({username:'Ajay', password: 'adfdf', email: 'ajayaxes318@gmail.com'})
    },[])



    return(
    <>
        {!showProfile && <Navbar 
            setShowProductDetails={setShowProductDetails}
            setShowProfile={setShowProfile} 
            loggedIn={loggedIn} 
            userData={userData} 
            onChange={onSearchBarChange} />}
            <div className="absolute w-full left-0 top-[130px] ">
                {!showProfile && !showProductDetails && !showDefault && searchedProducts && <DisplaySearchedProducts 
                    setShowProductDetails={setShowProductDetails}
                    setProductId={setProductId}
                    products={searchedProducts}/>
                }
                {!showProfile && !showProductDetails && showDefault && defaultProductList && <DisplayDefaultProducts 
                    setShowProductDetails={setShowProductDetails}
                    setProductId={setProductId}
                    products={defaultProductList} />
                }
            </div>

        {showProfile && !showProductDetails && <Profile 
            userData={userData}
            setShowProfile={setShowProfile} />}

        {showProductDetails && <ProductDetails 
            productId={productId} 
            userId={userData? userData._id:null}
            setShowProductDetails={setShowProductDetails} />}
    </>
    )
}