import {useState, useEffect} from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import Button from '../common/Button'
import Loading from '../common/Loading'

export default function Cart(props){
    
    const [products, setProducts] =  useState(null)
    const [loading, setLoading] = useState(true)
    const userId = props.userId
    const url = `http://localhost:8000/profile/cart/getcartitems/${userId}`
    const productUrl = `http://localhost:8000/inventory/api/product/`
    const [cartId, setCartId] = useState(null)
    const [grandTotal, setGrandTotal] = useState(0)
    const [orderPlaced, setOrderPlaced] = useState(false)

    const fetchProducts=()=>{
        axios.get(url).then(response=>{ 
            setLoading(true)
            let fetchedProducts = []
            let promises = []
            let total = 0
            
            if(response.data[0].items.length > 0){
                response.data[0].items.forEach(item=>{
                    promises.push(axios.get(productUrl+item.product).then(productItem=>{
                            fetchedProducts.push({productData:productItem.data, productObjectId:item._id, productQuantity:item.quantity})
                            total+= productItem.data.price*item.quantity
                        }))
                })

                Promise.all(promises).then(()=>{
                    setProducts(fetchedProducts)
                    setLoading(false)
                    setCartId(response.data[0]._id)
                    setGrandTotal(total)
                    console.log(total)
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
    },[])



    const deleteCartItem = (itemId)=>{
        //remove item from Cart backend
        //once done refetch the products data and set Products state variable
        axios.delete(`http://localhost:8000/profile/cart/removecartitem/${userId}/${itemId}`).then(()=>{
            console.log('product deleted from Cart')    
            fetchProducts()
        })
    }

    const deleteCart = async ()=>{
        for(const item of products){
            const itemId = item.productObjectId
            await axios.delete(`http://localhost:8000/profile/cart/removecartitem/${userId}/${itemId}`)
        }

       console.log('Cart Deleted !')
    }

    const handleCheckout = ()=>{
        console.log(cartId)
        const url = `http://localhost:8000/profile/orders/createOrder`
        axios.post(url, {
            userId : userId,
            cartId: cartId,
            shippingAddress: "123 Main St, sector 34, gurugram",
            contactNumber: "993732718278",
            email: "sumesh@gmail.com",
            additionalNotes: "Give it to watchman"
        }).then((response)=>{
            console.log('ordersId', response.data.order._id)
            deleteCart()
            setOrderPlaced(true)
            setTimeout(()=>{
                setProducts(null)
                setOrderPlaced(false)
            }, 3000)
        })
    }




    return(
        <>
            <div className='flex flex-col gap-4 ml-32 items-center'>
                {!orderPlaced && !loading && products && 
                    <div className='flex flex-row gap-4 font-bold text-slate-700'>
                        <div className='w-[384px] text-base text-center'>Items</div>
                        <div className='text-base text-center w-[40px]'>Qty.</div>
                        <div className='text-base text-center w-[40px]'>Total</div>
                    </div>
                }
                {!orderPlaced && !loading && products && products.map(product=>{
                    
                    const data = product.productData
                    const productObjectId = product.productObjectId
                    const productQuantity = product.productQuantity

                    console.log(product)
                    return (<CartItem 
                        productName={data.name}
                        productPrice={data.price}
                        productImage={data.image}
                        productObjectId = {productObjectId}
                        productQuantity = {productQuantity}
                        userId = {userId}
                        deleteItem = {deleteCartItem}
                        setGrandTotal = {setGrandTotal}
                        grandTotal = {grandTotal}
                    />)
                })}

                {!orderPlaced && !loading && !products && <p className='text-xl'>There are no products in your cart..</p>}
                {!orderPlaced && !loading && products && <p className='text-base'>Grand Total : {grandTotal}</p>}
                {!orderPlaced && !loading && products && <div className='w-[300px] mt-5'>
                    <Button buttonText='Checkout' onClick={handleCheckout} />
                </div>}
                {orderPlaced && <p className='text-xl'>Order placed successfully!! <br/> Click on orders to track your orders..</p>}

                {loading && <Loading/>}
            </div>
        </>
    )
}