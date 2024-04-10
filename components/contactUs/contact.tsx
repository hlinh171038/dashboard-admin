"use client"
import { RiMailSendLine } from "react-icons/ri";
import { ContactUs } from "../team/contact";
import { FormMail } from "./form-mail";

import { FaRegSquareCheck } from "react-icons/fa6";
import { ImCheckboxUnchecked } from "react-icons/im";
import { FaRegSquare } from "react-icons/fa6";
import { useCallback, useEffect, useState } from "react";
import { User } from "@prisma/client";

interface ContactProps {
    currentUser: any;
    user : User[] | any
}

const Contact:React.FC<ContactProps> =({
    currentUser,
    user =[]
}) =>{
    const [currentCheck,setCurrentCehck] = useState(false)
    const [otherCheck,setOtherCheck] = useState(false)
    const [data,setData] = useState({
        email: '',
        name: ''
    })

    const handleCurrentCheck = useCallback(() =>{
        setCurrentCehck(!currentCheck)
        setOtherCheck(false)
        if(!currentUser) {
            return null;
        }
        setData(currentUser.user)
    },[currentCheck,currentUser])

    //handle orther check
    const handleOtherCheck = useCallback(()=>{
        setOtherCheck(!otherCheck)
        setCurrentCehck(false)
        const obj ={
            email: '',
            name: ''
        }
        setData(obj)
    },[otherCheck])
  

    useEffect(()=>{
        setOtherCheck(false)
        setCurrentCehck(true)
        setData(currentUser.user)
    },[currentUser])
    return (
        <div className="grid grid-cols-3 items-start justify-start gap-2 bg-slate-600 rounded-md p-2">
            <div className="h-full ">
                <div className="col-span-1 flex items-center justify-start">
                    <RiMailSendLine className="w-6 h-6 " />
                    <div>Send me message</div>
                </div>
                <div className="font-thin text-[14px] text-neutral-400 flex flex-col  justify-between  h-[90%] mt-4 pb-4">
                    <div>
                        <div>1. Do you have any problem ?</div>
                        <div>2. some feature are trouble ?</div>
                        <div>3. Connect for more information</div>
                    </div>
                    <div>
                        <div className="flex items-center justify-start gap-2">
                            {!currentCheck ?(
                                <FaRegSquare 
                                    className="w-4 h-4 text-neutral-100 font-thin"
                                    onClick={handleCurrentCheck}
                                    />
                            ):(
                                <FaRegSquareCheck 
                                    className="w-4 h-4 text-neutral-100"
                                    onClick={handleCurrentCheck}
                                    />
                            )}
                            <div>
                                use the current user
                            </div>
                        </div>
                        {/* orther user */}
                        <div className="flex items-center justify-start gap-2">
                            {!otherCheck ?(
                                <FaRegSquare 
                                    className="w-4 h-4 text-neutral-100 font-thin"
                                    onClick={handleOtherCheck}
                                    />
                            ):(
                                <FaRegSquareCheck 
                                    className="w-4 h-4 text-neutral-100"
                                    onClick={handleOtherCheck}
                                    />
                            )}
                            <div>
                                use the orther user
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-span-2 w-full">
             <FormMail 
                email={data.email}
                name ={data.name}
                currentUser ={currentUser}
                user ={user}
             />
            </div>
        </div>
    )
}

export default Contact