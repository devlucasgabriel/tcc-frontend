"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Props {
  gccVersion: string;
  calls: {
    gompFunction: string;
    ocorrences: number;
  }[];
}

export default function MetricsChart({
  gccVersion,
  calls,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Funções GOMP - {gccVersion}
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={calls ?? []} barCategoryGap='20%'>
            <XAxis dataKey="gompFunction" />

            <YAxis />

            <Bar 
              dataKey="ocorrences"
              barSize={60}
              fill='rgb(96 165 250)'
              radius={[4, 4, 0, 0]}  
            />

            <Tooltip
            cursor={{
              fill: 'white'
            }}

            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}