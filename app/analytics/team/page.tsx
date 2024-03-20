import { getAllUser2 } from "@/app/actions/getAllUser2"
import Team from "./Team"
import { getAlluser } from "@/app/actions/getAllUser"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getAllComment } from "@/app/actions/getAllComment"

const page = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) =>{
    
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 5
    console.log(search)
    const userSearch = await getAlluser({search})
    const user = await getAllUser2()
    const currentUser = await getServerSession(authOptions)
    const comments = await getAllComment()
    
    console.log( userSearch)
    //console.log(user)
    return (
        <div>
            <Team 
                user = {user}
                userSearch={userSearch}
                search = {search}
                page= {page}
                per_page ={per_page}
                currentUser = {currentUser}
                comments ={comments}
            />
        </div>
    )
}

export default page