import Product from './common/Product'

export default function DisplaySearchedProducts(props){
    const products = props.products
    const setShowProductDetails = props.setShowProductDetails
    console.log(products)

    return(
    <>
        <div className="flex flex-wrap gap-6 p-4 ">
            {products.map(product=> <Product 
                setShowProductDetails={setShowProductDetails}
                productData={product}/>)}
        </div>
    </>
    )
}