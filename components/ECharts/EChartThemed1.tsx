import ReactEcharts from "echarts-for-react";
import { EChartsOption } from "echarts-for-react";
import { useTheme } from "next-themes";

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
    <ReactEcharts option={option} style={style} theme={theme} {...props} />
  );
};
