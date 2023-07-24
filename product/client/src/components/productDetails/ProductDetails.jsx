import Button from '../common/Button'
import ShowLoading from './ShowLoading'
import { useState, useEffect } from 'react'
import axios from 'axios'
import _URL from '../../connectionStrings'
import back_button from '../../assets/back.jpg'
import icon_cart_filled_light from '../../assets/cart_filled_light.svg'
import icon_cart_unfilled_medium from '../../assets/cart_unfilled_medium.svg'
import icon_heart_filled_light from '../../assets/heart_filled_light.svg'
import icon_heart_unfilled_medium from '../../assets/heart_unfilled_medium.svg'

export default function ProductDetails(props){

    const productId = props.productId
    const [wishlistId, setWishlistId] = useState(null)
    const setShowProductDetails = props.setShowProductDetails
    const [data, setData] =  useState(null)
    const [inWishlist, setInWishlist] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [cartItemId, setCartItemId] = useState(null)
    const userId = props.userId
    const itemId = productId
    const url = `${_URL.product}/${productId}`

    console.log(props.userId, 'from props-userId')

useEffect(()=>{
        
    axios.get(url).then((response)=>{
        setData(response.data)
        console.log(response.data)
    })
    .then(setWishlistStatus())
    .then(setCartStatus())
    .then(network_setWishlistId())

},[])


const setWishlistStatus =()=>{
    const urlForExistingWishlist = `${_URL.wishlistItems}/${userId}`
    axios.get(urlForExistingWishlist).then(response=>{
        if(!response.error){
            //check if item is in wishlist
            response.data.forEach(item=>{
                if(item.product === productId) setInWishlist(true)
            })
            console.log(inWishlist)
        }
    })
}

const setCartStatus =()=>{
    const url = `${_URL.cartItems}/${userId}`
    axios.get(url).then(response=>{
        response.data[0].items.forEach(item=>{
            if(item.product === productId) {
                setInCart(true)
                setCartItemId(item._id)
            }
        })
    })
}

const network_setWishlistId =()=>{
    const url = `${_URL.wishlists}/${userId}`
        axios.get(url).then(response=>{
            setWishlistId(response.data[0]._id)
            console.log(response.data[0]._id, 'wishlist id ')
        })
}

const addToCart = ()=>{
    const url = `${_URL.cartItems}/${userId}`

    axios.get(url).then(response=>{
        if(response.error){
            console.log(response.error)
        }

        else{
            console.log('everything looks okay')
            axios.post(_URL.createCartItem,{userId:userId, productId: itemId, quantity:1}).then(()=>{
                console.log('item added to cart')
                //may need to implement delete from wishlist if item is present in wishlist
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
                      ////may need to implement delete from wishlist if item is present in wishlist  
                    })
                }
            })

        }
    })
}

const addToWishlist = ()=>{

    const urlForNewWishlist = `${_URL.createWishlist}/${userId}`
    const urlForExistingWishlist = `${_URL.wishlistAdd}/${userId}/items`

    //assume the wishlist already exisst
    axios.post(urlForExistingWishlist, {product:productId, quantity:1}).then(response=>{
        if(response.error){
            //there is no wishlist for this user so create one
            axios.post(urlForNewWishlist).then( response =>{
                //now add item to wishlist
                axios.post(urlForExistingWishlist,{product:productId, quantity:1}).then(response=>{
                    console.log(response.data)
                })

                //set wishlistId
                network_setWishlistId()
            }
            )
        }
        else{
            console.log(response.data)
        }
    })
}

const removeFromCart = ()=>{
    if(!cartItemId) return
    axios.delete(`${_URL_removeCartItem}/${userId}/${cartItemId}`).then(()=>{
        console.log('product deleted from Cart-poductDetails')    
    })
}

const removeFromWishlist = ()=>{
        axios.delete(`${_URL.removeWishlistItem}/${wishlistId}/items/${itemId}`).then(()=>{
            console.log('product deleted from wishlist')
        });
}

const handleWishlistClick = ()=>{
    if(inWishlist){
        removeFromWishlist()
        setInWishlist(false)
    }
    else{
        addToWishlist()
        removeFromCart()
        setInCart(false)
        setInWishlist(true)
    }
}

const handleCartClick=()=>{
    if(inCart){
        removeFromCart()
        setInCart(false)
    }
    else{
        addToCart()
        removeFromWishlist()
        setInWishlist(false)
        setInCart(true)
    }
}



    return (
        <div className='mt-[130px]'>

        {/*<div className='btn flex  m-5 item-center cursor-pointer' onClick={handleBackButton}>
            <img className='w-[25px] h-[20px]' src={back_button} />
            <p className='text-sm font-bold ml-4 text-slate-800'>Browse Products</p>
    </div>*/}

      {!data && <ShowLoading/>}
        
      { data && <div className="box-border text-black flex p-6">

        <div className='backButton '></div>
          <div className="flex flex-wrap justify-start space-x-5">
            <div className="image_container w-[200px] h-[200px] ">
              <img className="w-full h-full object-cover" src={data.image} />
            </div>
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col mt-1 space-y-1">
                <div className="text-2xl ">{data.name}</div>
                <div className="text-base">{data.description}</div>
                <div className="text-xl">$ {data.price}</div>
              </div>
                <div className="flex space-x-4 text-gray-800">
                { userId &&
                <>
                    <div className='button flex items-center border pr-1 cursor-pointer hover:border-sky-500 rounded' onClick={handleWishlistClick}>               
                        <div className='button w-[38px] h-[38px]'>
                            <img className='w-full h-full object-cover' src={inWishlist? icon_heart_filled_light : icon_heart_unfilled_medium} />
                        </div>
                        <p className='button_text text-sm font-semibold'>{inWishlist? 'Remove from Wishlist' : 'Add to Wishlist'}</p>
                    </div>

                    <div className='button flex items-center border pr-1 cursor-pointer hover:border-sky-500 rounded' onClick={handleCartClick}>
                        <div className='button_icon w-[38px] h-[38px]'>
                            <img className='w-full h-full object-cover' src={inCart? icon_cart_filled_light : icon_cart_unfilled_medium} />
                        </div>
                        <p className='button_text text-sm font-semibold'>{inCart? 'Remove from Cart' : 'Add to Cart'}</p>
                    </div>
                </>
                }
              </div>
            </div>
          </div>       
        </div> 
      }
        </div>
      )    
}
