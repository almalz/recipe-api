/*
  Warnings:

  - You are about to drop the column `imageId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `StorageObject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_imageId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "imageId",
ADD COLUMN     "fileId" INTEGER;

-- DropTable
DROP TABLE "StorageObject";

-- CreateTable
CREATE TABLE "File" (
    "id" SERIAL NOT NULL,
    "locationURL" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "File.locationURL_unique" ON "File"("locationURL");

-- CreateIndex
CREATE UNIQUE INDEX "File.key_unique" ON "File"("key");

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
