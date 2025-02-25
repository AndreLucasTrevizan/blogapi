import { 
  Request,
  Response
} from 'express';
import { prisma } from '../../prisma';
import { hash } from 'bcryptjs';

const getUserByEmail = async (pUserEmail: string) => {
  const user = await prisma.user.findFirst({
    where: { email: pUserEmail }
  });

  return user;
}

export const createUser = async (
  req: Request,
  res: Response
) => {

  const name = req.body.name as string;
  const email = req.body.email as string;
  const password = req.body.password as string;

  if (!name || name == "") {
    throw new Error("Preencha o campo nome");
  }
  
  if (!email || email == "") {
    throw new Error("Preencha o campo nome");
  }

  if (!email.includes('@')) {
    throw new Error("Insira um e-mail válido");
  }
  
  if (!password || password == "") {
    throw new Error("Preencha o campo nome");
  }

  const userWithDuplicateEmail = await getUserByEmail(email);

  if (userWithDuplicateEmail) {
    throw new Error("E-mail já está sendo usado");
  }

  const hashedPassword = await hash(password, 8);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  });

  res.json().end();
}
