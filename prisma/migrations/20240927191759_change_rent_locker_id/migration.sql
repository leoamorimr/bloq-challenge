-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Rent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lockerId" TEXT,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Rent_lockerId_fkey" FOREIGN KEY ("lockerId") REFERENCES "Locker" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Rent" ("id", "lockerId", "size", "status", "weight") SELECT "id", "lockerId", "size", "status", "weight" FROM "Rent";
DROP TABLE "Rent";
ALTER TABLE "new_Rent" RENAME TO "Rent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
