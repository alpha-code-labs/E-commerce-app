import Product from './Product'
import {titleCase} from '../../utils/titleCase'

export default function DisplayGroup(props){

    const groupData = props.groupData
    const category = groupData.category 
    const products = groupData.products
    const setShowProductDetails = props.setShowProductDetails
    const setProductId = props.setProductId

    return(
    <>
    <div className="outer_wrapper box-border p-2 w-full h-[360px] mt-6 bg-white drop-shadow-md">
        <div className="groupCategory mb-4 text-2xl bg-gradient-to-tr from-indigo-600 to-teal-200 bg-clip-text text-transparent hover:cursor-pointer">{titleCase(category)}</div>
        <div className='group_container w-full h-[300px] flex flex-row space-x-4 overflow-x-scroll overflow-y-hiddden pl-2'>
            {products.map((product, i)=><Product 
                key={i}
                setShowProductDetails={setShowProductDetails}
                setProductId={setProductId} 
                productData={product} />)}        
        </div>
        </div>
    </>
    )
}