import Input from '@/components/imputs/input'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { IoFingerPrintOutline } from 'react-icons/io5'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import randomString from 'randomstring'
import clsx from 'clsx';
import emailjs from '@emailjs/browser';
import { useDebounce } from 'use-debounce';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Step1 = () => {

    const form = useRef<any>();
    const [text,setText] = useState<any>('')
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const [query] = useDebounce(text, 300);
    const formSchema = z.object({
        email: z.string().email({message: "Wrong Email Format"}),
      })

    // const {
    //     register,
    //     handleSubmit,
    //     watch,
    //     formState: { errors },
    //   } = useForm<FieldValues>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         email: ""
    //     }
    //   })

    //   const email = watch('email');
    //   console.log(email)
      const handleSubmit = (e:any) => {
       e.preventDefault()
        setIsLoading(true)
        // check email exist or not
        axios.post('/api/forget-password-check',{email:text})
        
            .then((res:any)=>{
                console.log(res.data)
                toast.success('completed step 1')
                router.push('/forget-password?step=2')

                emailjs
                .sendForm('service_6w0ws6q', 'template_e6vvpy6', form.current , {
                  publicKey: 'TS-u5iOD3yffcZ1CJ',
                })
                .then(
                  () => {
                    console.log('SUCCESS!');
                  },
                  (error) => {
                    console.log('FAILED...', error.text);
                  },
                );
            })
            .catch((error:any)=>{
                console.log(error)
                toast.error(' Something went wrong !!')
            })
            .finally(()=>{
                setIsLoading(false)
            })

           
        //router.push('/forget-password?step=2')
      }

    
  return (
    <div className="px-4">
            {/* logo */}
            <div className="flex items-center justify-start gap-1 mt-8">
                <Image 
                    src="/logo.webp"
                    width={30}
                    height={30}
                    alt="logo"
                    className="aspect-square"
                />
                <div className="">
                    <div className="font-bold  text-[14px]" style={{color:'#5EC0B5'}}>Dashboard </div>
                    <div className="text-neutral-100 text-[12px] mt-[-4px]">Insight</div>
                </div>
            </div>
           {/* step 1 */}
           <div>
            {/* icon */}
            <div className='p-2 border border-neutral-100 rounded-md flex items-center justify-center w-10 h-10'>
                <IoFingerPrintOutline className='w-6 h-6 text-neutral-100'/>
            </div>
            <div className='text-neutral-100 text-[20px] '>Forget Password ?</div>
            <div className='text-[14px] text-neutral-400 font-thin'>Dont worries, we will send you reset instructions.</div>
            <div>
            <form ref={form} >
  
                <label>Email</label>
                <input type="email" 
                        name="user_email" 
                        onChange={(e)=> setText(e.target.value)}
                        value={text} 
                    />
                
                <textarea name="code" defaultValue={randomString.generate(4)} className='hidden'/>
                <div className="px-2">
                <button
                    onClick={handleSubmit}
                    className="text-white bg-[#5dbebb] py-1 text-[14px] rounded-md flex items-center justify-center w-full hover:bg-[#60c3d2] hover:text-white  transition-colors"
                >
                    Reset PassWord
                </button>
            </div>
            </form>
            {/* <div>
                <label htmlFor="email" className="text-[14px] text-neutral-100 px-2">Email</label>
                    <Input
                        id="email"
                       
                        type="email"
                        label="email"
                        register= {register}
                        //disabled ={ isLoading}
                        required
                        errors={errors}
                    />
                    <input 
                        
                        id="email"
                        type='text'
                        {...register('email',{required: true})}
                        placeholder={'Eamil'}
                        className={clsx("rounded-md tranparent focus:outline-none border-2 focus:border-[#5DBEBB]  text-slate-600 placeholder:text-slate-300 text-[14px] w-full px-2 py-1 placeholder:capitalize",
                            errors["email"] && "text-rose-500 border-rose-500 focus:boder-rose-500"
                        )}
                    />
            </div>
            */}
            
            </div>
           </div>
            
        </div>
  )
}

export default Step1
