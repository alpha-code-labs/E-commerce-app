import Button from "./common/Button"
import Wishlist from "./wishlist/Wishlist"
import Cart from "./cart/Cart"
import {useEffect, useState} from 'react'
import Orders from "./orders/Orders"
export default function Profile(props){
    
    const username = 'Username' //update with props or something
    const address = 'Rider House, Sector-44, Gurugram Haryana'
    const [showWishlist, setShowWishlist] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [showOrders, setShowOrders] = useState(false)
    const [ordersId, setOrdersId] = useState('')


    useEffect(()=>{
        console.log('orderId changed..', ordersId)
        if(ordersId!='')
            localStorage.setItem('orderId', JSON.stringify(ordersId))
    },[ordersId])

    useEffect(()=>{
        const id = localStorage.getItem('orderId')
        console.log('id', id)
        console.log('order_id', ordersId)
        if(id && ordersId===''){
            setOrdersId(id)
        }
    },[])

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
        <div className="topbar w-full py-6 px-10 flex justify-between item-end shadow">
                <div className=''/>
                <div className="flex space-x-6 align-middle">
                <p className="align-middle text-base pt-1.5">{username}</p>
                <Button buttonText='Logout' onClick={logout} />
                </div>
        </div>

        <div className="wrapper w-full h-[calc(100vh-90px)] flex flex-row">
            <div className="w-[170px] bg-grey-50">
                <div className="flex-col p-4 flex gap-2">
                        
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
                    {showWishlist && <Wishlist/>}
                    {showCart && <Cart setOrdersId = {setOrdersId} />}
                    {showOrders && <Orders ordersId = {ordersId} />}
                </div>
            </div>
            <div className="w-[180px] bg-sky-200 pr-5 pt-4">
                <div className="address w-full h-[140px] shadow rounded-md ml-4 mt-4 px-4 py-2 text-sm">
                    <p className="text-sm font-bold">Address:</p>
                    {address.split(',').map((line,i)=>(<p key={i}>{line}</p>))}
                </div>

            </div>
        </div>
    </>
    )
}