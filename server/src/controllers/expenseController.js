const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getExpensesByCategory = async (req, res) => {
  try {
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
      {
        orderBy: {
          date: "desc",
        },
      }
    );
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
      (item) => ({
        ...item,
        amount: item.amount.toString(),
      })
    );

    res.json(expenseByCategorySummary);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving Expenses by category" });
  }
};
module.exports = { getExpensesByCategory };
