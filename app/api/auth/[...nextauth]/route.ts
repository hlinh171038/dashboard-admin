// import NextAuth from "next-auth";
// import authOptions from "./options";


// const handler = NextAuth(authOptions);
// export {handler as GET, handler as POST}

import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import authOptions from './options';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    await NextAuth(req, res, authOptions);
}

export default handler;