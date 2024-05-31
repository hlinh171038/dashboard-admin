"use client"
interface TransactionDateProps {
    time:string;
}
const TransactionDate:React.FC<TransactionDateProps> = ({
    time
}) => {
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const event = new Date(new Date(time).getTime() + 24*60*60*1000);
    const r=event.toLocaleTimeString('en-US')
    const date = event.toLocaleDateString("en-US",options as any);
    return (
        <div className="text-neutral-200 text-[14px] px-2">
            <div className="text-[16px] capitalize font-semibold  mt-2">Transaction Date </div>
            <hr/>
            <table className="w-[100%]  mt-2">
                <tr>
                    <td  className="w-[40%]"> Date :</td>
                    <td className="text-neutral-400 text-thin">{date}</td>
                </tr>
               
                <tr>
                    <td  className="w-[40%]">Time :</td>
                    <td className="text-neutral-400 text-thin">{r}</td>
                </tr>
            </table>
            
           
        </div>
    )
}

export default TransactionDate