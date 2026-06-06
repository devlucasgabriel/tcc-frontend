"use client";

import { useState } from "react";


import { CompilerAnalysis } from "@/types/analise";
import AnalysisTable from "../components/analise/AnalysisTable";
import FileUpload from "../components/analise/FileUpload";
import MetricsChart from "../components/analise/MetricsChart";

export default function AnalisePage() {
  const [data, setData] = useState<
    CompilerAnalysis[]
  >([]);

  const [selectedCompiler, setSelectedCompiler] =
    useState<CompilerAnalysis | null>(null);

  function handleAnalysisFinished(
    result: CompilerAnalysis[]
  ) {
    setData(result);

    if (result.length > 0) {
      setSelectedCompiler(result[0]);
    }
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AnalysisTable
            data={data}
            selectedCompiler={
              selectedCompiler?.gccVersion ?? ""
            }
            onSelect={setSelectedCompiler}
          />

          <MetricsChart
            gccVersion={
              selectedCompiler?.gccVersion ??
              "Nenhum compilador"
            }
            calls={
              selectedCompiler?.calls ??
              []
            }
          />
        </div>

        <FileUpload
          onAnalysisFinished={
            handleAnalysisFinished
          }
        />
      </div>
    </main>
  );
}