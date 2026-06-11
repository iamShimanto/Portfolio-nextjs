/*
  Warnings:

  - You are about to drop the column `logo` on the `Tech` table. All the data in the column will be lost.
  - Added the required column `icon` to the `Tech` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tech" DROP COLUMN "logo",
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "iconColor" TEXT NOT NULL DEFAULT '#ffffff';
