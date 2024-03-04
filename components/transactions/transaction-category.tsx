"use client"

import { useRouter } from "next/navigation";

interface TransactionCategoryProps {
    amount: number;
    productId: string[];

}

const TransactionCategory:React.FC<TransactionCategoryProps> = ({
    amount,
    productId = []
}) =>{
    const router = useRouter()
    return (
        <div className="text-neutral-200 text-[15px] px-2">
            <div className="text-[18px] capitalize mx-2 mt-2">Product Information</div>
            <hr/>
            <table className="w-[100%] mx-2 ">
                <tr>
                    <td  className="w-[40%]">Product amount :</td>
                    <td className="text-neutral-400 text-thin">{amount} item</td>
                </tr>
               
                <tr>
                    <td  className="w-[40%]">Comment:</td>
                    <td className="text-neutral-400 text-thin">empty</td>
                </tr>
                
            </table>
            <div className="flex px-2 gap-2">
                    <div  className="w-[40%] ">product code :</div>
                    <div className="flex flex-col gap-2 text-neutral-400 text-thin ">{productId.map((item:string)=>{
                        return <div 
                                    key={item}
                                    className="underline cursor-pointer"
                                    onClick={()=>router.push(`/dashboards/product/${item}`)}
                                >   
                                    {item}
                                </div>
                    })}</div>
                </div>
           
        </div>
    )
}

export default TransactionCategory