"use client"

import Input from "@/components/imputs/input"
import { cn } from "@/lib/utils"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuDot } from "react-icons/lu";
import { IoMdStar } from "react-icons/io";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import { FaGithub, FaYoutube } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { IoIosEyeOff } from "react-icons/io";
import './style.css'
import Button from "@/components/button"
import { FcGoogle } from "react-icons/fc"
import { z } from "zod"
import randomstring from 'randomstring';


const Login = () =>{
    const router = useRouter()
    const [imageIndex,setImageIndex] = useState<number>(0)
    const [isLoading,setIsLoading] = useState(false)


    const [isVisible, setIsVisible] = useState(false);
    
   
  const handleKeyDown = () => {
    console.log('key down')
    setIsVisible(true);
  };

  const handleKeyUp = () => {
    setIsVisible(false);
    console.log('key up')
  };

//   zod validate
const formSchema = z.object({
    email: z.string().email({message: "Wrong email format"}),
   
  })
  
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: ""
        }
      })
      const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true)

        signIn('credentials',
        {...data, redirect: false
       })
       .then((callback) => {
           if (callback?.error) {
               toast.error(callback.error)
           }

           if(callback?.ok && !callback?.error) {
            
               router.refresh()
               toast.success('Logged in successfully!')
               router.push('/dashboards/home')
           }
       } )
      }

 
      
      const content1 = (
            <div className="relative h-full w-full">
                        
                        <div className="absolute top-0 left-0 w-full h-full bg-slate-900/90 rounded-md"></div>
                        <div className="absolute bottom-[22%] left-2 text-neutral-100 flex flex-col gap-1">
                            <div>The Easy way to manage your E-commercial.</div>
                            <div className="text-[14px] text-neutral-400">join the community now !!!</div>
                            <button className="text-neutral-100 bg-[#5FC1BF] px-4 py-2 rounded-md text-[14px] flex items-center justify-center gap-2">Watch demo <span ><FaPlay className="text-neutral-100 w-4 h-4"/></span></button>
                        </div>
                        <Image 
                            src="/bg-3.jpg"
                            width={3000}
                            height={3000}
                            alt="bg"
                            className="h-full object-cover rounded-md"
                        />
                        <Image 
                            src="/show-case.png"
                            width={3000}
                            height={200}
                            alt="bg"
                            className=" absolute top-10 left-2  object-cover rounded-md shadow-md shadow-neutral-400"
                        />
                        
                    </div>
      )
      const content2 = (
        <div className="relative h-full w-full">
                        
                        <div className="absolute top-0 left-0 w-full h-full  rounded-md"></div>
                        
                        <Image 
                            src="/carousel-3.webp"
                            width={1000}
                            height={1000}
                            alt="bg"
                            className="h-full object-cover rounded-md"
                        />
                        <div className="absolute bottom-16 left-0 px-2 m-2">
                            <div className="   object-cover rounded-md shadow-md bg-slate-900/40  space-y-2 px-4 py-4">
                                <div className="text-neutral-100 text-[20px] text-justify">The best choose for your E-commercial , improved efficiency, and enhanced collaboration. 
                                    Highly recommend for successful career.
                                </div>
                                <div className="text-neutral-400 text-[14px]">
                                    <div className="text-neutral-100 text-[20 px] font-bold">David Ngo</div>
                                    <div>E-commercial Bussiness </div>
                                    <div className="text-[12px] ">Ho Chi Minh city</div>
                                </div>
                                <div className="flex items-center justify-start gap-1 text-yellow-400">
                                    {[0,1,2,3,4].map((item:any)=>{
                                        return <IoMdStar key={item}/>
                                    })}
                                    
                                </div>
                                <RiDoubleQuotesR  className="w-8 h-8 text-neutral-100 absolute bottom-[-16px] right-[-8px]"/>
                                <RiDoubleQuotesL  className="w-8 h-8 text-neutral-100 absolute top-[-24px] left-[-8px]"/>
                            </div>
                        </div>
                         
                    </div>
      )
   

      const contents = [content1, content2]

      const showNextImage = () =>{
        setImageIndex(index =>{
    
            if(index === contents.length -1 ) return 0
            return index + 1
        })
      } 
      const showPrevImage = () =>{
        setImageIndex(index =>{
            if(index === 0 ) return contents.length -1
            return index - 1
        })
      }

      // auto incresing
      useEffect(()=>{
        const result = setTimeout(()=>{
            showNextImage()
        },3000);
        return () => clearTimeout(result);
      },[showNextImage])
      useEffect(()=>{
        setImageIndex((index) =>{
            if(index === contents.length -1 ) return 0
            return index + 1
        })
      },[])
    return (
        <div className="w-auto h-screen">
            <div className="w-full h-full grid grid-cols-2 gap-2 bg-gradient-to-r from-slate-900 via-[#5EC0BD] to-slate-900 ">
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
                    <div className="px-16 py-8">
                        <div className="text-neutral-100 text-[20px] mb-6">Sign In</div>
                        {/* login form */}
                        <div>
                            <label htmlFor="email" className="text-[14px] text-neutral-100 px-2">Email</label>
                            <Input
                                id="email"
                                type="email"
                                label="email"
                                register= {register}
                                disabled ={ isLoading}
                                required
                                errors={errors}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="text-[14px] text-neutral-100 px-2">Password</label>
                            <Input 
                            id="password"
                            type="password"
                            label="password"
                            register={register}
                            disabled={isLoading}
                            required
                            errors={errors}
                            isVisible ={isVisible}
                        />
                        <div className="absolute top-[55%] right-4"><IoIosEyeOff className="w-4 h-4 text-slate-900" onMouseDown={handleKeyDown} onMouseUp={handleKeyUp}/></div>
                        </div>
                        <div onClick={()=> router.push('/forget-password?step=1')} className="text-neutral-100 text-[14px] font-bold text-end px-2">Forget Password ?</div>
                        <div className="px-2">
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="text-white bg-[#5dbebb] py-1 text-[14px] rounded-md flex items-center justify-center w-full hover:bg-[#60c3d2] hover:text-white  transition-colors"
                            >
                                Sign In
                            </button>
                        </div>
                        <div className="px-2 py-2 pt-4 flex items-center justify-center text-neutral-400">
                        <div className="border-t-2 border-neutral-400 w-[50%] text-blue-600   px-2"></div>
                                <div>or</div>
                                <div className="border-t-2 border-neutral-400 w-[50%] text-blue-600   px-2"></div>
                        </div>
                        <div className="px-2 space-y-2">
                            <Button
                                label="Sign In with Github"
                                outline
                                onClick={()=>signIn('github', {callbackUrl: '/dashboards/home'})}
                                icon={FaGithub}
                            />
                            <Button 
                                label="Sign In with Google"
                                outline
                                onClick={() => signIn('google', { callbackUrl: '/dashboards/home' })}
                                icon={FcGoogle}
                            />
                        </div>
                    </div>
                    
                </div>
                <div className="relative h-screen ">
                    <div className=" h-full flex overflow-hidden ">
                        {contents.map((item:any)=>{
                            return <div 
                                    key={item } 
                                    className={`h-full p-4 flex-1 translate-x-[${-100 * imageIndex}%] transition-all duration-300`}
                                    style={{flex: "1 0 100%"}}
                                    >
                                        {item}
                                    </div>
                        })}
                    </div>
                     <div className="absolute bottom-6 right-4 w-20 flex items-center justify-between">
                            <div onClick={showNextImage} className="img-slider-btn">
                                <MdKeyboardArrowLeft className="w-8 h-8 text-neutral-100 cursor-pointer" />
                            </div>
                            <div onClick={showPrevImage} className="img-slider-btn">
                                <MdKeyboardArrowRight className="w-8 h-8 text-neutral-100 cursor-pointer"/>
                            </div>
                    </div>
                    <div className="absolute bottom-6 right-[50%] space-x-2">
                        {contents.map((_,index)=>{
                            return <button key={index} onClick={()=>setImageIndex(index)}>{index === imageIndex ? 
                            <div className="w-2 h-2 bg-[#60C3C0] rounded-full transition-all duration-300">

                            </div> : 
                            <div className="w-2 h-2 bg-neutral-100 rounded-full transition-all duration-300">

                            </div>
                            }
                            </button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login