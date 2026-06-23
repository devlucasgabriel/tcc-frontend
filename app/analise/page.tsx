"use client";

import { useState } from "react";


import { CompilerAnalysis, CompilerAnalysisResults } from "@/types/analise";
import AnalysisTable from "../components/analise/AnalysisTable";
import FileUpload from "../components/analise/FileUpload";
import MetricsChart from "../components/analise/MetricsChart";

export default function AnalisePage() {
  const [data, setData] = useState<
    CompilerAnalysisResults[]
  >([]);

  const [selectedCompiler, setSelectedCompiler] =
    useState<CompilerAnalysis | null>(null);

  function handleAnalysisFinished(
    result: CompilerAnalysisResults[]
  ) {
    setData(result);

    if (result.length > 0 && result[0].results.length > 0) {
      setSelectedCompiler(result[0].results[0]);
    }
  }

  return (
    <main className="mx-auto max-w-[95rem] p-6">
      <div className="grid gap-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)]">
          <AnalysisTable
            data={data}
            selectedCompiler={
              selectedCompiler?.gccVersion ?? ""
            }
            onSelect={setSelectedCompiler}
          />

          <MetricsChart
            series={
              selectedCompiler
                ? data.map((result) => {
                  const correctGccVersion = result.results.filter((result) => result.gccVersion === selectedCompiler.gccVersion)
                  console.log(selectedCompiler.gccVersion)
                  console.log(result.fileName)
                  console.log(correctGccVersion)
                  return {
                    fileName: result.fileName,
                    calls: correctGccVersion[0].calls
                  }
                })
                : []
            } gccVersion={selectedCompiler?.gccVersion}

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