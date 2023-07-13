import DisplayGroup from "./common/DisplayGroup";

export default function DisplayDefaultPoducts(props){
    const products = props.products
    const setShowProductDetails = props.setShowProductDetails
    const setProductId = props.setProductId

    //extract all categories 
    const extractedCategories = products.map(product=>product.category.toLowerCase())
    
    //extract unique categories from extractedCategories
    const categories = new Set()
    extractedCategories.forEach(category => categories.add(category));

    //make seprate group of products based on categories. format-> array of {category:'category_name', products: [p1, p2,..]}

    let productGroups = []

    for(const category of categories){
        const categoryProducts = products.filter(product=> product.category.toLowerCase() === category)
        productGroups.push({category:category, products:categoryProducts})
    }



    return(
        <>
            <div className="w-full min-h-full pb-4 pl-4 mt-0 box-border">
                {productGroups.map((group, i)=><DisplayGroup 
                    key={i}
                    setShowProductDetails={setShowProductDetails}
                    setProductId={setProductId} 
                    groupData={group}/>)}
            </div>
        </>
    )


}
