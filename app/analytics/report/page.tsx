import { getAllUser2 } from "@/app/actions/getAllUser2"
import Report from "./Report"
import { getAllProduct2 } from "@/app/actions/getAllProduct2"

import { getAllTransaction2 } from "@/app/actions/getAllTransaction2"
import { getServerSession } from "next-auth"
import { getAllComment } from "@/app/actions/getAllComment"
import { getAllMail } from "@/app/actions/getAllMail"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getAllMail2 } from "@/app/actions/getAllMail2"
import { getAllTempMail } from "@/app/actions/getAllTempMail"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const page = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) =>{

    
    const user = await getAllUser2()
    const product = await getAllProduct2()
    const transaction = await getAllTransaction2()
    const comment = await getAllComment()
   
    const currentUser = await getServerSession(authOptions)

    // search params
    const search = typeof searchParams.search === 'string' ? searchParams.search : '';
    const role = typeof searchParams.role === 'string' ? searchParams.role : '';
    const status = typeof searchParams.status === 'string' ? searchParams.status: '';
    const start = typeof searchParams.start === 'string' ? searchParams.start : '';
    const end = typeof searchParams.end === 'string' ? searchParams.end : '';
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1;
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10;

    const mail = await getAllMail2({search,role,status,start,end})
    const mail2 = await getAllMail()
    const tempMail = await getAllTempMail()
   
   
    
    return (
        <div>
           <Report 
                user={user}
                product ={product}
                transaction = {transaction}
                comment = {comment}
                search = {search}
                page ={page}
                per_page ={per_page}
                status = {status}
                role ={role}
                start ={start}
                end ={end}
                mail = {mail}
                mail2 ={mail2}
                currentUser = {currentUser}
                tempMail ={tempMail}
           />
        </div>
    )
}

export default page