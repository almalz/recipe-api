/*
  Warnings:

  - You are about to drop the column `fileId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `File` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_fileId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "fileId",
ADD COLUMN     "imageId" INTEGER;

-- DropTable
DROP TABLE "File";

-- CreateTable
CREATE TABLE "StorageObject" (
    "id" SERIAL NOT NULL,
    "locationURL" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StorageObject.locationURL_unique" ON "StorageObject"("locationURL");

-- CreateIndex
CREATE UNIQUE INDEX "StorageObject.key_unique" ON "StorageObject"("key");

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("imageId") REFERENCES "StorageObject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
