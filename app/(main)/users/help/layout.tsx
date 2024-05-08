import { Toaster } from "sonner"

const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Toaster />
            {children}
        </div>
    )
}

export default layout