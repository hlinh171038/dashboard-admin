

import Add from "./TeamAdd"

const page = async({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}) => {

    const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    const per_page = typeof searchParams.per_page === 'string' ? Number(searchParams.per_page) : 10
    const search = typeof searchParams.search === 'string' ? searchParams.search : ''
    return (
        <Add 
            page = {page}
            per_page ={per_page}
            search = {search}
        />
    )
}

export default page
