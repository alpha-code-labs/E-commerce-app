import { useEffect, useState } from "react"
import DisplayDefaultProducts from '../components/DisplayDefaultProducts'
import DisplaySearchedProducts from '../components/DisplaySearchedProducts'
import axios from 'axios'


export default function Products(props){
    //change to const
    var productList = props.productList

  

    const [defaultProductList, setDefaultProducts] = useState(null) 
    const productListUrl = 'http://localhost:8000/inventory/api/products'
   // const products = [{category:'Fashion', name:'color eye lens'}, {category:'electronics and stuff', name:'Refrigerator'}, {category:'fashion', name:'Maskara'}, {category:'electronics', name:'Air Congitioner'}, {category:'fashion', name:'Lipstick'}, {category:'sports', name:'Badminton Racket'}]

    //temporary arrangement
     //const productList = products

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
        {productList && <DisplaySearchedProducts products={productList}/>}
        {defaultProductList && <DisplayDefaultProducts products={defaultProductList} />}
    </>
    )
}