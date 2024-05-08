import { getAllDiscount2 } from "@/app/actions/getAllDiscount2"
import DiscountDetail from "./DiscountDetail"

interface IParams {
    discoutId: string
}
const page = async ({params}:{params:IParams}) =>{
    //console.log(params.discoutId)

    const discount = await getAllDiscount2()
    return (
        <div>
            <DiscountDetail
                discount = {discount}
                id={ params.discoutId && params.discoutId}
            />
        </div>
    )
}

export default page