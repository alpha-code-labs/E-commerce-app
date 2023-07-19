import { useEffect, useState } from 'react'
import icon_notification from '../../assets/notification.svg'

export default function Notifications(){

    const [showNotifications, setShowNotifications] = useState(false)
    const [newNotifications, setNewNotifications] = useState(0)

    const notifications = [
        {'type': 'Product Update', 'message':'New collection of Nike shoes added'},
        {'type': 'Order Placed', 'message':'The wait is Over! Buy the new iPhone-15 here'},
        {'type': 'Product Update', 'message':'New collection of Nike shoes added'},
    ]


    useEffect(()=>{
        setNewNotifications(3)
    }, [])

    const handleNotifications = ()=>{
        if(!showNotifications) 
            setNewNotifications(0)
        
        setShowNotifications(!showNotifications)
         
        // may need to implement deleting notifications
    }


    return(<>
        <div className="relative">
            <div className="relative w-[38px] h-[38px] cursor-pointer" onClick={handleNotifications}>
                <img src={icon_notification} alt='notification_icon' />
                {newNotifications!=0 && <div className="absolute bg-red-500 rounded-full text-sm text-white px-[4px] top-0 right-0">{newNotifications}</div>}
            </div>
            { showNotifications &&
                <div className='absolute w-[250px] h-[400px] bg-gray-50 z-10 right-[-81px] p-1'>
                    <div className='w-full h-max-[80px] border shadow p-1'>
                        <div className='text-sm font-semibold'>title</div>
                        <div className='text-sm'>
                        New collection of Nike shoes added
                        </div>
                    </div>
                </div>
            }
        </div>
       {showNotifications && <div className='overlay h-[100vh] w-[100vw] absolute top-0 left-0 z-[5]' onClick={()=>setShowNotifications(false)}/>}
    </>)
}