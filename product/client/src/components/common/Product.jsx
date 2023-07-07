import { useEffect } from 'react'
import product_image from '../../assets/cranberry.jpg'

export default function Product(props){

    const data = props.productData

    const productName = data.name
    const productPrice = data.price
    const productDescription = data.description
    const productImageUrl = data.image


    useEffect(()=>{
        console.log('product component data', data)
    },[])


    return(
    <>
        <div className="item_container flex-col w-[240px] grow-0 drop-shadow-lg">
            <div className="item_image w-[240px] h-[200px] box-border p-2 justify-center bg-slate-50">
                <img className='m-auto h-[185px]' src={productImageUrl}></img>
            </div>
            <div className="name text-base">{productName}</div>
            <div className="price">
                &#8377; {productPrice}
            </div>
            <div className="description truncate">{productDescription}</div>
            </div>
    </>
    )
}