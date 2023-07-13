import Button from "./common/Button"
import Wishlist from "./wishlist/Wishlist"
import Cart from "./cart/Cart"
import {useEffect, useState} from 'react'
import Orders from "./orders/Orders"
import icon_logout from '../assets/logout.png'

export default function Profile(props){
    
    const username = props.userData.username 
    const userId = props.userData._id 

    const address = 'Rider House, Sector-44, Gurugram Haryana' //update later
    const [showWishlist, setShowWishlist] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showOrders, setShowOrders] = useState(false)
    const [ordersId, setOrdersId] = useState('')
    const setShowProfile = props.setShowProfile


    //Logout onClick method
    const logout = (e)=>{
    }

    //Wishlist onClick method
    const onWishlistClick = (e)=>{
        setShowWishlist(true)
        setShowCart(false)
        setShowOrders(false)
    }

    //Cart onClick method
    const onCartClick = (e)=>{
        setShowWishlist(false)
        setShowCart(true)
        setShowOrders(false)
    }

    //Orders onClic method
    const onOrdersClick = (e)=>{
        setShowWishlist(false)
        setShowCart(false)
        setShowOrders(true)
    }

    return(
    <>
        <div className="topbar w-full py-6 px-10 flex justify-between item-end shadow items-center">
                <div className=''>
                    <h1 
                        onClick={()=>setShowProfile(false)}
                        className="text-2xl font-bold bg-gradient-to-tr from-indigo-600 to-teal-200 bg-clip-text text-transparent hover:cursor-pointer">
                        ShopXpress
                    </h1>
                </div>
                <div className="flex space-x-6 align-middle">
                <p className="align-middle text-base">{`Welcome ${username} !`}</p>
                <div className="w-[25px] h-[25px] cursor-pointer">
                    <img className="w-full h-full object-cover" src={icon_logout}/>
                </div>
                </div>
        </div>

        <div className="wrapper w-full h-[calc(100vh-90px)] flex flex-row">
            <div className="w-[170px] bg-blue-200">
                <div className="flex-col px-10 py-5 flex gap-2">
                        
                        <div className="flex flex-col justify-middle">
                            <Button buttonText='Wishlist' onClick={onWishlistClick}/>
                            {showWishlist && <span className='arrow-down'></span>}
                        </div>

                        <div className="flex flex-col justify-middle">
                            <Button buttonText='Cart' onClick={onCartClick}/>
                            {showCart && <span className='arrow-down'></span>}
                        </div>

                        <div className="flex flex-col justify-middle">
                            <Button buttonText='Orders' onClick={onOrdersClick}/>
                            {showOrders && <span className='arrow-down'></span>}
                        </div>
                    </div>
            </div>
            <div className="w-full p-4">
                <div className='wrapper w-full min-h-full px-4 pt-7 overflow-scroll'>
                    {showWishlist && <Wishlist userId = {userId} />}
                    {showCart && <Cart userId = {userId} />}
                    {showOrders && <Orders userId = {userId} />}
                </div>
            </div>
            <div className="w-[180px] bg-grey-100 pr-5 pt-4 mr-9">
                <div className="address w-full h-[140px] shadow rounded-md ml-4 mt-4 px-4 py-2 text-sm">
                    <p className="text-sm font-bold">Address:</p>
                    {address.split(',').map((line,i)=>(<p key={i}>{line}</p>))}
                </div>

            </div>
        </div>
    </>
    )
}