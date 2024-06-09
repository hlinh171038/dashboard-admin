import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import { LuMailOpen } from "react-icons/lu";
import { toast } from 'sonner';
import { PiPasswordLight } from "react-icons/pi";
import { useDebounce } from 'use-debounce';
import { cn } from '@/lib/utils';
import { IoIosEyeOff } from 'react-icons/io';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface step2Props {
  infor: any;
  code:any;
}

const Step3:React.FC<step2Props> = ({
  infor,
  code
}) => {
  const [inputs, setInputs] = useState(['', '', '', '']); // Array to store values
  const inputRefs = useRef<any>([]); // Array of refs for each input element
  const [strength, setStrength] = useState({ strengthScore: 0, strengthLevel: '' });
  const [text,setText] = useState('')
  const [text2,setText2] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const router = useRouter()


  console.log(inputs)
  console.log(code)
  console.log(infor)




  // function check password
  function checkPasswordStrength(password:any) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-={}|\[\]:\/;?><.,'\\]/.test(password);
    const lengthCheck = password.length >= 6;
  
    let strengthScore = 0;
    if (hasUpperCase) strengthScore++;
    if (hasLowerCase) strengthScore++;
    if (hasNumber) strengthScore++;
    if (hasSpecialChar) strengthScore++;
    if (lengthCheck) strengthScore++;
  
    let strengthLevel;
    if (strengthScore === 0) {
      strengthLevel = 'Very Weak';
    } else if (strengthScore <= 2) {
      strengthLevel = 'Weak';
    } else if (strengthScore <= 3) {
      strengthLevel = 'Moderate';
    } else {
      strengthLevel = 'Strong';
    }
  
    return { strengthScore, strengthLevel };
  }

  //handle change password
  const handleChangePassword = (e:any) =>{
    setText(e.target.value)
    setStrength(checkPasswordStrength(e.target.value));
  }

//handle key down
const handleKeyDown = () =>{
    setIsVisible(true)
}

//handle key up
const handleKeyUp = () =>{
    setIsVisible(false)
}
//handle key down
const handleKeyDown2 = () =>{
    setIsVisible2(true)
}

//handle key up
const handleKeyUp2 = () =>{
    setIsVisible2(false)
}
//handle submit
const handleSubmit = (e:any) =>{
    e.preventDefault();
    // check password and password confirm exist
    if(text === '' || text2 === '') {
        toast.warning('Fill out password and password confirm !!!');
        return;
    }
    
    //check password strong
    if(strength.strengthScore<2) {
        toast.warning('Password so weak !!!') ;
        return;
    }
    // compare
    if(text !== text2) {
        toast.warning('password and password confirm must be the same!');
        return;
    }
    // at least 6 character
    if(text.length <6) {
        toast.warning('at least 6 character !!!');
        return;
    }
    //update
    setIsLoading(true)
    axios.post('/api/update-password',{id:infor?.id, password:text})
    .then((res:any)=>{
        toast.success('success.');
        console.log(res.data)
        router.push('/forget-password?step=4')
    })
    .catch((error:any)=>{
        toast.error('Something went wrong !!!');
        console.log(error)
    })
    .finally(()=>{
        setIsLoading(false)
    })
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
           <div className='py-8 px-16'>
            {/* icon */}
            <div className='p-2 border border-neutral-100 rounded-md flex items-center justify-center w-10 h-10'>
                <PiPasswordLight className='w-6 h-6 text-neutral-100'/>
            </div>
            <div className='text-neutral-100 text-[20px] mt-6 '>Set New Password</div>
            <div className='text-[14px] text-neutral-400 font-thin'>Must be at least 6 character.</div>
            <div>
            <form className='text-[14px] text-neutral-100 space-y-2 mt-4'>
                <div className='flex flex-col gap-2 '>  
                    <div className='relative'>
                        <div>Password</div>
                        <input type={isVisible ? 'text' : 'password'} 
                                name="password" 
                                onChange={handleChangePassword}
                                value={text} 
                                className='w-full px-2 py-1 text-slate-950 rounded-md outline-none'
                            />
                        <div className="absolute top-[55%] right-4"><IoIosEyeOff className="w-4 h-4 text-slate-900" onMouseDown={handleKeyDown} onMouseUp={handleKeyUp}/></div>
                    </div>
                   
                    {strength.strengthScore > 0 && (
                        <div className='text-[14px] text-neutral-400 mt-[-10px]'>
                        <p>Strength: {strength.strengthLevel}</p>
                        <div className='flex items-start justify-start gap-2'>
                            {[1,2,3,4].map((item:any)=>{
                                return <div key={item} className={cn('w-16 h-2 rounded-md',
                                    strength.strengthScore >= item ? 'bg-[#60c4c1]': 'bg-neutral-400'
                                )}></div>
                            })}
                        </div>
                        </div>
                    )}
                </div>
                {/* password confirm */}
                <div >  
                    <div className='relative'>
                        <div>Password Confirm</div>
                        <input type={isVisible2 ? 'text' : 'password'} 
                                name="password" 
                                onChange={(e)=> setText2(e.target.value)}
                                value={text2} 
                                className='w-full px-2 py-1 text-slate-950 rounded-md outline-none ' 
                            />
                        <div className="absolute top-[55%] right-4"><IoIosEyeOff className="w-4 h-4 text-slate-900" onMouseDown={handleKeyDown2} onMouseUp={handleKeyUp2}/></div>
                    </div>
                   
                    
                </div>
              
                
                <div className="">
                <button
                    onClick={handleSubmit}
                    disabled = {isLoading}
                    className="text-white bg-[#5dbebb] py-1 text-[14px] rounded-md flex items-center justify-center w-full hover:bg-[#60c3d2] hover:text-white  transition-colors"
                >
                    Reset PassWord
                    {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 ml-2"/>:<div className="w-5 h-5 ml-2"></div>}
                </button>
            </div>
            <div className='text-[14px] text-neutral-400 underline font-light cursor-pointer' onClick={()=> router.push('/signIn')}>Back to SignIn</div>
            </form>
           </div>
            
        </div>
        </div>
  )
}

export default Step3
