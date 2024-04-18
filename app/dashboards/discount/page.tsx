import { getAllDiscount } from "@/app/actions/getAllDiscount"
import Discount from "./Discount"
import { getAllUser2 } from "@/app/actions/getAllUser2"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getAllDiscount2 } from "@/app/actions/getAllDiscount2"

const page = async ({searchParams}:{searchParams:{[key: string]: string[] | string | undefined}}) =>{

    const search = typeof(searchParams.search) === 'string' ?searchParams.search : '' 
    const type = typeof(searchParams.type) === 'string' ? searchParams.type: ''
    const percent = typeof(searchParams.percent) === 'string' ? Number(searchParams.percent) : 0
    const countFrom = typeof(searchParams.countFrom) === 'string' ? Number(searchParams.countFrom) : 0
    const countTo = typeof(searchParams.countTo) === 'string' ? Number(searchParams.countTo) : 0
    const dayStart = typeof(searchParams.dayStart) === 'string' ? searchParams.dayStart : ''
    const dayEnd = typeof(searchParams.dayEnd) === 'string' ? searchParams.dayEnd : ''
    const page = typeof(searchParams.page) === 'string' ? Number(searchParams.page): 1
    const per_page = typeof(searchParams.per_page) === 'string' ? Number(searchParams.per_page): 10
    const discount = await getAllDiscount({search,type,percent, countFrom, countTo, dayStart, dayEnd})
    const users = await getAllUser2()
    const currentUser = await getServerSession(authOptions)
    const discount2 = await getAllDiscount2()
    return (
        <div>
            <Discount 
                discount = {discount}
                discount2 ={discount2}
                search = {search}
                type={type}
                percent ={percent}
                countFrom = {countFrom}
                countTo = {countTo}
                dayStart = {dayStart}
                dayEnd = {dayEnd}
                page={page}
                per_page = {per_page}
                users ={users}
                currentUser = {currentUser}
            />
        </div>
    )
}

export default page