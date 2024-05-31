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
        <div className="text-neutral-200 text-[14px] px-2">
            <div className="text-[16px] capitalize  ">Transaction Details</div>
            <hr/>
            <table className="w-[100%] mt-2">
                <tr>
                    <td className="w-[40%]">Label :</td>
                        <td className="text-neutral-400 text-thin">
                            {transportation && transportation === 'Payment' && "Payment (Online Payment, Cash on Delivery, Installment)"}
                            {transportation && transportation === 'E-wallet' && "E-wallet (MoMo Wallet, ZaloPay Wallet)"}
                            {transportation && transportation === 'Card' && "Credit/Debit Card"}
                            {transportation && transportation === 'COD' && "Cash on Delivery (COD)"}
                        </td>
                    
                </tr>
                <tr>
                    <td className="w-[40%]">Payment method :</td>
                    <td className="text-neutral-400 text-thin">{transportation}</td>
                </tr>
                
                <tr>
                    <td className="w-[40%]">Bank :</td>
                    <td className="text-neutral-400 text-thin">{bank ? bank: 'empty'}</td>
                </tr>
                
                <tr>
                    <td className="w-[40%]">Card Type :</td>
                    <td className="text-neutral-400 text-thin">{type ? type: 'empty'}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Status :</td>
                    <td className="text-neutral-400 text-thin">{status}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Tax</td>
                    <td className="text-neutral-400 text-thin">Empty</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Payment sourse :</td>
                    <td className="text-neutral-400 text-thin">{id}</td>
                </tr>
                <tr>
                    <td className="w-[40%]">Payment references :</td>
                    <td className="text-neutral-400 text-thin">{idUser}</td>
                </tr>
            </table>
            
           
        </div>
    )
}

export default TransactionDetail