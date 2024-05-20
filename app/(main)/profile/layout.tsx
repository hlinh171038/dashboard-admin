import { Toaster } from "sonner"




const Layout = async (
    {
        children
    }:
    {
        children:React.ReactNode
    }
) =>{

    //const session = await getServerSession(authOptions)

    return (
        <div>
            <Toaster />
         
              {children}

        </div>
    )
}

export default Layout