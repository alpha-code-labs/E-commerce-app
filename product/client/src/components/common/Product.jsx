import { useEffect } from 'react'
import product_image from '../../assets/cranberry.jpg'

export default function Product(props){

    const data = props.productData

    const productName = data.name
    const productPrice = data.price
    const productDescription = data.description
    const productImageUrl = data.image
    const setProductId = props.setProductId
    const setShowProductDetails = props.setShowProductDetails

    const handleProductClick = ()=>{
        console.log('lets handle')
        setShowProductDetails(true)
        setProductId(data._id)
        console.log(data._id)
    }

    return(
    <>
        <div className="item_container flex-col w-[240px] grow-0 drop-shadow-lg cursor-pointer" onClick={handleProductClick}>
            <div className="item_image w-[240px] h-[200px] box-border p-2 justify-center bg-slate-50">
                <img className='w-full h-full object-cover' src={productImageUrl}></img>
            </div>
            <div className="name text-base whitespace-nowrap truncate">{productName}</div>
            <div className="price">
                &#8377; {productPrice}
            </div>
            <div className="description truncate">{productDescription}</div>
            </div>
    </>
    )
}