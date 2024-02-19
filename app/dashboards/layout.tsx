import { Toaster } from "sonner"



const Layout = (
    {
        children
    }:
    {
        children:React.ReactNode
    }
) =>{
    return (
        <div>
            <Toaster />
            {children}
        </div>
    )
}

export default Layout