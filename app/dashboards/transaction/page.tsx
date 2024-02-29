import { getAllTransaction } from "@/app/actions/getAllTransaction"
import Transaction from "./Transaction"
import { getAllUser2 } from "@/app/actions/getAllUser2"
import { getAllProduct2 } from "@/app/actions/getAllProduct2"

const TransactionPage = async() => {
    const transaction = await getAllTransaction()

    return (
        <Transaction 
            transaction = {transaction}
        />
    )
}

export default TransactionPage