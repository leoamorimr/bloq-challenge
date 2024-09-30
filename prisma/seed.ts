import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

async function main() {
  const bloqData = JSON.parse(
    readFileSync(join(__dirname, "bloqs.json"), "utf-8"),
  );
  console.log("Bloq data:", bloqData);

  const lockData = JSON.parse(
    readFileSync(join(__dirname, "lockers.json"), "utf-8"),
  );
  console.log("Locker data:", lockData);

  const rentData = JSON.parse(
    readFileSync(join(__dirname, "rents.json"), "utf-8"),
  );
  console.log("Rent data:", rentData);

  await prisma.rent.deleteMany();
  await prisma.locker.deleteMany();
  await prisma.bloq.deleteMany();

  for (const bloq of bloqData) {
    await prisma.bloq.create({
      data: {
        id: bloq.id,
        title: bloq.title,
        address: bloq.address,
      },
    });
  }
  for (const lock of lockData) {
    await prisma.locker.create({
      data: {
        id: lock.id,
        bloqId: lock.bloqId,
        status: lock.status,
        isOccupied: lock.isOccupied,
      },
    });
  }
  for (const rent of rentData) {
    await prisma.rent.create({
      data: {
        id: rent.id,
        lockerId: rent.lockerId,
        weight: rent.weight,
        size: rent.size,
        status: rent.status,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
