import { 
  Request,
  Response
} from 'express';
import { prisma } from '../../prisma';

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
    throw new Error("Preencha o campo título");
  }
  
  if (!body || body == "") {
    throw new Error("Preencha o campo descrição");
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

export const getPostById = async (
  req: Request,
  res: Response
) => {

  const postId = req.params.postId as string;

  if (!postId) {
    throw new Error("Parametro de rota postId não encontrado");
  }

  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    select: {
      ...selectOptions,
      user: {
        select: {
          id: true,
          name: true,
        }
      }
    },
  });

  if (!post) {
    throw new Error("Post não encontrado");
  }

  res.json({ post });

}
