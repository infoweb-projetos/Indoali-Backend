import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

const seed = async () => {
  // await prisma.tarefa.deleteMany({});

  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  const user1 = await prisma.usuario.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      senha: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      userName: 'Sabin Adams',
      senha: passwordSabin,
    },
  });

  const user2 = await prisma.usuario.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      senha: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      userName: 'Alex Ruheni',
      senha: passwordAlex,
    },
  });

  // const tarefa = await prisma.tarefa.create({
  //   data: {
  //     titulo: 'Adicionar autenticação por email e senha na API',
  //   },
  // });
  // console.log(tarefa);

  // const tarefas = await prisma.tarefa.createManyAndReturn({
  //   data: [
  //     {
  //       titulo: 'Criar projeto Nestjs',
  //       concluido: true,
  //     },
  //     {
  //       titulo: 'Criar endpoints de CRUD para tarefas',
  //       concluido: true,
  //     },
  //     {
  //       titulo: 'Adicionar mecanismo de persistência',
  //       descricao: 'prisma orm https://www.prisma.io/docs/',
  //     },
  //   ],
  // });

  // console.log(tarefas);
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });