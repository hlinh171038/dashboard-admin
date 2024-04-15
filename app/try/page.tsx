import {Suspense} from 'react'
import { getAllMail2 } from '../actions/getAllMail2'
import { getAllMail } from '../actions/getAllMail'
import MyComponent from './my-component'

const  Try = async() =>{
    const mail = await getAllMail()
    return (
        <Suspense fallback={<>loading ...</>}>
            <MyComponent 
                mail = {mail}
            />
        </Suspense>
    )
}
export default Try