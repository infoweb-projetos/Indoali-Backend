-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rua" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "cidade" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "detalhes" TEXT,
    "id_usuario" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL DEFAULT 'Rolê legal',
    "criador_id" INTEGER NOT NULL,
    "lugare_id" INTEGER NOT NULL,
    "diasemana" TEXT NOT NULL,
    "datahora" DATETIME NOT NULL,
    "usuarios_id" TEXT NOT NULL
);
