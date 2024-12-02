-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "userName" TEXT NOT NULL,
    "descricao" TEXT NOT NULL DEFAULT 'Olá, eu gosto muito de rolês',
    "datacriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "senha" TEXT NOT NULL
);
INSERT INTO "new_Usuario" ("email", "id", "name", "senha", "userName") SELECT "email", "id", "name", "senha", "userName" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_userName_key" ON "Usuario"("userName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
