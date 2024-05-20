"use client"

import Button from "@/components/button"
import { cn } from "@/lib/utils"

import Image from "next/image"

import '@/app/globals.css'

import InputCustomerId from "@/components/customers/input"
import SelectCustomer from "@/components/customers/select"
import { useParams, usePathname, useRouter } from "next/navigation"
import { getuserById } from "@/app/actions/getUserById"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { User } from "@prisma/client"
import { error } from "console"
import { MdCopyAll } from "react-icons/md";
import { useCallback, useEffect, useState } from "react"
import { Toaster, toast } from "sonner"
import Radio from "@/components/customers/radio"
import axios from "axios"
import UploadImage from "@/components/customers/upload-img"
import { Value } from "@radix-ui/react-select"
import { MdAddPhotoAlternate } from "react-icons/md";
import QuestionNotified from "@/components/question-notified"
import { GoDotFill } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import SelectDistrict from "./selectDistrict"
import SelectProvince from "./selectProvince"
import SelectCommune from "./selectCommune"




interface DetailCustomerProps {
    userById?: User[] | null | any;
    currentUser: any;
    user: User[] | any
}

const Profile:React.FC<DetailCustomerProps> = ({
    user=[],
    currentUser,
    userById
}) =>{
    const [isLoading,setisLoading] = useState(false)
    const [provinces,setProvinces] = useState<any>([])
    const [districts,setDistricts] = useState<any>([])
    const [communes,setCommunes] = useState<any>([])
    // const [dataCheckProvince,setDataCheckProvince] = useState<any>('')
    // const [dataCheckDistrict,setDataCheckDistrict] = useState<any>('')
    // const [dataCheckCommune,setDataCheckCommune] = useState<any>('')
    const [districtPassProps,setDistrictPassPros] = useState<any>([])
    const [CommunePassProps,setCommunePassPros] = useState<any>([])
    const [provinceSelected,setProvinceSelected] = useState<any>(null)
    const [districtSelected,setDistrictSelected] = useState<any>(null)
    const[check,setCheck] = useState(false)
    const router = useRouter()

  
   const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
        id: userById?.id,
        name: userById ?.name,
        email:userById?.email,
        password: userById?.hashedPassword,
        emailVerified: userById?.emailVerified,
        phone: userById?.phone,
        role: userById?.role,
        active: userById?.active,
        imgUrl: userById?.image,
        province: userById?.province  ,      
        district: userById?.district,     
        commune: userById?.commune,
        address: userById?.address,
        confirmPassword: ""
    }
  })


  const id = watch('id');
  const name = watch('name');
  const email = watch('email');
  const password = watch('password');
  const emailVerified = watch('emailVerified');
  const phone = watch('phone');
  const role = watch('role');
  const active = watch('active');
  const imgUrl = watch('imgUrl');
  const address = watch('address')
  const province = watch('province');
  const district = watch('district');
  const commune = watch('commune');

  console.log(province);
  console.log(district);
  console.log(commune);

  
  const onSubmit: SubmitHandler<FieldValues> = () => {
    setisLoading(true)
    axios.post('/api/updated-user',{
        id,
        name,
        email,
        emailVerified,
        phone,
        role,
        active,
        imgUrl,
        address,
        province,
        district,
        commune
    })
        .then((res)=>{
            toast.success('User is uploaded')
        })
        .catch((err:any)=>{
            toast.error('Some thing went wrong !!')
        })
        .finally(()=>{
            setisLoading(false)
        })

  }

  //handle coppy id

  const handleCopy =(id:string) =>{
    navigator.clipboard.writeText(id)
    toast.success("coppied to clipboard")
  }


  // set customer 
  const setCustomValue = (id:string, value: any) =>{
    setValue(id,value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
    })
}


// data provinces
  useEffect(()=>{
    axios.get('https://vietnam-administrative-division-json-server-swart.vercel.app/province')
        .then((res:any)=>{
            setProvinces(res?.data)
        })
        .catch((err:any)=>{
            console.log(err)
        })
  },[])

// data districts
useEffect(()=>{
    if(provinceSelected) {
        console.log(provinceSelected)
        console.log(provinceSelected?.idProvince)
        axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/district/?idProvince=${provinceSelected?.idProvince}`)
            .then((res:any)=>{
                setDistricts(res?.data)
            })
            .catch((err:any)=>{
                console.log(err)
            })
    } 
  },[provinceSelected])
    console.log(districts)
// data commune
useEffect(()=>{
    if(districtSelected) {
        axios.get(`https://vietnam-administrative-division-json-server-swart.vercel.app/commune/?idDistrict=${districtSelected?.idDistrict}`)
        .then((res:any)=>{
            setCommunes(res?.data)
        })
        .catch((err:any)=>{
            console.log(err)
        })
    }
   
},[districtSelected])

 
console.log(communes)
//handle ctr + z
useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.ctrlKey === true && event.key === 'z') {
        router.push('/history')
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [router]);


    return (
        <div className="grid grid-cols-3 gap-2 px-2">
            
           <div className=" rounded-md col-span-1 flex flex-col items-center justify-start gap-4">
           
            <div className="relative w-full  ">
                <div className="absolute top-[48%] left-[48%] hover:z-50 transition-all duration-300 flex flex-col items-center justify-center gap-2">
                    <MdAddPhotoAlternate className="w-6 h-6 text-white" />
                   
                </div>
                <UploadImage 
                    value={imgUrl}
                    onChange={(value)=>setCustomValue('imgUrl', value)}
                    update
                    disabled
                />
                <div
                    className="flex item-center justify-start gap-1 "
                >
                    <div className="flex items-center justify-center">
                        <GoDotFill className={cn("w-4 h-4 text-green-600",
                                               
                                            )}/>
                    </div>
                    <div className="text-[14px] text-neutral-100">Online</div>
                </div>
            </div>
            <div className="flex items-center justify-between bg-slate-600/80 rounded-md px-2 py-1 w-full">
                <div className="flex items-center justify-center text-[15px]">
                    <div className="text-neutral-200">ID : </div>
                    <div className="text-neutral-400"> {id}</div>
                </div>
                <div>
                    <MdCopyAll 
                    className="w-4 h-4 hover:text-white cursor-pointer text-neutral-200" 
                    onClick={()=>handleCopy(id)}/>
                </div>
            </div>
           </div>
           <div className="bg-slate-600 rounded-md col-span-2 px-2 py-4">
                <div className="flex items-center justify-between">
                
                {/* information */}
                <div className="flex item-center justify-between w-full mb-4">
                    <div>
                        <div className="uppercase text-[18px] text-neutral-100 font-semibold">User Information</div>
                        <div className="w-20 h-0.5 bg-neutral-100"></div>
                    </div>
                    {/* wating */}
                    <div>block/unblock</div>
                </div>
               
                </div>
                <form>
                    <div className="grid grid-cols-2 gap-2">
                        <InputCustomerId
                            id="name"
                            title ="username"
                            register={register}
                            placeholder = "username"
                            type = "text"
                            errors={errors}
                            defaultValues={name}
                            disabled={check}
                        />
                        <div
                            className="flex flex-col justify-start  text-neutral-200 text-[15px] mb-4"
                        >
                                <div className="flex items-center justify-between">
                                    <div>Role</div>
                                    <QuestionNotified 
                                        title="role"
                                        content="only change with exercute permission !!!"
                                    />
                                </div>
                           
                            <div className="bg-slate-500/60 inline-block px-2 py-1 rounded-md text-[15px] text-neutral-200">{role === 'no' ? "User": 'Admin'}</div>
                        </div>
                    </div>
                    <InputCustomerId
                        id="email" 
                        title ="email"
                        register={register}
                        placeholder = "email"
                        type = "text"
                        errors={errors}
                        defaultValues={email}
                        disabled={check}
                    />
                     <InputCustomerId
                        id="emailVerified" 
                        title ="emailVerified"
                        register={register}
                        placeholder = "emailVerified"
                        type = "text"
                        errors={errors}
                        defaultValues={emailVerified}
                        disabled={check}
                    />
                    <InputCustomerId 
                        id="phone"
                        title ="phone"
                        register={register}
                        placeholder = "phone"
                        type = "number"
                        errors={errors}
                        defaultValues={phone}
                        disabled={check}
                    />
                    <div className="flex flex-col gap-4 mb-4">
                        <SelectProvince data={provinces} id={'province'} setCustomValue = {setCustomValue}  province = {province} setProvinceSelected={setProvinceSelected}/>
                       <div className="grid grid-cols-2 gap-2">
                        <SelectDistrict data={districts} id={'district'} setCustomValue = {setCustomValue}   district = {district} setDistrictSelected={setDistrictSelected}/> 
                        <SelectCommune data={communes} id={'commune'} setCustomValue = {setCustomValue}   commune = {commune}/> 
                       </div>
                    </div>
                    <InputCustomerId 
                        id="address"
                        title ="address"
                        register={register}
                        placeholder = "address"
                        type = "text"
                        errors={errors}
                        defaultValues={address}
                        disabled={check}
                    />
                    
                   
                    
                    
                    <button 
                        onClick={handleSubmit(onSubmit)}
                        disabled = {isLoading || check}
                        className={cn("w-full px-2 py-1 rounded flex items-center justify-center text-[15px] text-white bg-[#4FA29E] hover:text-neutral-200 hover:opacity[0.7] transition-all duration-300 cursor-pointer",
                                    isLoading && 'cursor-not-allowed', check && 'cursor-not-allowed'
                                )}
                        > 
                        Update Product
                        {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
                    </button>
                </form>
           </div>
        </div>
    )
}

export default Profile

