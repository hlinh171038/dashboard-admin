import { getTransactionById } from "@/app/actions/getTransactionById"
import TransactionById from "./TransactionById"
import { getAllProduct2 } from "@/app/actions/getAllProduct2"
import { getuserById } from "@/app/actions/getUserById"
import { getuserById2 } from "@/app/actions/getUserById2"

interface IParams {
    transactionId: string
}

const page = async({params}: {params:IParams}) =>{
    console.log(params.transactionId)
    const transaction = await getTransactionById(params.transactionId)
    const product = await getAllProduct2()
    const user = await getuserById2(transaction && transaction.userId as string)
    console.log(user)
    return (
        <div>
            <TransactionById 
                transaction = {transaction}
                product = {product}
                user = {user}
            />
        </div>
    )
}

export default page