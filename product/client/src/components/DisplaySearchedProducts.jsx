import Product from './common/Product'

export default function DisplaySearchedProducts(props){
    const products = props.products
    console.log(products)

    return(
    <>
        <div className="flex flex-wrap gap-6 p-4 ">
            {products.map(product=> <Product productData={product}/>)}
        </div>
    </>
    )
    
}