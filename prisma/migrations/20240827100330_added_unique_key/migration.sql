/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `balance` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `balance_userId_key` ON `balance`(`userId`);
