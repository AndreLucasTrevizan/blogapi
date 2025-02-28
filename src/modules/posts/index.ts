import { 
  Request,
  Response
} from 'express';
import { prisma } from '../../prisma';

export interface IPosts {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
      id: number;
      name: string;
  };
}

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
  const page = req.query.page as string ?? '1';
  const limit = req.query.limit as string ?? '5';
  const postId = req.query.postId as string;
  const me = req.query.me as string;

  let posts: IPosts[] = [];

  const postsCount = await prisma.post.count();

  const postsPerPage = Number(limit);

  const amountOfPage = Math.ceil(postsCount / postsPerPage);

  if (postId && postId != "") {
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

    res.json({ post }).end();
    return;
  }

  if (me) {
    posts = await prisma.post.findMany({
      where: { userId: req.user.id, },
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
        createdAt: 'desc'
      },
    });

    res.json({ posts }).end();
    return;
  }

  if (
    !postId &&
    !me
  ) {
    posts = await prisma.post.findMany({
      skip: (Number(page) - 1) * postsPerPage,
      take: postsPerPage,
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
        createdAt: 'desc'
      }
    });
  }

  res.json({ posts, pages: amountOfPage, limit: postsPerPage }).end();
}