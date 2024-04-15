import {Suspense} from 'react'
import { getAllMail2 } from '../actions/getAllMail2'
import { getAllMail } from '../actions/getAllMail'
import MyComponent from './my-component'

const  Try = async() =>{
  
    return (
        <Suspense fallback={<>loading ...</>}>
            <MyComponent 
               
            />
        </Suspense>
    )
}
export default Try