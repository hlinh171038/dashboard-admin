import { Toaster } from "sonner"
export const metadata = {
    title: "Dashboard Inside | Help",
    description: "My description",
  }

const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Toaster />
            {children}
        </div>
    )
}

export default layout