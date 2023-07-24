import Button from "./common/button";

export default function Customize(props){
    const setSetupSuccessful = props.setSetupSuccessful

    return(<>
    <div className="p-4 mx-auto">
        <>
        <input className="w-full border rounded h-[40px] p-2 border-gray-800 mb-10" placeholder="Group" type='text'></input>
        <Button buttonText='Done' onClick={()=>setSetupSuccessful(true)}/>
        </>
    </div>
    </>)
}