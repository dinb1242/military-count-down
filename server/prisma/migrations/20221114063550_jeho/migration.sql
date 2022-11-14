/*
  Warnings:

  - You are about to drop the `ExampleTest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExampleTest";

-- CreateTable
CREATE TABLE "ExampleTestJeho" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,

    CONSTRAINT "ExampleTestJeho_pkey" PRIMARY KEY ("id")
);
