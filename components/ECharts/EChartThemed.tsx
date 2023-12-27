import { useTheme } from "next-themes";
import { ReactECharts } from "./React-ECharts";

// type EChartThemedProps = {
//   option: EChartsOption;
//   style?: React.CSSProperties;
//   notMerge?: EChartsOption;
//   // Add other prop types as needed
// };
export const EChartThemed: React.FC<> = ({ option, style, ...props }) => {
  // const theme = useMantineColorScheme();
  const { theme } = useTheme();

  return (
    <ReactECharts option={option} style={style} theme={theme} {...props} />
  );
};
