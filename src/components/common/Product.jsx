import product_image from '../../assets/cranberry.jpg'

export default function Product(props){
    return(
    <>
        <div className="item_container flex-col w-[240px] grow-0 ">
            <div className="item_image w-[240px] h-[200px] box-border p-2 justify-center bg-slate-50">
                <img className='m-auto h-[185px]' src={product_image}></img>
            </div>
            <div className="name text-base">Cranberry</div>
            <div className="price">
                &#8377; 499
            </div>
            <div className="description truncate">This says something nice about the product</div>
            </div>
    </>
    )
}