/*
  Warnings:

  - You are about to drop the column `code` on the `Locker` table. All the data in the column will be lost.
  - You are about to alter the column `weight` on the `Rent` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `isOccupied` to the `Locker` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Locker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Locker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bloqId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "isOccupied" BOOLEAN NOT NULL,
    CONSTRAINT "Locker_bloqId_fkey" FOREIGN KEY ("bloqId") REFERENCES "Bloq" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Locker" ("bloqId", "id") SELECT "bloqId", "id" FROM "Locker";
DROP TABLE "Locker";
ALTER TABLE "new_Locker" RENAME TO "Locker";
CREATE TABLE "new_Rent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lockerId" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Rent_lockerId_fkey" FOREIGN KEY ("lockerId") REFERENCES "Locker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rent" ("id", "lockerId", "size", "status", "weight") SELECT "id", "lockerId", "size", "status", "weight" FROM "Rent";
DROP TABLE "Rent";
ALTER TABLE "new_Rent" RENAME TO "Rent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
