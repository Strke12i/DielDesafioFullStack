/*
  Warnings:

  - Added the required column `EndDate` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartDate` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "EndDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "StartDate" TIMESTAMP(3) NOT NULL;
