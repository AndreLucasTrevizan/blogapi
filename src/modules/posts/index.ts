import { 
  Request,
  Response
} from 'express';
import { prisma } from '../../prisma';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const selectOptions = {
  id: true,
  title: true,
  body: true,
  createdAt: true,
  updatedAt: true,
};

export const createPost = async (
  req: Request,
  res: Response
) => {

  const title = req.body.title as string;
  const body = req.body.body as string;

  if (!title || title == "") {
    throw new Error("Preencha o campo nome");
  }
  
  if (!body || body == "") {
    throw new Error("Preencha o campo nome");
  }
  
  await prisma.post.create({
    data: {
      title,
      body,
      userId: req.user.id,
    },
  });

  res.json().end();
}

export const listPosts = async (
  req: Request,
  res: Response
) => {

  const posts = await prisma.post.findMany({
    select: {
      ...selectOptions,
      user: {
        select: {
          id: true,
          name: true,
        }
      }
    },
    orderBy: {
      id: 'desc'
    }
  });

  res.json({ posts }).end();
}
