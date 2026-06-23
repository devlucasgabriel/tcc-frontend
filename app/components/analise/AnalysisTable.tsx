"use client";

import { CompilerAnalysisResults, CompilerAnalysis } from "@/types/analise";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Props {
  data: CompilerAnalysisResults[];
  selectedCompiler: string;
  onSelect: (compiler: CompilerAnalysis | null) => void;
}

export default function AnalysisTable({
  data,
  selectedCompiler,
  onSelect,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>(
    data.length > 0 ? data[0].fileName : ""
  );

  useEffect(() => {
    setActiveTab(data.length > 0 ? data[0].fileName : "");
  }, [data]);

  const fileNames = Array.from(new Set(data.map((item) => item.fileName)));
  const currentData = data.find((item) => item.fileName === activeTab);
  const firstCompatibleIndex = currentData?.results.findIndex(
    (compiler) => compiler.compatible
  ) ?? -1;
  const firstCompatibleCompiler =
    currentData?.results.find((compiler) => compiler.compatible) ?? null;

  useEffect(() => {
    if (!currentData) return;

    const selectedCompilerInCurrentData = currentData.results.find(
      (compiler) => compiler.gccVersion === selectedCompiler
    );

    if (!selectedCompilerInCurrentData || !selectedCompilerInCurrentData.compatible) {
      onSelect(firstCompatibleCompiler);
    }
  }, [currentData, firstCompatibleCompiler, onSelect, selectedCompiler]);

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Compatibilidade dos Compiladores
        </h2>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-2 border-b">
        {fileNames.map((fileName) => (
          <button
            key={fileName}
            onClick={() => setActiveTab(fileName)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === fileName
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {fileName}
          </button>
        ))}
      </div>

      {/* Table */}
      {currentData && (
        <div className="max-h-[300px] overflow-y-auto rounded-lg">
          <table className="w-full">
            <thead className="bg-white">
              <tr>
                <th className="p-4 text-left font-semibold">
                  Compilador
                </th>

                <th className="p-4 text-center font-semibold">
                  Compatível
                </th>

                <th className="p-4 text-center font-semibold">
                  Funções GOMP
                </th>

                <th className="p-4 text-center font-semibold">
                  Chamadas GOMP
                </th>
              </tr>
            </thead>

                        <tbody>
              {currentData.results.map((compiler, index) => {
                const isCompatible = compiler.compatible;
                const isSelected = selectedCompiler === compiler.gccVersion;
                const shouldHighlight =
                  isSelected ||
                  (!selectedCompiler && index === firstCompatibleIndex && firstCompatibleIndex !== -1);
                const rowClassName = [
                  "border-t transition-colors",
                  isCompatible ? "cursor-pointer hover:bg-blue-50" : "cursor-not-allowed opacity-60",
                  shouldHighlight ? "bg-blue-50" : "",
                ]
                  .filter(Boolean)
                  .join(" ");
                const totalCalls = compiler.calls.reduce(
                  (total, item) => total + item.ocorrences,
                  0
                );

                return (
                  <tr
                    key={`${currentData.fileName}-${compiler.gccVersion}`}
                    onClick={() => {
                      if (isCompatible) {
                        onSelect(compiler);
                      }
                    }}
                    className={rowClassName}
                  >
                    <td className="p-3 font-medium">
                      <div className="flex items-center gap-2">
                        <ChevronRight
                          size={16}
                          className={
                            selectedCompiler === compiler.gccVersion
                              ? "transition-transform rotate-90"
                              : "transition-transform"
                          }
                        />
                        {compiler.gccVersion}
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      {compiler.compatible ? "✅ Sim" : "❌ Não"}
                    </td>

                    <td className="p-4 text-center">
                      {compiler.calls.length}
                    </td>

                    <td className="p-4 text-center">
                      {totalCalls}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}