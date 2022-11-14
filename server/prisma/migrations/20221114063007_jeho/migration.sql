/*
  Warnings:

  - You are about to drop the `Examples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Examples";

-- CreateTable
CREATE TABLE "Jeho" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,

    CONSTRAINT "Jeho_pkey" PRIMARY KEY ("id")
);
