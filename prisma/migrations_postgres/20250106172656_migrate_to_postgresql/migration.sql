-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "userName" TEXT NOT NULL,
    "descricao" TEXT NOT NULL DEFAULT 'Olá, eu gosto muito de rolês',
    "datacriacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lugare" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "name" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT,
    "horarios" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,

    CONSTRAINT "Lugare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorito" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_lugar" INTEGER NOT NULL,

    CONSTRAINT "Favorito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Amizade" (
    "id" SERIAL NOT NULL,
    "id_emissor" INTEGER NOT NULL,
    "id_receptor" INTEGER NOT NULL,
    "aceito" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Amizade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" SERIAL NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "detalhes" TEXT,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL DEFAULT 'Rolê legal',
    "id_criador" INTEGER NOT NULL,
    "id_lugar" INTEGER NOT NULL,
    "diasemana" TEXT NOT NULL,
    "datahora" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsuarioRole" (
    "id" SERIAL NOT NULL,
    "id_role" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "aceito" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UsuarioRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_userName_key" ON "Usuario"("userName");
