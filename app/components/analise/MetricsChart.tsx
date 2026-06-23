"use client";

import { useMemo } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
  type BaseTickContentProps,
} from "recharts";

interface GompCalls {
  gompFunction: string;
  ocorrences: number;
}

interface AnalysisSeries {
  fileName: string;
  calls: GompCalls[];
}

interface Props {
  series?: AnalysisSeries[];
  gccVersion?: string;
  calls?: GompCalls[];
}

const colors = [
  "rgb(96 165 250)",
  "rgb(249 115 22)",
  "rgb(11, 167, 18)"
];

function getChartData(series: AnalysisSeries[]) {
  const functionNames = Array.from(
    new Set(
      series.flatMap((serie) =>
        serie.calls.map((call) => call.gompFunction)
      )
    )
  );

  return functionNames.map((name) => {
    const entry: Record<string, number | string> = {
      gompFunction: name,
    };

    series.forEach((serie) => {
      const call = serie.calls.find(
        (item) => item.gompFunction === name
      );

      entry[serie.fileName] = call?.ocorrences ?? 0;
    });

    return entry;
  });
}

function wrapAxisLabel(value: string, maxLineLength = 12) {
  const parts = value.split("_");
  const lines: string[] = [];
  let currentLine = "";

  for (const part of parts) {
    const nextLine = currentLine ? `${currentLine}_${part}` : part;

    if (nextLine.length <= maxLineLength) {
      currentLine = nextLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = part;
    }
  }

  if (currentLine) {
    const wrapped = currentLine.match(/.{1,12}(?:\s|$)|\S+/g) || [currentLine];
    lines.push(...wrapped.map((line) => line.trim()));
  }

  return lines;
}

function renderPolarAngleAxisTick(props: BaseTickContentProps) {
  const { payload, x, y, textAnchor, verticalAnchor } = props;
  const value = String(payload.value);
  const lines = wrapAxisLabel(value, 12);

  const dominantBaseline =
    verticalAnchor === 'start'
      ? 'hanging'
      : verticalAnchor === 'end'
      ? 'text-after-edge'
      : 'middle';

  return (
    <text
      x={x}
      y={y}
      textAnchor={textAnchor ?? 'middle'}
      dominantBaseline={dominantBaseline}
      fill="#475569"
    >
      {lines.map((line, index) => (
        <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : 14}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

export default function MetricsChart({
  series,
  gccVersion,
  calls,
}: Props) {
  const chartSeries: AnalysisSeries[] = useMemo(() => {
    return series && series.length > 0
      ? series
      : [
          {
            fileName: gccVersion ?? "Arquivo",
            calls: calls ?? [],
          },
        ];
  }, [series, gccVersion, calls]);

  const chartData = useMemo(() => getChartData(chartSeries), [chartSeries]);
  const isSmallFunctionSet = chartData.length <= 4;
  const outerRadius = isSmallFunctionSet ? "45%" : "65%";
  const chartMargin = isSmallFunctionSet
    ? { top: 40, right: 40, bottom: 40, left: 40 }
    : { top: 30, right: 30, bottom: 30, left: 30 };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Funções GOMP - {gccVersion}
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart
            data={chartData}
            outerRadius={outerRadius}
            margin={chartMargin}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="gompFunction"
              tick={renderPolarAngleAxisTick}
              tickLine={false}
            />
            <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} tick={false} />
            <Tooltip />

            {chartSeries.map((serie, index) => (
              <Radar
                key={serie.fileName}
                name={serie.fileName}
                dataKey={serie.fileName}
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.35}
              />
            ))}
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {chartSeries.map((serie, index) => (
          <div
            key={`${index}-${serie.fileName}`}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
          >
            <span
              className="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span>{serie.fileName}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
