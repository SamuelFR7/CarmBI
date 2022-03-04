-- CreateTable
CREATE TABLE "weighings" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "depositor" TEXT NOT NULL,
    "lot" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "producer_type" TEXT NOT NULL,
    "input" INTEGER NOT NULL,
    "output" INTEGER NOT NULL,
    "sync" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weighings_pkey" PRIMARY KEY ("id")
);
