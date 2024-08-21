import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useGetDashboardMetricsQuery } from "../state/api";

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const CardExpenseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();

  const expenseByCategorySummary = data?.expenseByCategorySummary || [];

  const expenseSums = expenseByCategorySummary.reduce((acc, item) => {
    const category = item.category + "Expenses";
    const amount = parseInt(item.amount, 10);
    if (!acc[category]) acc[category] = 0;
    acc[category] += amount;
    return acc;
  }, {});

  const expenseCategories = Object.entries(expenseSums).map(
    ([name, value]) => ({
      name,
      value,
    })
  );
  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading....</div>
      ) : (
        <>
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Expense Summary
            </h2>
            <hr />
          </div>

          <div className="xl:flex justify-between pr-7">
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884D8"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>

                <div className="absolute top-1/2 left-1/2 tansform -translate-x-1/2  -translate-y-1/2 text-center basis 2/5">
                  <span className="font-bold text-xl">
                    ${formattedTotalExpenses}
                  </span>
                </div>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CardExpenseSummary;
