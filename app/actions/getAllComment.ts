import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
export async function getAllComment() {
    try {
      const comment = await prisma.comment.findMany({
        include: {
          relly: true,
          heart: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
  
      const safeComment = comment.map((comment) => ({
        ...comment,
        heart: [...comment.heart],
        relly: [...comment.relly],
      }));
      
      return safeComment;
    } catch (error:any) {
      throw new Error(error); // Bổ sung dấu ngoặc kép
    }
  }