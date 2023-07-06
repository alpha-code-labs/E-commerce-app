import Product from './Product'
import {titleCase} from '../../utils/titleCase'

export default function DisplayGroup(props){

    const groupData = props.groupData
    const category = groupData.category 
   const products = [1,2,3,4,5,7,8,9,10]

    return(
    <>
    <div className="outer_wrapper box-border p-2 w-full h-[360px] mt-6 bg-white">
        <div className="groupCategory text-3xl mb-4">{titleCase(category)}</div>
        <div className='group_container w-full h-[300px] flex flex-row space-x-2 overflow-x-scroll overflow-y-hiddden pl-2'>
            {products.map(product=><Product productData={product} />)}        
        </div>
        </div>
    </>
    )
}