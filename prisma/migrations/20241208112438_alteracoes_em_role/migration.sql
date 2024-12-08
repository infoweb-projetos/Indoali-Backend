/*
  Warnings:

  - You are about to drop the column `criador_id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `lugare_id` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `usuarios_id` on the `Role` table. All the data in the column will be lost.
  - Added the required column `id_criador` to the `Role` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_lugar` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Lugare" ADD COLUMN "facebook" TEXT;
ALTER TABLE "Lugare" ADD COLUMN "horarios" TEXT;
ALTER TABLE "Lugare" ADD COLUMN "instagram" TEXT;
ALTER TABLE "Lugare" ADD COLUMN "numero" TEXT;

-- CreateTable
CREATE TABLE "UsuarioRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_role" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "aceito" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL DEFAULT 'Rolê legal',
    "id_criador" INTEGER NOT NULL,
    "id_lugar" INTEGER NOT NULL,
    "diasemana" TEXT NOT NULL,
    "datahora" DATETIME NOT NULL
);
INSERT INTO "new_Role" ("datahora", "diasemana", "id", "titulo") SELECT "datahora", "diasemana", "id", "titulo" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
