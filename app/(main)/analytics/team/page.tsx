import { getAllUser2 } from "@/app/actions/getAllUser2"
import Team from "./Team"
import { getAlluser } from "@/app/actions/getAllUser"
import { getServerSession } from "next-auth"
//import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAllComment } from "@/app/actions/getAllComment"
import { getAllReply } from "@/app/actions/getAllReply"
import { getAllHeartRelly } from "@/app/actions/getAllHeartReply"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
//import authOptions from "@/app/api/auth/[...nextauth]/options"

const page = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) =>{
    
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10;
    const comment_page = typeof searchParams.comment_page === 'string' ? Number(searchParams.comment_page): 1
    const comment_per_page = typeof searchParams.comment_per_page === 'string' ? Number(searchParams.comment_per_page):5
    const sort = typeof searchParams.sort === 'string' ? searchParams.sort : '' 
    const updated = typeof searchParams.updated === 'string' ? searchParams.updated : ''
    const removed = typeof searchParams.removed === 'string' ? searchParams.removed : ''
    const heart = typeof searchParams.heart === 'string' ? searchParams.heart : ''
    const add = typeof searchParams.add === 'string' ? searchParams.add:''
    const admin = typeof searchParams.admin === 'string' ? searchParams.admin: ''; 
    const search_admin = typeof searchParams.search_admin === 'string' ? searchParams.search_admin: ''
    const page_admin = typeof searchParams.page_admin === 'string' ? Number(searchParams.page_admin) : 1
    const per_page_admin = typeof searchParams.per_page_admin === 'string' ? Number(searchParams.per_page_admin) : 10;  
    const userSearch = await getAlluser({search})
    const user = await getAllUser2()
    const user2 = await getAllUser2()
    const currentUser = await getServerSession(authOptions)
    const comments = await getAllComment()
    const relly = await getAllReply()
    const heartRelly = await getAllHeartRelly()
    
    
    //console.log(user)
    return (
        <div>
            <Team 
                user = {user}
                userSearch={userSearch}
                search = {search}
                search_admin = {search_admin}
                admin ={admin}
                page= {page}
                per_page ={per_page}
                comment_page = {comment_page}
                comment_per_page = {comment_per_page}
                sort ={sort}
                removed = {removed}
                heart = {heart}
                updated = {updated}
                add = {add}
                page_admin ={page_admin}
                per_page_admin ={per_page_admin}
                currentUser = {currentUser}
                comments ={comments}
                relly ={relly}
                heartRelly = {heartRelly}
            />
        </div>
    )
}

export default page