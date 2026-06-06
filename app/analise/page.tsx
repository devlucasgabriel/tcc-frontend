"use client";

import { useState } from "react";
import AnalysisTable from "../components/analise/AnalysisTable";
import FileUpload from "../components/analise/FileUpload";
import MetricsChart from "../components/analise/MetricsChart";


const data = [
  {
    compiler: "GCC",
    compatible: true,
    functions: [
      {
        name: "GOMP_parallel",
        occurrences: 12,
      },
      {
        name: "GOMP_barrier",
        occurrences: 3,
      },
      {
        name: "GOMP_loop_static_start",
        occurrences: 8,
      },
    ],
  },
  {
    compiler: "LLVM",
    compatible: false,
    functions: [
      {
        name: "GOMP_parallel",
        occurrences: 4,
      },
      {
        name: "GOMP_barrier",
        occurrences: 1,
      },
    ],
  },
];

export default function AnalisePage() {
  const [selectedCompiler, setSelectedCompiler] =
    useState(data[0]);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AnalysisTable
            data={data}
            selectedCompiler={
              selectedCompiler.compiler
            }
            onSelect={setSelectedCompiler}
          />

          <MetricsChart
            compiler={
              selectedCompiler.compiler
            }
            functions={
              selectedCompiler.functions
            }
          />
        </div>

        <FileUpload />
      </div>
    </main>
  );
}