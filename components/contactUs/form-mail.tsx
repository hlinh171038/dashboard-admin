"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegSquareCheck } from 'react-icons/fa6';

interface ContactUsProps {
    //currentUser: any
    email:string;
    name:string
}

export const FormMail:React.FC<ContactUsProps> = ({
    //currentUser
    email,
    name
}) => {
  const form:any = useRef();
  const [statusName,setStatusName] = useState(false)
  const [textName,setTextName] = useState('')
  const [statusEmail,setStatusEmail] = useState(false)
  const [textEmail,setTextEmail] = useState('')
  const [check,setCheck] = useState(false)
  const [textMessage,setTextMessage] = useState('')

 // handle check
 const handleCheck = useCallback(()=>{
    setCheck(!check)
 },[check])

  const sendEmail = (e:any) => {
    e.preventDefault();
    if(check === false){
        toast.warning('Do you argree to send direct to lead team ?')
        return;
    }
   

    emailjs
      .sendForm('service_edpq52f', 'template_rsm7k1f', form.current, {
        publicKey: 'TS-u5iOD3yffcZ1CJ',
      })
      .then(
        () => {
            toast.success('send email success')
            setTextMessage('');
          console.log('SUCCESS!');
        },
        (error) => {
            toast.error('some thing went wrong !!!')
          console.log('FAILED...', error.text);
        },
      );
  };

  useEffect(()=>{
    setTextName(name)
    setTextEmail(email)
  },[name,email])
  useEffect(()=>{
    const result = name !==''? true:false
    const result2 = email!==''?true:false
    setStatusName(result)
    setStatusEmail(result2)
  },[name,email])

  console.log(textName)
  return (
    <div className='text-[15px] text-neutral-100 px-2 py-4 rounded-md'>
        
        <form 
        ref={form} 
        onSubmit={sendEmail}
        className='flex  flex-col gap-2'
        >
        <div className='flex flex-col gap-0.5'>
            <label className='text-[14px]'>Name </label>
            <input 
                type="text" 
                name="user_name"
                value={textName}
                required
                disabled={statusName}
                className='rounded-md outline-none text-neutral-100 bg-slate-500/40 px-2 py-1 text-[14px]'
                placeholder='your name'
                onChange={(e)=>setTextName(e.target.value)}
                />
        </div>
        <div className='flex flex-col gap-0.5'>
            <label className='text-[14px]'>Email </label>
            <input 
                type="email" 
                required
                disabled={statusEmail}
                value={textEmail}
                name="user_email"
                className='rounded-md outline-none text-neutral-100 bg-slate-500/40  px-2 py-1 text-[14px]'
                placeholder='your email'
                onChange={(e)=>setTextEmail(e.target.value)}
                />
        </div>
        <div className='flex flex-col gap-0.5'>
            <label className='text-[14px]'>Message </label>
            <textarea 
                required
                name="message" 
                value={textMessage}
                placeholder='message'
                className='rounded-md outline-none text-neutral-100 bg-slate-500/40  px-2 py-1 text-[14px] min-h-40'
                onChange={(e)=>setTextMessage(e.target.value)}
                />
        </div>
        <div className="flex items-center justify-start gap-2">
            {!check ?(
                <FaRegSquare 
                    className="w-4 h-4 text-neutral-100 font-thin"
                    onClick={handleCheck}
                    />
            ):(
                <FaRegSquareCheck 
                    className="w-4 h-4 text-neutral-100"
                    onClick={handleCheck}
                    />
            )}
            <div className='text[14px] font-thin text-neutral-400'>
                send direct to team lead.
            </div>
        </div>
        <input 
            type="submit" 
            value="Send"
            className='bg-slate-900 hover:bg-slate-800 duration-300 transition-all rounded-md px-2 py-1 text-neutral-100 w-full'
            />
        </form>
    </div>
  );
};