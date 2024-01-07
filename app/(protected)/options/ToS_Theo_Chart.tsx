import EChartToS_Theo_Comp from "@/components/ECharts/ToS/EChartToS_Theo";
import { Card } from "@/components/ui/card";

export const ToS_Theo_Chart = ({ params }) => {
  const tickers = ["$SPX.X", "$VIX.X", "$NDX.X", "SPY"];

  const TheoCharts = tickers.map((ticker) => {
    const newParams = { ...params, und_symbol: ticker };
    return (
      <Card>
        <EChartToS_Theo_Comp key={ticker} params={newParams} />
      </Card>
    );
  });

  return (
    <div className="mx-2.5 grid gap-4 screen-1200px:grid-cols-2 screen-1200px:mx-28">
      {TheoCharts}
    </div>
  );
};
