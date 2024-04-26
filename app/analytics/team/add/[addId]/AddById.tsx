"use client"

import { cn } from "@/lib/utils";
import { User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiFillHome, AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgArrowLongRight } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { IoMdPersonAdd } from "react-icons/io";
import { MdDone } from "react-icons/md";
import { VscLaw } from "react-icons/vsc";
import { toast } from "sonner";

interface AddByIdProps {
    id:string;
    users: User[] | any;
    currentUser: any;
}

const AddById:React.FC<AddByIdProps> = ({
    id:ad,
    users = [],
    currentUser
}) =>{
    const [admin,setAdmin] = useState<any>([])
    const [department,setDepartment] = useState('');
    const [role,setRole] = useState('');
    const [permission,setPermission] = useState('');
    const [isLeader,setIsLeader] = useState(false);
    const [openRole,setOpenRole] = useState(false);
    const [openLeader,setOpenLeader] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
    const [finish,setFinish] = useState(false)
    const [currentUserInfo,setCurrentUserInfo] = useState<any>([])
    const router = useRouter()

   

    const handleAddDepartment = useCallback((value:string)=>{
       
        setDepartment(value)
    },[])

   

    console.log(admin)

    //check is leader
    const handleCheckLeader = useCallback((department:string) =>{
        setOpenRole(true)
       const index =  users && users.findIndex((item:any)=>item.isLeader === true && item.position === department);
    //console.log(index)
       if(index === -1) {
        setIsLeader(false);
        return;
       }

       setIsLeader(true)
    },[users])
    useEffect(()=>{
        if(department !== '') {
            handleCheckLeader(department)
        }
    },[department,handleCheckLeader])
    //console.log(isLeader)

    //handle role
    const handleRole = useCallback((value:any)=>{
        if(value === 'leader') {
            if(isLeader ) {
                setOpenLeader(true)

            }else {
                setRole('leader')
            }
        }else {
            setRole('member')
        }
    },[isLeader])

    //handleRelate admin
    const handleRelatedAdmin  = useCallback((value:any)=>{
        if(value === 'yes') {
            setRole('leader')
        } else {
            setRole('member')
        }
        setOpenLeader(false)
    },[])

    //handle add new addmin
    const handleAddNewAdmin = useCallback(()=>{

        if(!currentUser) {
            toast.warning('have not login !!!');
            return;
        }
        setFinish(true)
        if(department === '' ) {
            toast.warning('choosen department !!!');
            return;
        }
        if(role === '' ) {
            toast.warning('choosen role !!!');
            return;
        } if(permission === '' ) {
            toast.warning('choosen permission !!!');
            return;
        }
        setIsLoading(true)
        axios.post('/api/update-admin',{id:ad,department,permission,role})
            .then((res)=>{
               // toast.success("success")
                router.refresh();
            })
            .catch((err:any)=>{
               toast.error('Some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
                setFinish(false)
                router.refresh()
                router.push(`/analytics/team`)
            })
            axios.post('/api/create-new-history',{
                userId: currentUserInfo && currentUserInfo.id,
                title:`add new admin`,
                type: 'add-user-admin'
            })
            .then((res)=>{
                
                toast.success('add new admin.');
                router.refresh();
            })
            .catch((err:any)=>{
                toast.error("Something went wrong !!!")
            }).
            finally(()=>{
                setIsLoading(false)
                
            })
    },[router,department,permission,role,ad,currentUser,currentUserInfo])

    useEffect(()=>{
        const result = users && users.filter((item:any)=>item.role === 'yes');
        const re:any[] = [
            {
                role:'owner',
                count:0,
                leader:''
            },
            {
                role:'marketing',
                count:0,
                leader:''
            },
            {
                role:'sale',
                count:0,
                leader:''
            },
            {
                role:'employee',
                count:0,
                leader:''
            },
            {
                role:'developer',
                count:0,
                leader:''
            },
            {
                role:'customer-service',
                count:0,
                leader:''
            },
            {
                role:'accountant',
                count:0,
                leader:''
            }
        ];

        console.log(result)
        console.log(re)
        result && result.forEach((item:any)=>{
             console.log(item.position)
            const index = re && re.findIndex((it:any)=>it.role === item.position)
            console.log(index)
            if(index !== -1) {
                console.log('try')
                re[index].count ++;
                if(item.isLeader ) {
                    re[index].leader = item.email
                }
            } 
            console.log(re)
        })
        setAdmin(re)
        
    },[users])

    useEffect(()=>{

        if(currentUser) {
            const result = users && users.find((item:any)=>item.email === currentUser?.user.email);
            setCurrentUserInfo(result)
        }
        
      },[currentUser,users])
    return (
        <div className="w-full h-auto px-2 text-neutral-400 text-[14px]">
            
            <div className="p-2 bg-slate-600 rounded-md">
            <div className="flex items-center justify-between text-[15px]">
                <div className="font-bold text-[15px] text-neutral-100">Step 2</div>
                <div className="flex items-center justify-end gap-2">
                    <span><AiFillHome  className="h-4 w-4 hover:text-white cursor-pointer" onClick={()=>router.push('/analytics/team?search=${query}&page=1&per_page=10')}/></span>
                    <span><CgArrowLongRight /></span>
                    <span ><GrUserAdmin className="w-4 h-4 hover:text-white cursor-pointer" onClick={()=>router.push('/analytics/team/add?search=${query}&page=1&per_page=10')}/></span>
                    <span><CgArrowLongRight /></span>
                    <span className={cn('',
                        !finish ?"border border-[#4FA29E] rounded-full text-white px-2 py-2 flex items-center justify-center hover:bg-[#4FA29E] cursor-pointer": 'hover:text-white cursor-pointer'
                    )}><VscLaw className="w-4 h-4" /></span>
                    <span><CgArrowLongRight /></span>
                    <span className={cn("",
                        finish && "border border-[#4FA29E] rounded-full text-white px-2 py-2 flex items-center justify-center hover:bg-[#4FA29E] cursor-pointer"
                    )}><MdDone className="w-4 h-4"/></span>
                </div>
            </div>

            <div className="text-[15px] text-nutral-100 border-b border-t border-neutral-400 my-2 py-2 px-2" >
                <div>Department and permission for administrator.</div>
                <div className="px-2">
                    <div>1. Choose department. </div>
                    <div >2.Choose permission.</div>

                </div>
            </div>
            <div className="relative text-[14px] text-neutral-400 px-2 py-4 flex flex-col gap-2">
                {openLeader && (
                    <div className= "absolute top-0 left-0 w-full h-full bg-slate-600/40 flex items-center justify-center ">
                    <div className="w-[30%] bg-neutral-100 rounded-md px-2 py-4  shadow-md text-slate-900">
                        <div className="font-bold">Do you agree to replace the new team leader?</div>
                        <div>
                                <label htmlFor="department" className="flex items-center justify-start gap-2">
                                <input type="radio" name="department" value={'yes'} onClick={(e:any)=>handleRelatedAdmin(e.target.value)} />
                                    <span className="capitalize">yes </span>
                                   <span>{`(I agree)`}</span>
                                </label>
                                <label htmlFor="department" className="flex items-center  justify-start gap-2">
                                <input type="radio" name="department" value={'no'} onClick={(e:any)=>handleRelatedAdmin(e.target.value)} />
                                    <span className="capitalize">no</span>
                                    <span>{`(Not agree)`}</span>
                                </label>
                        </div>
                    </div>
                </div>
                )}
            <div>
                <div>
                        <div className="text-[15px] text-neutral-100 font-bold">Choose Department</div>
                        <div></div>
                    </div>
                    
                    <table
                        id="trend-sale-table"
                        className="w-full my-1"
                    >
                        <tr className="font-bold text-[15px] text-neutral-100">
                            <td></td>
                            <td className="px-2">Department</td>
                            <td className="px-2">Member</td>
                            <td className="px-2">Leader</td>
                        </tr>
                       
                        {admin.map((item:any)=>{
                            return (
                                <tr key={item.id} >
                                    <td>
                                        <div className="flex items-center justify-center">
                                            <label htmlFor="department" className="flex items-center justify-start gap-2">
                                            <input type="radio" name="department" value={item.role} onClick={()=>handleAddDepartment(item.role)} checked={department ===`${item.role}`}/>
                                                
                                            </label>
                                        </div>
                                    </td>
                                    <td className="px-2 capitalize">{item.role}</td>
                                    <td className="px-2">{item.count + ' member'}</td>
                                    <td  className="px-2">{item?.leader && item?.leader}</td>
                                </tr>
                            )
                        })}
                      
                    </table>
            </div>
                {openRole && (
                    <div>
                    <div className="text-[15px] text-neutral-100 font-bold">Role</div>
                    <div>
                        <label htmlFor="role" className="flex items-center justify-start gap-2">
                        <input type="radio" name="role" value={'leader'}  onClick={(e:any)=>handleRole(e.target.value)} checked={role === 'leader'} disabled={isLeader}/>
                            <span className="capitalize">leader</span>
                            <span >{isLeader && (
                                <span className="flex items-center justify-end gap-4">
                                    
                                    <span className="text-red-600 ml-4">There is already a leader</span>
                                    <span onClick={()=>setOpenLeader(true)} className="underline text-neutral-400 text-[14px]">Change</span>
                                </span>
                            )}</span>
                        </label>
                        <label htmlFor="role" className="flex items-center  justify-start gap-2">
                        <input type="radio" name="role" value="member"  onClick={(e:any)=>handleRole(e.target.value)} checked={role === 'member'}/>
                            <span className="capitalize">member</span>
                        </label>
                    </div>
                    </div>
                )}

                <div>
                <div className="text-[15px] text-neutral-100 font-bold">Permission</div>
                <div>
                        <label htmlFor="permission" className="flex items-center  justify-start gap-2">
                        <input type="radio" name="permission" value="read"  onClick={(e:any)=>setPermission(e.target.value)} checked={permission === 'read'}/>
                            <span className="capitalize">Read Only</span>
                        </label>
                        <label htmlFor="permission" className="flex items-center  justify-start gap-2">
                        <input type="radio" name="permission" value="exercute"  onClick={(e:any)=>setPermission(e.target.value)} checked={permission === 'exercute'}/>
                            <span className="capitalize">Exercute</span>
                        </label>
                        <label htmlFor="permission" className="flex items-center  justify-start gap-2">
                        <input type="radio" name="permission" value="all"  onClick={(e:any)=>setPermission(e.target.value)} checked={permission === 'all'}/>
                            <span className="capitalize">All Permission</span>
                        </label>
                </div>
                </div>
                <button 
                        onClick={handleAddNewAdmin}
                            disabled = {isLoading}
                            className={cn("w-full px-2 py-1 rounded flex items-center justify-center text-[15px] text-white bg-[#4FA29E] hover:text-neutral-200 hover:opacity[0.7] transition-all duration-300 cursor-pointer",
                                        isLoading && 'cursor-not-allowed' 
                                    )}
                            > 
                            Add New Admin
                            {isLoading ?  <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 "/>:<div className="w-5 h-5"></div>}
                        </button>
            </div>
            </div>
            
        </div>
    )
}

export default AddById