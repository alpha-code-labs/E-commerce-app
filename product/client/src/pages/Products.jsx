import { useEffect, useState } from "react"
import DisplayDefaultProducts from '../components/DisplayDefaultProducts'
import DisplaySearchedProducts from '../components/DisplaySearchedProducts'
import Navbar from '../components/navbar/Navbar'
import Profile from "../components/Profile"
import ProductDetails from "../components/productDetails/ProductDetails"
import axios from 'axios'


export default function Products(props){
    //change to const
    var productList = null
    const [defaultProductList, setDefaultProducts] = useState(null) 
    const productListUrl = 'http://localhost:8000/inventory/api/products'
    const [showProfile, setShowProfile] = useState(false) 
    const [showDefault, setShowDefault] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [userData, setUserData] =  useState(null)

    //these state will be used for handling Product Details page
    const [showProductDetails, setShowProductDetails] = useState(false)
    const [productId, setProductId] = useState(null)
    //.......


     const onSearchBarChange = (e)=>{
        console.log(e.target.value)

        //needs fix...
        
        if(defaultProductList.length !== 0){
            productList = defaultProductList.filter(product=>{
                console.log(product.name)
                return product.name.toLowerCase().includes(e.target.value)
            })

            console.log(productList)

            if(productList.length = 0){
                setShowEmptyMessage(true)
            }
    
            if(e.target.value.length !== 0) setShowDefault(false)
            else setShowDefault(true)
        } 
     }

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

            const url = await axios.get('http://localhost:8010/api/customer/customer',{
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
    },[])



    return(
    <>
        {!showProfile && <Navbar 
            setShowProductDetails={setShowProductDetails}
            setShowProfile={setShowProfile} 
            loggedIn={loggedIn} 
            userData={userData} 
            onChange={onSearchBarChange} />}
        {!showProfile && !showProductDetails && !showDefault && productList && <DisplaySearchedProducts 
            setShowProductDetails={setShowProductDetails}
            setProductId={setProductId}
            products={productList}/>
        }
        {!showProfile && !showProductDetails && showDefault && defaultProductList && <DisplayDefaultProducts 
            setShowProductDetails={setShowProductDetails}
            setProductId={setProductId}
            products={defaultProductList} />
        }

        {showProfile && !showProductDetails && <Profile 
            userData={userData}
            setShowProfile={setShowProfile} />}

        {showProductDetails && <ProductDetails 
            productId={productId} 
            userId={userData._id}
            setShowProductDetails={setShowProductDetails} />}
    </>
    )
}