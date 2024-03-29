import { getAlluser } from "@/app/actions/getAllUser";
import Customer from "./Customer"

const CustomerPage = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) =>{
    const search =
    typeof searchParams.search === 'string' ? searchParams.search : ''
    const page = typeof searchParams.page ==='string' ? Number(searchParams.page) : 1;
    const per_page = typeof searchParams.per_page ==='string' ? Number(searchParams.per_page): 10
    const role = typeof searchParams.role === 'string' ? searchParams.role: ''
    const action = typeof searchParams.action === 'string' ? searchParams.action: ''
    const start = typeof searchParams.start === 'string' ? searchParams.start: ''
    const end = typeof searchParams.end === 'string' ? searchParams.end: ''
    const users = await getAlluser({search,role,action,start,end})
    return (
        <Customer 
            users = {users}
            page={page}
            per_page ={per_page}
            search ={search}
        />
    )
}
export default CustomerPage