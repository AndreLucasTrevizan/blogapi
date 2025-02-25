import { 
  Request,
  Response
} from 'express';
import { prisma } from '../../prisma';

const selectOptions = {
  id: true,
  body: true,
  user: {
    select: {
      id: true,
      name: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};

export const createComment = async (
  req: Request,
  res: Response
) => {
  const body = req.body.body as string;
  const postId = req.body.postId as string;
  
  if (!body || body == "") {
    throw new Error("Preencha o campo body");
  }
  
  if (!postId || postId == "") {
    throw new Error("Preencha o campo postId");
  }

  const post = await prisma.post.findFirst({
    where: { id: Number(postId) }
  });

  if (!post) {
    throw new Error("Post invalido ou não existe");
  }
  
  await prisma.comment.create({
    data: {
      body,
      userId: req.user.id,
      postId: post.id,
    },
  });

  res.json().end();
}

export const listComments = async (
  req: Request,
  res: Response
) => {

  const postId = req.params.postId as string;

  if (!postId) {
    throw new Error("Precisamos que informe o ID do Post");
  }

  const post = await prisma.post.findFirst({
    where: { id: Number(postId) }
  });

  if (!post) {
    throw new Error("Post invalido");
  }

  const comments = await prisma.comment.findMany({
    where: { postId: post.id, },
    select: selectOptions,
  });

  res.json({ comments });
}
