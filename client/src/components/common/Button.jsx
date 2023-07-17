export default function Button(props){
    const onClick= props.onClick
    const buttonText = props.buttonText
    const type = props.type

    const roundClassName = 'p-1 bg-blue-500 w-[40px] h-[40px] cursor-pointer rounded-full text-white text-center'
    const simpleClassName = 'p-3 bg-blue-500 font-semibold text-xl cursor-pointer rounded-sm text-white text-center'


    return (
      <div onClick={onClick} className={ type == 'rounded' ? roundClassName : simpleClassName}>
        {buttonText}
      </div>
    )

}