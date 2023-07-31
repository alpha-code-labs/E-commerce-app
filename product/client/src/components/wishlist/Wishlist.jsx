import {useState, useEffect} from 'react'
import axios from 'axios'
import WishlistItem from './WishlistItem'
import Loading from '../common/Loading'
import _URL from '../../connectionStrings'


export default function Wishlist(props){
    
    const [products, setProducts] =  useState(null)
    const [loading, setLoading] = useState(false)
    const userId = props.userId
    const [wishlistId, setWishlistId] = useState(null)
    const url = `${_URL.wishlistItems}/${userId}`
    //const wishlistHost = 'http://localhost:8000/profile/wishlist'
    //const cartHost = "http://localhost:8000/profile/cart"
    //const productHost = "http://localhost:8000/profile/wishlist"
    const productUrl = `${_URL.product}/`
    


    const fetchProducts=()=>{
        setLoading(true)
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
                    setLoading(false)
                })
            }

            else {
                setProducts(null)
                setLoading(false)
            }

        }).catch(err=>{console.log(err)})
    } 

    useEffect(()=>{
        fetchProducts()

        const url = `${_URL.wishlists}/${userId}`
        axios.get(url).then(response=>{
            setWishlistId(response.data[0]._id)
            console.log(response.data[0]._id, 'wishlist id ')
        })
    },[])

    const addToCart = (itemId)=>{

        axios.get(`${_URL.cartItems}/${userId}`).then(response=>{
            if(response.error){
                console.log(response.error)
            }

            else{
                console.log('everything looks okay')
                axios.post(_URL.createCartItem,{userId:userId, productId: itemId, quantity:1}).then(()=>{
                    console.log('item added to cart')
                    deleteWishlistItem(itemId)
                })
            }
        }).catch(error=>{
            if(error.response.status){
                //cart doesn't exist. Create a new cart and then add item to it..

                axios.post(_URL.createCart, {userId: userId}).then((res)=>{
                    //now add the current item to it

                    if(res.status === 201){
                        axios.post(_URL.createCartItem,{userId:userId, productId: itemId, quantity:1}).then(()=>{
                            console.log('item added to cart')
                            deleteWishlistItem(itemId)
                        })
                    }
                })

            }
        })

    }

    const deleteWishlistItem = (itemId)=>{
        const url = `${_URL.deleteWishlistItem}/${wishlistId}/items/${itemId}`
        axios.delete(url).then(()=>{
            console.log('product deleted from cart')
            fetchProducts()
        });
    }

    return(
        <>
            <div className='flex flex-col gap-4 ml-10 items-center'>
                {!loading && products && products.map(product=>{
                    
                    console.log(product)
                    return (
                    <WishlistItem 
                        productName={product.productName}
                        productPrice={product.price}
                        productImage={product.image}
                        productId={product._id}
                        addToCart = {addToCart}
                        deleteItem = {deleteWishlistItem}
                    />
                    )
                })}

                {!loading && !products && <p className='text-xl'>There are no products in your wishlist</p>}
                {loading && <Loading/>}
            </div>
        </>
    )
}