import { useTheme } from "next-themes";
import { ReactECharts } from "./React-ECharts";
import { EChartsOption } from "echarts-for-react";

type EChartThemedProps = {
  option: EChartsOption;
  style?: React.CSSProperties;
  notMerge?: EChartsOption;
  // Add other prop types as needed
};
export const EChartThemed: React.FC<EChartThemedProps> = ({
  option,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <ReactECharts
      option={option}
      style={style}
      theme={theme as "light" | "dark" | undefined}
      {...props}
    />
  );
};
