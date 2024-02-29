'use client'

import Header from "@/components/transactions/header"
import Table from "@/components/transactions/table"
import { Product, Transaction, User } from "@prisma/client"

interface TransactionProps {
    transaction : Transaction[] | any
}

const Transaction:React.FC<TransactionProps> = ({
    transaction = [],
}) => {
    console.log(transaction)
    return (
        <div className="flex flex-col items-start justify-start gap-2 w-full px-2">
            {/* header */}
            <div
                className="grid grid-cols-3 items-center justify-between gap-2 w-full"
            >
                {/* budget */}
                <div 
                    className="rounded-md bg-slate-500/60 px-2 py-1 flex flex-col items-start justify-start gap-3"
                >
                    <div>
                        <div className="text-neutral-100 capitalize">budget</div>
                        <div className="text-neutral-400 text-[13px] text-thin">Total budget from this month.</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-neutral-100 text-lg">97.000.000 d</div>
                        <div className="text-[15px] text-neutral-100 capitalize">total balance</div>
                    </div>
                </div>
                {/* extends */}
                <div 
                    className="rounded-md bg-slate-500/60 px-2 py-1 flex flex-col items-start justify-start gap-3"
                >
                    <div>
                        <div className="text-neutral-100 capitalize">Expends</div>
                        <div className="text-neutral-400 text-[13px] text-thin">Total expends from this month.</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-neutral-100 text-lg">97.000.000 d</div>
                        <div className="text-[15px] text-neutral-100 capitalize">Avarage</div>
                    </div>
                </div>
                {/* income */}
                <div 
                    className="rounded-md bg-slate-500/60 px-2 py-1 flex flex-col items-start justify-start gap-3"
                >
                    <div>
                        <div className="text-neutral-100 capitalize">Income</div>
                        <div className="text-neutral-400 text-[13px] text-thin">Total income from this month.</div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="text-neutral-100 text-lg">97.000.000 d</div>
                        <div className="text-[15px] text-neutral-100 capitalize">total Income:</div>
                    </div>
                </div>
            </div>
            {/* table */}
            <div className="w-full rounded-md bg-slate-600 p-2 flex flex-col gap-2">
                <Header />
                <Table 
                    transaction = {transaction}
                />
            </div>
        </div>
    )
}

export default Transaction