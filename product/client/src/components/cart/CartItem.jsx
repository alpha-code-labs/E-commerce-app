import delete_icon from '../../assets/delete.png'

export default function CartItem(props){

    console.log('cart called')

    const deleteCartItem = props.deleteItem
    const productName = props.productName
    const productPrice = props.productPrice

    return(
        <>
            <div className='item_wrapper flex border w-[340px] shadow-sm'>
                    <div className='product_wrapper flex'>
                        <div className='w-[60px] h-[60px] bg-sky-100' ></div>
                        <div className="flex w-[220px] flex-col px-4 py-2 ">
                            <div className="text-base">{productName}</div>
                            <div className="text-sm">
                                    &#8377; {productPrice}
                            </div>
                        </div>
                    </div>
                    <div className='flex box-border h-[60px] border-l pt-4 pl-4 '>
                        <div className="delete cursor-pointer" onClick={deleteCartItem}>
                            <img className='w-[20px] h-[25px]' src={delete_icon}/>
                        </div>
                    </div>
                </div>
        </>
    )
}