"use client"

import { ContactUs } from "@/components/team/contact";
import Header from "@/components/team/header"
import Leader from "@/components/team/leader";
import Member from "@/components/team/member";
import { Comment, HeartReply, Relly, User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommentSession from "@/components/team/comment/comment";
import TotalTeamCard from "@/components/team/total-team-card";
import TeamLeadCahrt from "@/components/dashboard-home/team-lead-chart";
import { cn } from "@/lib/utils";
import TableQuantity from "@/components/team/table-quantity";
import { useRouter } from "next/navigation";
import PaginationTable from "@/components/team/paginatiion-table";


interface TeamProps {
    user: User[] | any;
    userSearch: User[];
    search: string;
    admin: string;
    page: number;
    per_page: number;
    comment_page: number;
    comment_per_page: number;
    sort: string;
    removed: string;
    heart:string;
    updated:string;
    add: string;
    currentUser: any;
    comments: Comment[] | any;
    relly: Relly[] | any;
    heartRelly: HeartReply[] | any;
    search_admin: string;
    page_admin:number;
    per_page_admin: number;
   
}

const Team:React.FC<TeamProps> = ({
    user = [],
    userSearch =[],
    comments=[],
    relly =[],
    search,
    admin,
    page,
    per_page,
    comment_page,
    comment_per_page,
    sort,
    removed,
    heart,
    updated,
    add,
    currentUser,
    heartRelly =[],
    search_admin,
    page_admin,
    per_page_admin
}) =>{
    const [member,setMember] = useState<any>([])
    const [thisWeek,setThisWeek] = useState<Date[]>([])
    const [lastWeek,setLastWeek] = useState<Date[]>([])
    const [totalUserThisWeek,setTotalUserThisWeek] = useState<any[]>([])
    const [totalUserLastWeek,setTotalUserLastWeek] = useState<any[]>([])
    const [chartRight,setChartRight] = useState('all');
    const router = useRouter()
 
    const [status,setStatus] = useState(true)
    //pagination
    const start =(per_page * page) -per_page;  //0,5,10,15,...
    const end = per_page * page;               //5,10,15

    const userSearchUpdate = userSearch.slice(start,end)
    const max= Math.ceil(userSearch.length / per_page);
    const maxTable = Math.ceil(member && member.length / per_page_admin);
   
    // find out this week
    useEffect(()=>{
        const thisWeek = [];
        const today = new Date();
         //console.log(today.getDay()) // thu ba
         //console.log(today.getDay() -1)
        const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate()-today.getDay())
        //console.log(monday);
        for(let i =1;i<=7;i++) {
           let date =  new Date(monday.getFullYear(), monday.getMonth(), monday.getDate()+i)
           //console.log(date)
            thisWeek.push(date)
        }
         //console.log(thisWeek)
        setThisWeek(thisWeek)
    },[])
    // find out last week
    useEffect(()=>{
        const lastWeek:any[] = [];
        for(let i = 0;i<thisWeek.length;i++){
            let current = new Date(thisWeek[0]);
            const result = new Date(current.getFullYear(),current.getMonth(),current.getDate() - (i+1));
            lastWeek.push(result)
        }
        setLastWeek(lastWeek)
    },[thisWeek])
    //console.log(lastWeek)

    // customer create this week
    useEffect(()=>{
        const array = [...user]
        const result:any = []
        array && array.forEach((item:any) =>{
            const day = new Date(item.createdAt);
            if(day >=thisWeek[0] && day<=thisWeek[thisWeek.length -1]) {
                result.push(item)
            }
        });
        setTotalUserThisWeek(result)
    },[thisWeek,user])
    // customer create last week
    useEffect(()=>{
        const array = [...user]
        const result:any = []
        array && array.forEach((item:any) =>{
            const day = new Date(item.createdAt);
            if(day <=lastWeek[0] && day>=lastWeek[lastWeek.length -1]) {
                result.push(item)
            }
        });
        setTotalUserLastWeek(result)
    },[lastWeek,user])
 
    useEffect(()=>{
        const result: any[] = []
        user.forEach((item:any)=>{
            if(item.role === 'yes'){
                result.push(item)
            }
        });
        setMember(result)
    },[user])
     // handle loading
   const handleLoading = useCallback((value:boolean)=>{
    setStatus(value)
 },[])

 console.log(status)
   
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
        <div className="px-2 w-full flex flex-col gap-2">
            <div className="grid grid-cols-6 gap-2">
                <div className="col-span-2  flex flex-col gap-2 h-full w-full text-[14px] text-neutral-400" >
                    {/* team manager card */}
                   <div className="bg-slate-600 px-2  rounded-md">
                    <div>
                        <TotalTeamCard
                            users ={user}
                            totalUserThisWeek = {totalUserThisWeek}
                            totalUserLastWeek ={totalUserLastWeek}
                        
                        />
                    </div>
                   </div>
                   {/* admin  */}
                    <div className="bg-slate-600 px-2 py-2 rounded-md">
                        <TableQuantity
                            users ={user}
                        />
                    </div>
                </div>
                {/* statictical */}
                <div className="col-span-4 bg-slate-600 px-2 py-2 rounded-md flex flex-col gap-2 h-full w-full text-[14px] text-neutral-400 ">
                   <div className="flex items-center justify-between ">
                    <div>
                            <div className="text-[15px] text-neutral-100 font-bold">Department & Employee</div>
                            <div>Statictical show the amount of memeber each department.</div>
                        </div>
                        <div className=" flex items-center justify-start gap-1 text-[14px] text-neutral-100 px-2">
                            <div 
                                onClick={()=>setChartRight('all')}
                                className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                        chartRight ==='all' && 'bg-[#4FA29E]'
                                    )}  
                            >
                                all
                            </div>
                            <div 
                                onClick={()=>setChartRight('thisWeek')}
                                className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                        chartRight ==='thisWeek' && 'bg-[#4FA29E]'
                                    )} 
                            >
                                current
                            </div>
                            <div 
                                onClick={()=>setChartRight('lastWeek')}
                                className={cn('border border-[#4FA29E] bg-none cursor-pointer rounded-md px-1 py-0.5 capitalize',
                                        chartRight ==='lastWeek' && 'bg-[#4FA29E]'
                                    )} 
                                >
                                    last week
                            </div>
                        </div>
                   </div>
                   <div className="w-full flex items-center justify-end text-[13px] text-neutral-400 mb-[-10px] px-2">Date: {chartRight === 'thisWeek' ?(
                        <span className="flex items-center justify-start gap-0.5 ">
                                <span>{new Date(thisWeek[0]).toDateString()}</span>
                                <span>-</span>
                                <span>{new Date(thisWeek[thisWeek.length -1]).toDateString()}</span>
                            </span>
                        ):(chartRight === 'lastWeek'? (
                            <span className="flex items-center justify-start gap-0.5 ">
                                <span>{new Date(lastWeek[0]).toDateString()}</span>
                                <span>-</span>
                                <span>{new Date(lastWeek[lastWeek.length -1]).toDateString()}</span>
                            </span>
                        ): 'all the time')}
                    </div>
                    <TeamLeadCahrt 
                        users ={user}
                        teamCondition = {true}
                        totalUserThisWeek = {totalUserThisWeek}
                        totalUserLastWeek = {totalUserLastWeek}
                        chart = {chartRight}
                    />
                </div>
            </div>
            <div className="bg-slate-600 px-2 py-2 rounded-md flex flex-col gap-2 h-full w-full">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="">
                        <TabsTrigger value="account">Team lead</TabsTrigger>
                        <TabsTrigger value="password">Comment</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="bg-slate-600">
                        <div className="">
                            <Header />
                            <div className="mt-2">
                                <hr />
                            </div>
                            <Leader
                                currentUser = {currentUser}
                                users = {user}
                            />
                            <div className="mt-2">
                                <hr />
                            </div>
                            <Member 
                                member = {member}
                                user = {user}
                                currentUser = {currentUser}
                                userSearch = {userSearchUpdate}
                                search={search}
                                admin ={admin}
                                page={page}
                                per_page={per_page}
                                page_admin ={page_admin}
                                per_page_admin ={per_page_admin}
                                max ={max}
                                search_admin = {search_admin}
                                status = {status}
                            />

                        <PaginationTable
                            page = {page_admin}
                            per_page ={per_page_admin}
                            search={search_admin}
                            max ={maxTable}
                            handleLoading ={handleLoading}
                        />
                        
                        </div>
                    </TabsContent>
                    <TabsContent value="password">
                        <div>
                            <CommentSession
                                currentUser = {currentUser}
                                user = {user}
                                comments = {comments}
                                relly = {relly}
                                heartRelly = {heartRelly}
                                comment_page = {comment_page}
                                comment_per_page = {comment_per_page}
                                sort = {sort}
                                add ={add}
                                removed = {removed}
                                heart = {heart}
                                updated = {updated}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
            
        </div>
    )
}

export default Team