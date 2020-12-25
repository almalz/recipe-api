-- CreateEnum
CREATE TYPE "System" AS ENUM ('METRIC', 'US');

-- CreateTable
CREATE TABLE "Recipe" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "prepTime" INTEGER,
    "cookingTime" INTEGER,
    "instructionId" INTEGER NOT NULL,
    "imageUrl" TEXT,
    "sourceUrl" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
"id" SERIAL,
    "name" TEXT NOT NULL,
    "alternativeingredientId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IngredientsOnRecipe" (
"id" SERIAL,
    "recipeId" INTEGER NOT NULL,
    "ingredientId" INTEGER,
    "base_amout" INTEGER,
    "unitId" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Unit" (
"id" SERIAL,
    "system" "System" NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
"id" SERIAL,
    "name" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instruction" (
"id" SERIAL,
    "recipeId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructionStep" (
"id" SERIAL,
    "body" TEXT NOT NULL,
    "instructionId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient.name_unique" ON "Ingredient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Unit.symbol_unique" ON "Unit"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Unit.name_unique" ON "Unit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag.name_unique" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToTag_AB_unique" ON "_RecipeToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToTag_B_index" ON "_RecipeToTag"("B");

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY("instructionId")REFERENCES "Instruction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD FOREIGN KEY("alternativeingredientId")REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnRecipe" ADD FOREIGN KEY("recipeId")REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnRecipe" ADD FOREIGN KEY("ingredientId")REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsOnRecipe" ADD FOREIGN KEY("unitId")REFERENCES "Unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructionStep" ADD FOREIGN KEY("instructionId")REFERENCES "Instruction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD FOREIGN KEY("A")REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToTag" ADD FOREIGN KEY("B")REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
