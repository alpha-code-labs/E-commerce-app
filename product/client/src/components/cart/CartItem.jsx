import delete_icon from '../../assets/delete.png'
import plus_icon from '../../assets/Plus.svg'
import minus_icon from '../../assets/Minus.svg'
import { useState } from 'react'
import axios from 'axios'

export default function CartItem(props){

    console.log('cart called')

    const userId = props.userId
    const deleteCartItem = props.deleteItem
    const productName = props.productName
    const productPrice = props.productPrice
    const productImage = props.productImage
    const productObjectId = props.productObjectId
    const [quantity, setQuantity] = useState(props.productQuantity)
    const setGrandTotal = props.setGrandTotal
    const grandTotal = props.grandTotal
    


    const decreaseQuantity = (itemId)=>{
        if(quantity===1){
            //either delete product from cart or just do nothing
        }
        else{
            //decrease by one
            const url = ` http://localhost:8000/profile/cart/updatequantity/${userId}/${itemId} `
            axios.put(url,{userId: userId, cartItemId: itemId, quantity: quantity-1}).then(()=>{
                setGrandTotal(grandTotal - productPrice)
                setQuantity(quantity-1)})
        }
    }

    const increaseQuantity = (itemId)=>{
        //increase by one
        const url = ` http://localhost:8000/profile/cart/updatequantity/${userId}/${itemId} `
        axios.put(url,{userId: userId, cartItemId: itemId, quantity: quantity+1}).then(()=>{
            setGrandTotal(grandTotal + productPrice)
            setQuantity(quantity+1)})        
    }


    return(
        <>
            <div className='flex flex-row gap-4'>
                <div>
                    <div className='item_wrapper flex border w-[384px] shadow-sm'>
                        <div className='product_wrapper flex'>
                            <div className='w-[60px] h-[60px] bg-sky-100' >
                                <img className='w-full h-full object-cover' src={productImage} />
                            </div>
                            <div className="flex w-[220px] flex-col px-4 py-2 ">
                                <div className="text-base whitespace-nowrap truncate">{productName}</div>
                                <div className="text-sm">
                                        &#8377; {productPrice}
                                </div>
                            </div>
                        </div>
                        <div className='flex box-border h-[60px] border-l pt-4 pl-4 '>
                        <div className="cart cursor-pointer" onClick={()=>decreaseQuantity(productObjectId)}>
                                <img className='w-[25px] h-[25px] mt-[2px]' src={minus_icon}/>
                        </div>
                        <div className="cart cursor-pointer" onClick={()=>increaseQuantity(productObjectId)}>
                                <img className='w-[25px] h-[25px] mr-1' src={plus_icon}/>
                        </div>
                            <div className="delete cursor-pointer" onClick={()=>{deleteCartItem(productObjectId)}}>
                                <img className='w-[20px] h-[25px]' src={delete_icon}/>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className='flex text-base text-center h-[60px] w-[40px] justify-center items-center'>
                    <p className='align-middle'>{quantity}</p>
                </div>

                <div className='flex text-base text-center h-[60px] w-[40px] justify-center items-center'>
                    <p className='align-middle'>{(quantity*productPrice)}</p>
                </div>
            </div>
        </>
    )
}