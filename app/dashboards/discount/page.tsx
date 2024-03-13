import { getAllDiscount } from "@/app/actions/getAllDiscount"
import Discount from "./Discount"

const page = async ({searchParams}:{searchParams:{[key: string]: string[] | string | undefined}}) =>{

    console.log(searchParams.search)
    const search = typeof(searchParams.search) === 'string' ?searchParams.search : '' 
    const discount = await getAllDiscount({search})
    return (
        <div>
            <Discount 
                discount = {discount}
            />
        </div>
    )
}

export default page