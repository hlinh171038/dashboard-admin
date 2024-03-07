"use client"

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

interface ContactUsProps {
    currentUser: any
}

export const ContactUs:React.FC<ContactUsProps> = ({
    currentUser
}) => {
  const form:any = useRef();

  console.log(currentUser)

  const sendEmail = (e:any) => {
    e.preventDefault();

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
        <div className='flex flex-col gap-0.5'>
            <label className='text-[14px]'>Name </label>
            <input 
                type="text" 
                name="user_name"
                value={currentUser.user.name}
                required
                disabled
                className='rounded-md outline-none text-neutral-100 bg-slate-900/60 px-2 py-1 text-[14px]'
                placeholder='your name'
                />
        </div>
        <div className='flex flex-col gap-0.5'>
            <label className='text-[14px]'>Email </label>
            <input 
                type="email" 
                required
                disabled
                value={currentUser.user.email}
                name="user_email"
                className='rounded-md outline-none text-neutral-100 bg-slate-900/60  px-2 py-1 text-[14px]'
                placeholder='your email'
                />
        </div>
        <div className='flex flex-col gap-0.5'>
            <label className='text-[14px]'>Message </label>
            <textarea 
                required
                name="message" 
                placeholder='message'
                className='rounded-md outline-none text-neutral-100 bg-slate-900/60  px-2 py-1 text-[14px]'
                />
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