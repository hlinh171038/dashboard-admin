import { Toaster } from "@/components/ui/sonner"


const layout = ({children}:{children:React.ReactNode}) =>{
    return (
        <div>
            <Toaster />
            {children}
        </div>
    )
}

export default layout