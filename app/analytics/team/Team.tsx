"use client"

import { ContactUs } from "@/components/team/contact";
import Header from "@/components/team/header"
import Leader from "@/components/team/leader";
import Member from "@/components/team/member";
import { Comment, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CommentSession from "@/components/team/comment/comment";


interface TeamProps {
    user: User[] | any;
    userSearch: User[];
    search: string;
    page: number;
    per_page: number;
    currentUser: any;
    comments: Comment[] | any
}

const Team:React.FC<TeamProps> = ({
    user = [],
    userSearch =[],
    comments=[],
    search,
    page,
    per_page,
    currentUser
}) =>{
    const [member,setMember] = useState<any>([])
    

 
    //pagination
    const start =(per_page * page) -per_page;  //0,5,10,15,...
    const end = per_page * page;               //5,10,15

    const userSearchUpdate = userSearch.slice(start,end)
    const max= Math.floor(userSearchUpdate.length);
    
 
    useEffect(()=>{
        const result: any[] = []
        user.forEach((item:any)=>{
            if(item.role === 'yes'){
                result.push(item)
            }
        });
        console.log(result)
        setMember(result)
    },[user])
   
  
    return (
        <div className="px-2 w-full h-[85.5vh]">
            <div className="bg-slate-600 px-2 py-2 rounded-md flex flex-col gap-2 h-full w-full">
                <Tabs defaultValue="account" className="w-full">
                    <TabsList className="">
                        <TabsTrigger value="account">Team lead</TabsTrigger>
                        <TabsTrigger value="password">Comment</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account" className="bg-slate-600">
                        <div className="">
                            <Header />
                            <div>
                                <hr />
                            </div>
                            <Leader
                                currentUser = {currentUser}
                                users = {user}
                            />
                            <div>
                                <hr />
                            </div>
                            <Member 
                                member = {member}
                                user = {user}
                                userSearch = {userSearchUpdate}
                                search={search}
                                page={page}
                                per_page={per_page}
                                max ={max}
                            />
                        
                        </div>
                    </TabsContent>
                    <TabsContent value="password">
                        <div>
                            <CommentSession
                                currentUser = {currentUser}
                                user = {user}
                                comments = {comments}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

            </div>
            {/* <div className="">
                <Header />
                <div>
                    <hr />
                </div>
                <Leader
                    currentUser = {currentUser}
                    users = {user}
                />
                <div>
                    <hr />
                </div>
                <Member 
                    member = {member}
                    user = {user}
                    userSearch = {userSearchUpdate}
                    search={search}
                    page={page}
                    per_page={per_page}
                    max ={max}
                />
               
            </div> */}
            
        </div>
    )
}

export default Team