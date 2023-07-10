import {useState, useEffect} from 'react'
import axios from 'axios'
import WishlistItem from './WishlistItem'


export default function Wishlist(){
    
    const [products, setProducts] =  useState(null)

    const userId = '64a51fb518b1e50537bde392'
    const wishlistId = '64ababb979f03d27475a9182'
    const url = `http://localhost:8000/wishlist/api/getall/${userId}`
    const productUrl = `http://localhost:8000/inventory/api/product/`


    const fetchProducts=()=>{
        axios.get(url).then(response=>{ 
            let fetchedProducts = []
         
            let promises = []

            console.log(response)

            if(response.data.length > 0){
                response.data.forEach(item=>{
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

    const addToCart = (itemId)=>{

        const url = `http://localhost:8000/cart/api/getcartitems/${userId}`

        axios.get('http://localhost:8000/cart/api/getcartitems/64a51fb518b1e50537bde392').then(response=>{
            if(response.error){
                console.log(response.error)
            }

            else{
                console.log('everything looks okay')
                axios.post('http://localhost:8000/cart/api/createcartitem',{userId:userId, productId: itemId, quantity:1}).then(console.log('item added to cart'))
            }
        }).catch(error=>{
            if(error.response.status){
                //cart doesn't exist. Create a new cart and then add item to it..

                axios.post('http://localhost:8000/cart/api/create', {userId: userId}).then((res)=>{
                    //now add the current item to it

                    if(res.status === 201){
                        axios.post('http://localhost:8000/cart/api/createcartitem',{userId:userId, productId: itemId, quantity:1}).then(console.log('item added to cart'))
                    }
                })

            }
        })
        //write code for adding item to backend
        //once done refetch the products data and set Products state variable

    }

    const deleteWishlistItem = (itemId)=>{
        const url = `http://localhost:8000/wishlist/api/${wishlistId}/items/${itemId}`
        axios.delete(url).then(()=>{
            console.log('product deleted from cart')
            fetchProducts()
        });
    }

    return(
        <>
            <div className='flex flex-col gap-4 ml-10'>
                {products && products.map(product=>{
                    
                    console.log(product)
                    return (
                    <WishlistItem 
                        productName={product.name}
                        productPrice={product.price}
                        productId={product._id}
                        addToCart = {addToCart}
                        deleteItem = {deleteWishlistItem}
                    />
                    )
                })}

                {!products && <p className='text-xl'>There are no products in your wishlist</p>}
            </div>
        </>
    )
}