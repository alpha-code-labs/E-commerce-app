import { useEffect, useState } from "react"
import DisplayDefaultProducts from '../components/DisplayDefaultProducts'
import DisplaySearchedProducts from '../components/DisplaySearchedProducts'
import Navbar from '../components/navbar/Navbar'
import Profile from "../components/Profile"
import axios from 'axios'


export default function Products(props){
    //change to const
    var productList = props.productList

  

    const [defaultProductList, setDefaultProducts] = useState(null) 
    const productListUrl = 'http://localhost:8000/inventory/api/products'
    const [showProfile, setShowProfile] = useState(true)

    // const products = [{category:'Fashion', name:'color eye lens'}, {category:'electronics and stuff', name:'Refrigerator'}, {category:'fashion', name:'Maskara'}, {category:'electronics', name:'Air Congitioner'}, {category:'fashion', name:'Lipstick'}, {category:'sports', name:'Badminton Racket'}]

    //temporary arrangement
     //const productList = products

     const onSearchBarChange = (e)=>{
        console.log(e.target.value)
     }

    useEffect(()=>{
        if(!productList){
            axios.get(productListUrl).then((response)=>{
                setDefaultProducts(response.data)
                console.log(response.data)
            })

            //temporary arrangement
            //setDefaultProducts(products)
        }
        

    },[])

    

    return(
    <>
        {!showProfile && <Navbar onChange={onSearchBarChange}/>}
        {!showProfile && productList && <DisplaySearchedProducts products={productList}/>}
        {!showProfile && defaultProductList && <DisplayDefaultProducts products={defaultProductList} />}


        {showProfile && <Profile/>}
    </>
    )
}