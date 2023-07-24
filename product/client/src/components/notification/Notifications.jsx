import { useEffect, useState } from 'react'
import icon_notification from '../../assets/notification.svg'
import icon_notification_filled from '../../assets/notification_filled.svg'
import axios from 'axios'
import _URL from '../../connectionStrings'

import NotificationItem from './NotificationItem'

export default function Notifications(props){

    const userData = props.userData || {email:'ajayaxes318@gmail.com'}
    
    const [showNotifications, setShowNotifications] = useState(false)
    const [newNotifications, setNewNotifications] = useState(0)

    const [notifications, setNotifications] = useState(null)
    const [prevCount, setPrevCount] = useState(0)

    /*
    const notifications2 = [
        {'type': 'Product Update', 'message':'New collection of Nike shoes added'},
        {'type': 'Product Update', 'message':'The wait is Over! Buy the new iPhone-15 here'},
        {'type': 'Order Placed', 'message':'Skullcandy Blue Earphones M33500'},
    ]
*/

    /* [
    {email:'', message:'', title:'' }
    ] */






    const url = `${_URL.notifications}/${userData.userId}`
    const [nCount, setNCount] = useState(0)

    useEffect(()=>{

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
            setNCount(response.data.length)
            console.log(nCount, 'ncount')
            setNotifications(response.data)

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();

    

    // Fetch data every 5 seconds using setInterval
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);

  }, [])


  useEffect(()=>{
    setNewNotifications(nCount-prevCount)
    console.log('this ran')
  },[nCount])


    const handleNotifications = ()=>{
        if(!showNotifications) {
            setPrevCount(newNotifications)
            setNewNotifications(0)
        }
        
        setShowNotifications(!showNotifications)
         
        // may need to implement deleting notifications
    }


    return(<>
        <div className="relative">
            <div className="relative w-[38px] h-[38px] cursor-pointer" onClick={handleNotifications}>
                <img src={showNotifications? icon_notification_filled : icon_notification} alt='notification_icon' />
                {newNotifications!=0 && <div className="absolute bg-red-500 rounded-full text-sm text-white px-[4px] top-0 right-0">{newNotifications}</div>}
            </div>
            { showNotifications &&
                <div className='absolute w-[350px] h-min-full bg-gray-200 z-10 right-[-81px] p-1 pt-2 space-y-2'>

                    {notifications && notifications.map((notification, Index)=>
                        <NotificationItem 
                            key = {Index}
                            title='Order Placed !!!'
                            message={notification} />)}
                </div>
            }
        </div>
       {showNotifications && <div className='overlay h-[100vh] w-[100vw] absolute top-0 left-0 z-[5]' onClick={()=>setShowNotifications(false)}/>}
    </>)
}