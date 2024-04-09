import { getAllTransaction } from "@/app/actions/getAllTransaction"

import { getAllUser2 } from "@/app/actions/getAllUser2"
import { getAllProduct2 } from "@/app/actions/getAllProduct2"
import { getAllTransaction2 } from "@/app/actions/getAllTransaction2"
import TransactionPage from "./Transaction"



const page = async({searchParams}: {searchParams:{[key:string] : string[] | string | undefined}}) => {

    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    const status = typeof searchParams.status === 'string' ? searchParams.status : ''
    const payment = typeof searchParams.payment === 'string' ? searchParams.payment : ''
    const startDate = typeof searchParams.startDate === 'string' ?  searchParams.startDate : ''
    const endDate = typeof searchParams.endDate === 'string' ? searchParams.endDate : ''
    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10
    const transaction = await getAllTransaction({search,status,payment,startDate,endDate})
    const transaction2 = await getAllTransaction2()

    return (
        <TransactionPage
            transaction = {transaction}
            transaction2 = {transaction2}
            search = {search}
            status = {status}
            payment = {payment}
            startDate = {startDate}
            endDate = {endDate}
            page={page}
            per_page ={per_page}
        />
    )
}

export default page