import Button from "./common/Button";

export default function Profile(props){
    
    const username = 'Username' //update with props or something
    const address = 'Rider House, Sector-44, Gurugram Haryana'

    //Logout onClick method
    const logout = (e)=>{
    }

    //Wishlist onClick method
    const onWishlistClick = (e)=>{
    }

    //Cart onClick method
    const onCartClick = (e)=>{
    }

    //Orders onClic method
    const onOrdersClick = (e)=>{
    }

    return(
    <>
        <div className="outer_wrapper w-full flex flex-col">
            <div className="topbar w-full py-6 px-10 flex justify-between item-end shadow">
                <div className=''/>
                <div className="flex space-x-6 align-middle">
                <p className="align-middle text-base pt-1.5">{username}</p>
                <Button buttonText='Logout' onClick={logout} />
                </div>
            </div>
            
            <div className="profile_section w-full ">
                <div className="address w-1/3 h-[100px] shadow rounded-md ml-4 mt-4 px-4 py-2 text-sm">
                    <p className="text-sm font-bold">Address:</p>
                    {address.split(',').map((line,i)=>(<p key={i}>{line}</p>))}
                </div>

                <div className="other_section w-full h-full mt-4 px-4 shadow-inner">
                    <div className="max-w-sm h-100px flex space-x-2">
                        <Button buttonText='Wishlist' onClick={onWishlistClick}/>
                        <Button buttonText='Cart' onClick={onCartClick}/>
                        <Button buttonText='Orders' onClick={onOrdersClick}/>
                    </div>
                </div>
            </div>

            
        </div>
    </>
    )
}