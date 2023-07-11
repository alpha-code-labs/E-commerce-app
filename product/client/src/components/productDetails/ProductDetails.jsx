import product_image from '../../assets/cranberry.jpg'
import Button from '../common/Button'
import ShowLoading from './ShowLoading'
import { useState, useEffect } from 'react'
import axios from 'axios'
import back_button from '../../assets/back.jpg'

export default function ProductDetails(props){

    const productId = props.productId || '64a2ad4785a8c72f0493b466'
    const setShowProductDetails = props.setShowProductDetails
    const [data, setData] =  useState(null)
    const url = `http://localhost:8000/inventory/api/product/${productId}`


useEffect(()=>{
        
    axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
    })

},[])


const addToWishlist = ()=>{

}

const addToCart=()=>{

}


const handleBackButton = ()=>{
    setShowProductDetails(false)
}


    return (
        <>

        <div className='btn flex  m-5 item-center cursor-pointer' onClick={handleBackButton}>
            <img className='w-[25px] h-[20px]' src={back_button} />
            <p className='text-sm font-bold ml-4 text-slate-800'>Browse Products</p>
        </div>
      {!data && <ShowLoading/>}
        
      { data && <div className="box-border text-black flex p-6">

        <div className='backButton '></div>
          <div className="flex flex-wrap justify-start space-x-5">
            <div className="image_container">
              <img className="w-50 h-50" src={data.image} />
            </div>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col mt-1 space-y-1">
                <div className="text-2xl ">{data.name}</div>
                <div className="text-base">{data.description}</div>
                <div className="text-xl">{data.price}</div>
              </div>
              <div className="flex space-x-4">
                <Button buttonText='Wishlist' onClick={addToWishlist} />
                <Button buttonText='Add to Cart' onClick={addToCart} />
              </div>
            </div>
          </div>       
        </div> 
      }
        </>
      )    
}
