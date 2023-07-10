import { useEffect, useState } from "react"
import DisplayDefaultProducts from '../components/DisplayDefaultProducts'
import DisplaySearchedProducts from '../components/DisplaySearchedProducts'
import Navbar from '../components/navbar/Navbar'
import Profile from "../components/Profile"
import axios from 'axios'


export default function Products(props){
    //change to const
    var productList = null

  

    const [defaultProductList, setDefaultProducts] = useState(null) 
    const productListUrl = 'http://localhost:8000/inventory/api/products'
    const [showProfile, setShowProfile] = useState(true) 
    const [showDefault, setShowDefault] = useState(true)

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


    return(
    <>
        {!showProfile && <Navbar onChange={onSearchBarChange}/>}
        {!showProfile && !showDefault && productList && <DisplaySearchedProducts products={productList}/>}
        {!showProfile && showDefault && defaultProductList && <DisplayDefaultProducts products={defaultProductList} />}


        {showProfile && <Profile/>}
    </>
    )
}