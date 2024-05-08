import { Toaster } from "sonner"

interface Props {
    children:React.ReactNode
}
const layout:React.FC<Props> = ({
    children
}) =>{
    return (
        <div>
            <Toaster />
            {children}
        </div>
    )
}

export default layout