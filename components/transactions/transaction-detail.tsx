"use client"
interface TransactionProps {
    amount: number;
    transportation: string;
    type: string;
    bank: string;
    status: string;
    id: string,
    idUser: string,
}
const TransactionDetail:React.FC<TransactionProps> = ({
    amount,
    transportation,
    type,
    bank,
    status,
    id,
    idUser
}) =>{
    return (
        <div className="text-neutral-200 text-[15px] px-2">
            <div className="text-[18px] capitalize mx-2 mt-2">Transaction Details</div>
            <hr/>
            <table className="w-[100%] mx-2">
                <tr>
                    <td className="w-[40%]">Label :</td>
                    <td className="text-neutral-400 text-thin">{transportation}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Payment method :</td>
                    <td className="text-neutral-400 text-thin">{transportation}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Payment sourse :</td>
                    <td className="text-neutral-400 text-thin">{id}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Payment references :</td>
                    <td className="text-neutral-400 text-thin">{idUser}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Bank :</td>
                    <td className="text-neutral-400 text-thin">{bank ? bank: 'empty'}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Status :</td>
                    <td className="text-neutral-400 text-thin">{status}</td>
                </tr>
            </table>
            
           
        </div>
    )
}

export default TransactionDetail