import React from 'react'
import Profile from './Profile'
import { getUserByEmail } from '@/app/actions/getUserByEmail'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { getAllUser2 } from '@/app/actions/getAllUser2'

const page = async () => {
    const currentUser = await getServerSession(authOptions);
    const userByEmail = await getUserByEmail(currentUser?.user?.email)
    const users = await getAllUser2()
  return (
    <div>
        <Profile userById = {userByEmail} user = {users} currentUser={currentUser} />
    </div>
  )
}

export default page
