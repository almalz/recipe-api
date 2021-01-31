-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "userId" INTEGER;

-- CreateTable
CREATE TABLE "User" (
"id" SERIAL,
    "firebaseId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.firebaseId_unique" ON "User"("firebaseId");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
