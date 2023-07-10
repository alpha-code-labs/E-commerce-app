import {useState, useEffect} from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import Button from '../common/Button'

export default function Cart(){
    
    const [products, setProducts] =  useState(null)
    const url = 'http://localhost:8000/wishlist/api/getall/:userId'
    
    //temporary arrangement
    const url2 = 'http://localhost:8000/inventory/api/products'
    //dummy data
    const tmpProducts = [{name:'Philips Refrigerator', price:'15,000'}, {name:'Xiomi Mobile Phone', price:'21,000'}]

    useEffect(()=>{
        axios.get(url2).then(response=>{ //change to url from url2
            setProducts(response.data)
            console.log(response.data)
        }).catch(err=>{console.log(err)})
    },[])

    const deleteCartItem = ()=>{
        //write code for removing item from Cart backend
        //once done refetch the products data and set Products state variable
    }

    return(
        <>
            <div className='flex flex-col gap-4'>
                {products && products.map(product=>{
                    
                    console.log(product)
                    return (<CartItem 
                        productName={product.name}
                        productPrice={product.price}
                        deleteItem = {deleteCartItem}
                    />)
                })}

                <div className='w-[340px]'>
                    <Button buttonText='Place Order'/>
                </div>
            </div>
        </>
    )
}