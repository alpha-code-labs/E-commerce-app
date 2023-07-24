export default function Button(props){
    const buttonText = props.buttonText
    const onclick = props.onClick

    return(
        <div onClick={onclick} className='w-1/2 h-[40px] bg-blue-500 rounded-sm text-center p-2 text-white cursor-pointer hover:bg-blue-500 focus:active:bg-blue-300'>
            <p>{buttonText}</p>
        </div>
    )
}