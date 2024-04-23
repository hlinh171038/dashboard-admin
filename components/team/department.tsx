"use client"

import { cn } from "@/lib/utils";
import { User } from "@prisma/client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { toast } from "sonner";

interface DepartmentProps {
    users: User[] | any;
    admin: string
}

const Department:React.FC<DepartmentProps> = ({
    users = [],
    admin:ad
}) =>{

    const [admin,setAdmin] = useState<any>([])
    const [department,setDepartment] = useState('');
    const [role,setRole] = useState('');
    const [permission,setPermission] = useState('');
    const [isLeader,setIsLeader] = useState(false);
    const [openRole,setOpenRole] = useState(false);
    const [openLeader,setOpenLeader] = useState(false);
    const [isLoading,setIsLoading] = useState(false);
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
                toast.success("success")
                router.refresh();
            })
            .catch((err:any)=>{
               toast.error('Some thing went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
                router.refresh()
                router.push(`/analytics/team`)
            })
    },[router,department,permission,role,ad])

    useEffect(()=>{
        const result = users && users.filter((item:any)=>item.role === 'yes');
        const re:any[] = [
            {
                role:'owner',
                count:0,
            },
            {
                role:'marketing',
                count:0,
            },
            {
                role:'sale',
                count:0,
            },
            {
                role:'employee',
                count:0,
            },
            {
                role:'developer',
                count:0,
            },
            {
                role:'customer-service',
                count:0,
            },
            {
                role:'accountant',
                count:0,
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
            } 
            console.log(re)
        })
        setAdmin(re)
        
    },[users])
    return (
        <div className="relative text-[14px] text-slate-600 px-2 py-4 flex flex-col gap-2">
            {openLeader && (
                <div className= "absolute top-0 left-0 w-full h-full bg-slate-600/40 flex items-center justify-center ">
                <div className="w-[50%] bg-neutral-100 rounded-md px-2 py-4  shadow-md">
                    <div className="">Related this current leader</div>
                    <div>
                            <label htmlFor="department" className="flex items-center justify-start gap-2">
                            <input type="radio" name="department" value={'yes'} onClick={(e:any)=>handleRelatedAdmin(e.target.value)} />
                                <span className="capitalize">yes</span>
                            </label>
                            <label htmlFor="department" className="flex items-center  justify-start gap-2">
                            <input type="radio" name="department" value={'no'} onClick={(e:any)=>handleRelatedAdmin(e.target.value)} />
                                <span className="capitalize">no</span>
                            </label>
                    </div>
                </div>
            </div>
            )}
           <div>
            <div>
                    <div className="text-[15px] text-slate-900 font-bold">Choose Department</div>
                    <div></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    {admin.map((item:any)=>{
                        return (
                            <div key={item.id} className="flex items-center justify-between gap-4">
                                <label htmlFor="department" className="flex items-center justify-start gap-2">
                                <input type="radio" name="department" value={item.role} onClick={()=>handleAddDepartment(item.role)} checked={department ===`${item.role}`}/>
                                    <span className="capitalize">{item.role}</span>
                                </label>
                                <div>{item.count + 'member'}</div>
                            </div>
                        )
                    },[])}
                </div>
           </div>
            {openRole && (
                <div>
                <div className="text-[15px] text-slate-900 font-bold">Role</div>
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
            <div className="text-[15px] text-slate-900 font-bold">Permission</div>
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
    )
}

export default Department