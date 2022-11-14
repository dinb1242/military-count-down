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

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);
