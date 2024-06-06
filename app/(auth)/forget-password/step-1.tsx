
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
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Input from './input';

interface step1Props {
    setInfor : any;
    setCode: any;
    code: any;
}

const Step1:React.FC<step1Props> = ({
    setInfor,
    setCode,
    code
}) => {

    const form = useRef<any>();
    const [text,setText] = useState<any>('')
    const [generate,setGenerate] = useState<any>('')
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()
    const [query] = useDebounce(text, 300);
    const formSchema = z.object({
        email: z.string().email({message: "Wrong Email Format"}),
      })

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: ""
        }
      })

      const onSubmit: SubmitHandler<FieldValues> = (data) => {
       //e.preventDefault()
        setIsLoading(true)
        // check email exist or not
        axios.post('/api/forget-password-check',data)
        
            .then((res:any)=>{
                console.log(res.data)
                toast.success('completed step 1')
                router.push('/forget-password?step=2')
                // set infor 
                setInfor(res?.data && res?.data)

                // send email
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
      useEffect(()=>{
        const result =  Math.floor(Math.random() * 9000) + 1000;
        setCode(result)
        setGenerate(result)
      },[])
   
    console.log(generate)
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
           <div className='px-16 py-8'>
            {/* icon */}
            <div className='p-2 border border-neutral-100 rounded-md flex items-center justify-center w-10 h-10'>
                <IoFingerPrintOutline className='w-6 h-6 text-neutral-100'/>
            </div>
            <div className='text-neutral-100 text-[20px] mt-6'>Forget Password ?</div>
            <div className='text-[14px] text-neutral-400 font-thin'>Dont worries, we will send you reset instructions.</div>
            <div>
            <form ref={form} className='mt-2'>
  
                
                {/* <input type="email" 
                        name="user_email" 
                        onChange={(e)=> setText(e.target.value)}
                        value={text} 
                        placeholder='Email'
                        className='px-2 py-0.5 rounded-md outline-none placeholder:text-[14px] w-[60%] text-[14px]'
                    /> */}
                    <div className='relative w-[60%]'>
                    <div className='text-neutral-100 text-[15px] mb-0.5 relative'>Enter your email</div>
                      <Input
                        id="email"
                        type="email"
                        label="email"
                        register= {register}
                        disabled ={ isLoading}
                        required
                        errors={errors}

                      />
                      {errors?.email && <span className="text-red-600 text-[14px] absolute top-1 right-2">{`${errors?.email?.message}`}</span>}
                      </div>
                
                <textarea name="code" defaultValue={generate} className='hidden'/>
                <div className="mt-2">
                <button
                disabled ={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    className="text-white bg-[#5dbebb] py-1 text-[14px] rounded-md flex items-center justify-center w-[60%] hover:bg-[#60c3d2] hover:text-white  transition-colors"
                >
                    Reset PassWord
                    {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5 ml-2"></div>}
                </button>
            </div>
            </form>
            <div className='text-[14px] text-neutral-400 underline font-light cursor-pointer' onClick={()=> router.push('/signIn')}>Back to SignIn</div>
            
            </div>
           </div>
            
        </div>
  )
}

export default Step1
