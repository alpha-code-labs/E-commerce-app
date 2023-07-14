import { useState, useEffect } from "react"
import Button from "./common/button"
import Customize from "./customize"
import axios from "axios"
import { camelCaseToTitle } from "../utils/camelCaseToTitle"

export default function GroupSelection(props){
    const [groups, setGroups] = useState(null)
    const setSetupSuccessful = props.setSetupSuccessful
    const [customize, setCustomize] = useState(false)
    

    const dummyGroups = ["Department", "EmployeeId", "Grade", "designation"]

    
    
    const createGroupUrl = 'http://localhost:9001/groups/default-group'
    const getGroupUrl = `http://localhost:9001/hrdata/employee/headers`

    useEffect(()=>{
        console.log('inside useEffect')

            axios.post(createGroupUrl).then(
                
                axios.get(getGroupUrl).then(response=>{
                    const groups = response.data.headers
                    groups.shift()
                    groups.pop()

                    setGroups(groups)
                    console.log(response.data, 'response from server')

               })
                
            )
    },[getGroupUrl])
    
    return(
        <>
             <div className="mx-auto w-[300px] h-[400px] max-w-[550px] bg-white text-left relative">
               { !customize &&
                <>
                {groups && <p className="m-4">We have Identified these Groups. <br/> Are these correct?</p>}
                <hr/>
                <div className="w-full p-4 space-y-2">
                    {groups && groups.map((group,index)=>{
                        return(
                            <>
                            <div className="flex gap-5 w-full text-left">
                                <p className="text-base w-2/3" >{camelCaseToTitle(group)}</p>
                                <input className="w-[20px] h-[20px]"  key={index} defaultChecked={true} type="checkbox" />
                            </div>
                            </>
                        )
                    })}
                </div>

                <div className="flex w-full bottom-0 gap-2 p-4 absolute">
                    <Button buttonText='Yes' onClick={()=>setSetupSuccessful(true)} />
                    <Button buttonText='Customize' onClick={()=>(setCustomize(true))} />
                </div>
                </>
                }


                {customize && <Customize setSetupSuccessful={setSetupSuccessful} />}

            </div>
        </>
    )
}