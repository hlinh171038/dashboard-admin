import { Toaster } from "sonner"



export const metadata = {
    title: "Dashboard Inside | Dashboard",
    description: "My description",
  }
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