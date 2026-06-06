"use client";

import { CompilerAnalysis } from "@/types/analise";
import { ChevronRight } from "lucide-react";

interface Props {
  data: CompilerAnalysis[];
  selectedCompiler: string;
  onSelect: (compiler: CompilerAnalysis) => void;
}

export default function AnalysisTable({
  data,
  selectedCompiler,
  onSelect,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Compatibilidade dos Compiladores
        </h2>
      </div>

      <div className="overflow-hidden rounded-lg">
        <table className="w-full">
          <thead className="bg-white">
            <tr>
              <th className="p-3 text-left font-semibold">
                Compilador
              </th>

              <th className="p-3 text-center font-semibold">
                Compatível
              </th>

              <th className="p-3 text-center font-semibold">
                Chamadas GOMP
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((compiler) => (
              <>
                <tr
                  key={compiler.compiler}
                  onClick={() => onSelect(compiler)}
                  className={`
                    cursor-pointer border-t transition-colors
                    hover:bg-blue-50
                    ${
                      selectedCompiler ===
                      compiler.compiler
                        ? "bg-blue-50"
                        : ""
                    }
                  `}
                >
                  <td className="p-3 font-medium">
                    <div className="flex items-center gap-2">
                        <ChevronRight
                        size={16}
                        className={`transition-transform ${
                            selectedCompiler === compiler.compiler
                            ? "rotate-90"
                            : ""
                        }`}
                        />
                    {compiler.compiler}
                    </div>
                  </td>

                   <td className="p-3 text-center">
                  {compiler.compatible
                    ? "✅ Sim"
                    : "❌ Não"}
                </td>

                <td className="p-3 text-center">
                  {compiler.functions.length}
                </td>
                </tr>
                </>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}