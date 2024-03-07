import { getAllUser2 } from "@/app/actions/getAllUser2"
import Team from "./Team"
import { getAlluser } from "@/app/actions/getAllUser"

const page = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) =>{
    
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 5
    console.log(search)
    const userSearch = await getAlluser({search})
    const user = await getAllUser2()
    
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
            />
        </div>
    )
}

export default page