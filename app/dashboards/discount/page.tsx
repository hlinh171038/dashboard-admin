import { getAllDiscount } from "@/app/actions/getAllDiscount"
import Discount from "./Discount"

const page = async ({searchParams}:{searchParams:{[key: string]: string[] | string | undefined}}) =>{

    console.log(searchParams.search)
    const search = typeof(searchParams.search) === 'string' ?searchParams.search : '' 
    const type = typeof(searchParams.type) === 'string' ? searchParams.type: ''
    const percent = typeof(searchParams.percent) === 'string' ? Number(searchParams.percent) : 0
    const countFrom = typeof(searchParams.countFrom) === 'string' ? Number(searchParams.countFrom) : 0
    const countTo = typeof(searchParams.countTo) === 'string' ? Number(searchParams.countTo) : 0
    const dayStart = typeof(searchParams.dayStart) === 'string' ? searchParams.dayStart : ''
    const dayEnd = typeof(searchParams.dayEnd) === 'string' ? searchParams.dayEnd : ''
    const discount = await getAllDiscount({search,type,percent, countFrom, countTo, dayStart, dayEnd})
    return (
        <div>
            <Discount 
                discount = {discount}
                search = {search}
            />
        </div>
    )
}

export default page