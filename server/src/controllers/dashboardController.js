const express = require("express");
const prismaClient = require("@prisma/client");

const prisma = new prismaClient();

export const getDashboardMetrics = async (res, req) => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });
    const expenseByCategorySummarRaw =
      await prisma.expenseByCategorySummaryRaw.findMany({
        take: 5,
        orderBy: {
          date: "desc",
        },
      });
    const expenseByCategorySummary =
      await prisma.expenseByCategorySummarRaw.map((item) => ({
        ...item,
        amount: item.amount.toString(),
      }));

    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    res.status(500).json({ error: "Error Receiving dashboard metric" });
  }
};
