/*
  Warnings:

  - You are about to drop the column `dataAtualizacao` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `dataCriacao` on the `Usuario` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "userName" TEXT NOT NULL,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("email", "id", "name", "senha", "userName") SELECT "email", "id", "name", "senha", "userName" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_userName_key" ON "Usuario"("userName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
