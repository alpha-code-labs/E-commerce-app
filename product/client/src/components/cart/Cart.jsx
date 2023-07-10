import {useState, useEffect} from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import Button from '../common/Button'

export default function Cart(){
    
    const [products, setProducts] =  useState(null)
    const userId = '64a51fb518b1e50537bde392'
    const url = `http://localhost:8000/cart/api/getcartitems/${userId}`
    const productUrl = `http://localhost:8000/inventory/api/product/`


    const fetchProducts=()=>{
        axios.get(url).then(response=>{ 
            let fetchedProducts = []
         
            let promises = []

            console.log(response.data)

            if(response.data[0].items.length > 0){
                response.data[0].items.forEach(item=>{
                    promises.push(axios.get(productUrl+item.product).then(productItem=>fetchedProducts.push(productItem.data)))
                })

                Promise.all(promises).then(()=>{
                    setProducts(fetchedProducts)
                })
            }

            else setProducts(null)

        }).catch(err=>{console.log(err)})
    } 


    useEffect(()=>{
        fetchProducts()
    },[])

    const deleteCartItem = ()=>{
        //write code for removing item from Cart backend
        //once done refetch the products data and set Products state variable
    }

    return(
        <>
            <div className='flex flex-col gap-4 ml-32'>
                {products && products.map(product=>{
                    
                    console.log(product)
                    return (<CartItem 
                        productName={product.name}
                        productPrice={product.price}
                        deleteItem = {deleteCartItem}
                    />)
                })}

                {!products && <p className='text-xl'>There are no products in your cart..</p>}

                {products && <div className='w-[340px]'>
                    <Button buttonText='Place Order'/>
                </div>}
            </div>
        </>
    )
}