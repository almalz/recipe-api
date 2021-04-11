/*
  Warnings:

  - A unique constraint covering the columns `[recipeId,ingredientId]` on the table `IngredientsOnRecipe` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IngredientsOnRecipe.recipeId_ingredientId_unique" ON "IngredientsOnRecipe"("recipeId", "ingredientId");
