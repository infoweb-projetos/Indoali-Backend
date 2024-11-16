-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Amizade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_emissor" INTEGER NOT NULL,
    "id_receptor" INTEGER NOT NULL,
    "aceito" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Amizade" ("aceito", "id", "id_emissor", "id_receptor") SELECT "aceito", "id", "id_emissor", "id_receptor" FROM "Amizade";
DROP TABLE "Amizade";
ALTER TABLE "new_Amizade" RENAME TO "Amizade";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
