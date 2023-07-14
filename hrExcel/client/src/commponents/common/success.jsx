import icon_success from '../../assets/success.gif'

export default function Success(){
    return(
        <>
        <div className='flex-col relative text-center'>
            <p className='absolute w-full mt-4 text-xl text-center'>Group setup successful !</p>
            <img src={icon_success} />
        </div>
        
        </>)
}