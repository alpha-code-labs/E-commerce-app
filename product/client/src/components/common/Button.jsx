export default function Button(props){

    return(
    <>
        <div 
            onClick={props.onClick}
            className="text-text-gray-600 text-center whitespace-nowrap py-2 hover:cursor-pointer px-4 rounded text-white bg-gradient-to-tr from-blue-500 to-teal-200 hover:shadow-lg">
            {props.buttonText}
        </div>
    </>
    )
}