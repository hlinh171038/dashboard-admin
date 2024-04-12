"use client"

import React, { useCallback, useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'sonner';
import { FaRegSquare } from 'react-icons/fa';
import { FaRegSquareCheck } from 'react-icons/fa6';
import axios from 'axios';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface ContactUsProps {
    //currentUser: any
    email:string;
    name:string;
    user:User[] | any;
    currentUser: any
}

export const FormMail:React.FC<ContactUsProps> = ({
    //currentUser
    email,
    name,
    user = [],
    currentUser
}) => {
  const form:any = useRef();
  const [statusName,setStatusName] = useState(false)
  const [textName,setTextName] = useState(currentUser ?currentUser?.user.name : '')
  const [statusEmail,setStatusEmail] = useState(false)
  const [textEmail,setTextEmail] = useState(currentUser ?currentUser?.user.email : '')
  const [check,setCheck] = useState(false)
  const [textMessage,setTextMessage] = useState('')
  const [isLoading,setIsLoading] = useState(false)
  const [userId,setUserId] = useState<any>(null)

  const router = useRouter()

 // handle check
 const handleCheck = useCallback(()=>{
    setCheck(!check)
 },[check])

  const sendEmail = (e:any) => {
    if(!currentUser){
      toast.warning('Loggin !!');

      return 
    }
    e.preventDefault();
    if(check === false){
        toast.warning('Do you argree to send direct to lead team ?')
        return;
    }
    axios.post('/api/add-new-email',{
      userId: userId.id,
      mailSend:textEmail,
      mailRecive:'hoanglinh@gmail.com',
      userName: textName,
      userImage: currentUser? currentUser?.user.image : null ,
      content: textName,
      seen: false,
      role:userId.role
    })
    .then((res:any)=>{
       // toast.success(`sended to team lead`)
      router.refresh();
    })
    .catch((err:any)=>{
     toast.error('Something went wrong !!!')
    })
    .finally(()=>{
        setIsLoading(false)
    })

    axios.post('/api/add-new-tempEmail',{
      userId: userId.id,
      mailSend:textEmail,
      mailRecive:'hoanglinh@gmail.com',
      userName: textName,
      userImage: currentUser? currentUser?.user.image : null ,
      content: textName,
      seen: false,
      history:false
    })
    .then((res:any)=>{
      router.refresh();
      //toast.success("Sended to team lead.")
    })
    .catch((err:any)=>{
      toast.error("Something went wrong !!!")

    })
    .finally(()=>{
      setIsLoading(false);
    })

    // create history
    axios.post('/api/create-new-history',{
      userId:userId.id,
      title:textEmail,
      type: 'reported to team lead',
      
    })
    .then((res)=>{
        
       // toast.success('check your mail');
        router.refresh();
    })
    .catch((err:any)=>{
        toast.error("Something went wrong !!!")
    }).
    finally(()=>{
        setIsLoading(false)
    })
    emailjs
      .sendForm('service_edpq52f', 'template_rsm7k1f', form.current, {
        publicKey: 'TS-u5iOD3yffcZ1CJ',
      })
      .then(
        () => {
            toast.success('send email success')
            setTextMessage('');
        
        },
        (error) => {
            toast.error('some thing went wrong !!!')
       
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

  useEffect(()=>{
    user && user.forEach((item:any)=>{
        if(item.email === 'hoanglinh@gmail.com') {
          setUserId(item)
        }
    })
  },[currentUser?.user.email,user])

  return (
    <div className='text-[15px] text-neutral-100  pb-4 rounded-md'>
        
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