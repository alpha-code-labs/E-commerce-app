import product_image from '../../assets/cranberry.jpg'

export default function Product(props){

    const data = props.productData

    //temporary arrangement
    const [name, imageSrc, price, description] = ['Cranberr', product_image, 499, 'This says something nice about the product']

    return(
    <>
        <div className="item_container flex-col w-[240px] grow-0 ">
            <div className="item_image w-[240px] h-[200px] box-border p-2 justify-center bg-slate-50">
                <img className='m-auto h-[185px]' src={imageSrc}></img>
            </div>
            <div className="name text-base">{name}</div>
            <div className="price">
                &#8377; {price}
            </div>
            <div className="description truncate">{description}</div>
            </div>
    </>
    )
}