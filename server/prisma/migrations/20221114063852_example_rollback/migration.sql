/*
  Warnings:

  - You are about to drop the `ExampleTestJeho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExampleTestJeho";

-- CreateTable
CREATE TABLE "Example" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);
