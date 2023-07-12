import {useState, useEffect} from 'react'
import axios from 'axios'
import Loading from '../common/Loading'

export default function Orders(props){
    
    const userId = props.userId
    const [loading, setLoading] = useState(true)
    const [orderData, setOrderData] = useState(null)
    const url = `http://localhost:8000/profile/orders2/getAllOrders/${userId}`
    

    useEffect(()=>{
        axios.get(url).then(response => {
            setOrderData(response.data)
            console.log('order', response.data)
            setLoading(false)
        })
    },[])


    return(
        <>
            <div className='flex flex-col gap-4 ml-32 items-center'>
                {!loading && orderData &&
                    <div className='flex flex-col'>
                        <div className='flex'>
                            <div className='w-[140px]'>Order Status</div>
                            <div className=''>{orderData.orderStatus}</div>
                        </div>
                        <div className='flex'>
                            <div className='w-[140px]'>Payment</div>
                            <div className=''>{orderData.paymentStatus}</div>
                        </div>
                        <div className='flex'>
                            <div className='w-[140px]'>Shipping Address</div>
                            <div className=''>{orderData.shippingAddress}</div>
                        </div>
                        <div className='flex'>
                            <div className='w-[140px]'>Contact Number</div>
                            <div className=''>{orderData.contactNumber}</div>
                        </div>
                        <div className='flex'>
                            <div className='w-[140px]'>Contact Email</div>
                            <div className=''>{orderData.email}</div>
                        </div>
                        <div className='flex'>
                            <div className='w-[140px]'>Additional Notes</div>
                            <div className=''>{orderData.additionalNotes}</div>
                        </div>
                    </div>    
                }
            </div>
        </>
    )
}