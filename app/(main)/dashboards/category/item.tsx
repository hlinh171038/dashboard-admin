"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegSquareCheck } from 'react-icons/fa6';
import { MdOutlineKeyboardCommandKey } from 'react-icons/md';
import { TfiPencilAlt } from "react-icons/tfi";
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'sonner';

interface ItemCategoryProps {
    name: string;
    quantity: number;
    stt: number;
    check: boolean;
    id:string;
    handleOtherCheck: (id:string) =>void;
    currentUserInfor:any;
}

const ItemCategory:React.FC<ItemCategoryProps> = ({
    name,
    quantity,
    check,
    stt,
    id,
    handleOtherCheck,
    currentUserInfor
}) => {
    const [update,setUpdate] = useState<any>(false)
    const [isLoading,setIsLoading] = useState<any>(false) 
    const [text,setText] = useState<any>('')
    const router = useRouter()
    const input2Ref = useRef<any>(null);

    console.log(currentUserInfor)

    const handleUpdate = () =>{
        if(!currentUserInfor){
            toast.warning("SignIn to Updated");
            return;
        }
        if(currentUserInfor?.permission === 'read') {
            console.log('try2')
            toast.warning("Only create new user with exercute permission !!!");
            return;
        }
        //check text
        if(text === '') {
            toast.warning('Fill out !!!');
            return;
        } 
        setIsLoading(true)
        axios.post('/api/update-category',{id,content:text})
            .then((res:any)=>{
                console.log(res?.data);
                toast.success("updated.");
                router.refresh()
            })
            .catch((err:any)=>{
                toast.error(err?.response?.data?.error || 'some thing went wrong')
            }).finally(()=>{
                setIsLoading(false)
                setText('');
                setUpdate(false)
            })
    }
      //handle out side input
      const handleClickOutside = () => {
        toast.warning("cancel update category");
        setUpdate(false)
      };
      useEffect(()=>{
        if (update) {
            console.log(input2Ref)
            input2Ref.current.focus(); // Focus on input if opened
          }
      },[update])

  return (
    <tr>
        <td className='w-[5%]'>
        <div className="flex items-center justify-start ">
            {!check ?(
                <FaRegSquare
                    className="w-4 h-4 text-neutral-100 font-thin"
                    onClick={()=>handleOtherCheck(id)}
                    />
            ):(
                <FaRegSquareCheck 
                    className="w-4 h-4 text-neutral-100"
                    onClick={()=>handleOtherCheck(id)}
                    />
            )}
            
        </div>
        </td>
        <td className='w-[5%] px-2 py-1'>{stt && stt<10 && stt>0 ? `0${stt}`: stt}</td>
        <td className='w-[60%] px-2 py-1'>{update ? (
            <div className='relative w-full '>
                 <input 
                         ref={input2Ref}
                        type="text" 
                        value={text} 
                        onChange={(e:any)=>setText(e.target.value)} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleUpdate() // Call the function on Enter press
                            }
                          }}
                        className="w-full rounded-md px-2 py-1 bg-slate-500/50 text-[14px] text-neutral-100 outline-none pr-20" 
                />
                {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 absolute top-[0.2rem] right-2"/>:(
                     <OutsideClickHandler onOutsideClick={handleClickOutside}>
                    <div>
                        <div className="absolute top-[0.2rem] right-[4.6rem] text-neutral-400 text-[14px] flex items-center justify-start gap-1 ">
                                    <MdOutlineKeyboardCommandKey className="w-4 h-4 " /> 
                                    <span>Enter |</span>
                                </div>
                            <div 
                                onClick={handleUpdate}
                                className="absolute top-0 right-2 underline px-2 py-1 rounded-md hover:opacity-[0.7] text-neutral-100 hover:text-white text-[14px] cursor-pointer"
                            >Update 
                            </div>
                    </div>
                    </OutsideClickHandler>
                )}
                        
                    </div>
                ): name}
        </td>
        <td className='w-[20%] px-4'>{quantity && quantity<10 && quantity>0 ? `0${quantity}`: quantity}</td>
        <td className='w-[10%]'>
            <TfiPencilAlt onClick={() => setUpdate(!update)} className='w-4 h-4 text-neutral-400 text-[14px] hover:text-neutral-100 cursor-pointer'/>
        </td>
   </tr>
  )
}

export default ItemCategory
