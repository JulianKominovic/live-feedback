import { Badge } from "../atoms/Badge";
import { IVitalsScore } from "perfume.js";
import { metricScoreToColorScheme } from "./CommandMenu";

export const MetricItem = ({
  metric,
}: {
  metric: {
    name: string;
    value: string;
    score: IVitalsScore;
  };
}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        gap: 8,
      }}
    >
      <p
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          margin: 0,
        }}
      >
        {metric.name}
      </p>
      <Badge
        fontSize="12px"
        padding="2px 6px"
        colorScheme={metricScoreToColorScheme(metric.score)}
      >
        {metric.value}
      </Badge>
    </div>
  );
};
