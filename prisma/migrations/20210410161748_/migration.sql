/*
  Warnings:

  - A unique constraint covering the columns `[locationURL]` on the table `File` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `File` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "File.locationURL_unique" ON "File"("locationURL");

-- CreateIndex
CREATE UNIQUE INDEX "File.key_unique" ON "File"("key");
