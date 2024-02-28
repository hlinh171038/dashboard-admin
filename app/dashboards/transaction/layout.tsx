import { Toaster } from "sonner"

const TransactionLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Toaster />
            {children}
        </div>
    )
}

export default TransactionLayout