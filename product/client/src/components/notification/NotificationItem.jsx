import { useEffect, useState } from "react"
import axios from "axios"
import _URL from '../../connectionStrings'
import {motion} from 'framer-motion'


export default function NotificationItem(props){

    const title = props.title 
    const message = props.message
   // const type = props.type || 'order'
    
   // const [productData, setProductData] = useState(null)

   // const url = `${_URL.product}/${message}`

    const spring = {
        type: 'spring',
        damping: 10,
        stiffness: 100
    }


    /*
    useEffect(()=>{
        axios.get(url).then(res=>{
            setProductData(res.data)
           // console.log(res.data, 'product data from notification')
        })
    })

*/

    const handleClick = ()=>{
        //show orders page
    }


    return(<>
        <motion.div 
            initial={{transform:'scale(.2)', opacity:0}} 
            animate={{transform:'scale(1)', opacity:1}} transition={{duration:.2, spring}}
            className='w-full h-max-[80px] border shadow p-1 bg-white rounded text-gray-700' 
            onClick={handleClick}>
            <div className='text-sm font-semibold bg-gradient-to-tr from-indigo-600 to-teal-200 bg-clip-text text-transparent'>{title}</div>
                <div className='text-sm font-sans'>
                   {productData && message}

                </div>
            
        </motion.div>
    </>)

    /*
    
                { type && type==='newProduct' &&
                <div className='text-sm font-sans'>
                    {productData && productData.name}
                </div>
            }

    */
}