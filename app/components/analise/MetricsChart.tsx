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
  compiler: string;
  functions: {
    name: string;
    occurrences: number;
  }[];
}

export default function MetricsChart({
  compiler,
  functions,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Funções GOMP - {compiler}
      </h2>

      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={functions} barCategoryGap='20%'>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar 
              dataKey="occurrences"
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