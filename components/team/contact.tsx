"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';
import axios from 'axios';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FaRegSquareCheck } from 'react-icons/fa6';
import { FaRegSquare } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ContactUsProps {
    currentUser: any
    users: User[] | any
}

export const ContactUs:React.FC<ContactUsProps> = ({
    currentUser,
    users
}) => {
  const form:any = useRef();
  const router = useRouter();

  const [userId,setUserId] = useState<any>([])
  const [check,setCheck] = useState(false)
  const [isLoading,setIsLoading] = useState(false)

  console.log(currentUser)
  console.log('try')

  const sendEmail = (e:any) => {
    if(check === false) {
      toast.warning(`click check if you want send to team lead.`);
      return;
  }
  setIsLoading(true)

    e.preventDefault();
    axios.post('/api/add-new-email',{
      userId: userId[0].id,
      mailSend:currentUser.user.email,
      mailRecive:'hoanglinh171038@gmail.com'
    })
    .then((res:any)=>{
      router.refresh();
      toast.success("Sended to team lead.")
    })
    .catch((err:any)=>{
      toast.error("Something went wrong !!!")

    })
    .finally(()=>{
      setIsLoading(false);
    })
    
    emailjs
      .sendForm('service_edpq52f', 'template_rsm7k1f', form.current, {
        publicKey: 'TS-u5iOD3yffcZ1CJ',
      })
      .then(
        () => {
            toast.success('send email success')
          console.log('SUCCESS!');
        },
        (error) => {
            toast.error('some thing went wrong !!!')
          console.log('FAILED...', error.text);
        },
      );
     
  };

  useEffect(()=>{

    if(!currentUser) {
      toast.warning('Login to send email!!!');
      return;
    }
    const result = users && users.filter((item:any)=>item.email === currentUser.user.email);
    console.log(result)
    setUserId(result)
  },[currentUser,users])
   //handle check
   const handleCheck = useCallback(()=>{
    setCheck(!check)
 },[check])
  return (
    <div className='text-[15px] text-slate-700 px-2 py-4 rounded-md'>
        <div className='font-bold'>
            White me a Message
        </div>
        <form 
        ref={form} 
        onSubmit={sendEmail}
        className='flex  flex-col gap-2'
        >
        <div className='flex items-center justify-start gap-2'>
            <div>Username:</div>
            <div>{currentUser.user.name}</div>
           
        </div>
        <div className='flex items-center justify-start gap-2'>
            <div>Email:</div>
            <div>{currentUser.user.email}</div>
           
        </div>
        <div className='flex flex-col gap-0.5'>
            <label className='text-[14px]'>Message </label>
            <textarea 
                required
                name="message" 
                placeholder='message'
                className='rounded-md outline-none border border-slate-900  px-2 py-1 text-[14px] '
                />
        </div>
        <div className="flex items-center justify-start gap-2">
            {!check ?(
                <FaRegSquare
                    className="w-4 h-4  font-thin"
                    onClick={handleCheck}
                    />
            ):(
                <FaRegSquareCheck 
                    className="w-4 h-4 "
                    onClick={handleCheck}
                    />
            )}
            <div className='text[13px] font-thin '>
                {`send direct to team lead`}
            </div>
        </div>
        
        <button
          className='bg-slate-900 hover:bg-slate-800 duration-300 transition-all rounded-md px-2 py-1 text-neutral-100 w-full flex items-center justify-center gap-2'
          disabled = {isLoading}
        >
          <input 
            type="submit" 
            value="Send"
            
            />
             {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
        </button>
        </form>
    </div>
  );
};