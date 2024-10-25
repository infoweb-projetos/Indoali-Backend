-- CreateTable
CREATE TABLE "Favorito" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_lugar" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Amizade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_emissor" INTEGER NOT NULL,
    "id_receptor" INTEGER NOT NULL,
    "aceito" BOOLEAN NOT NULL
);
