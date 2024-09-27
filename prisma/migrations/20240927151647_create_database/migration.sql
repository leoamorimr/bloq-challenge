-- CreateTable
CREATE TABLE "Bloq" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Locker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "bloqId" TEXT NOT NULL,
    CONSTRAINT "Locker_bloqId_fkey" FOREIGN KEY ("bloqId") REFERENCES "Bloq" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lockerId" TEXT NOT NULL,
    "weight" REAL NOT NULL,
    "size" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    CONSTRAINT "Rent_lockerId_fkey" FOREIGN KEY ("lockerId") REFERENCES "Locker" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
