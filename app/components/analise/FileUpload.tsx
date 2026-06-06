"use client";

import { useRef, useState } from "react";

import {
  Upload,
  FileCode,
  Loader2,
} from "lucide-react";

import { analyzeFile } from "@/services/analysis.service";

import { CompilerAnalysis } from "@/types/analise";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

interface Props {
  onAnalysisFinished: (
    data: CompilerAnalysis[]
  ) => void;
}

export default function FileUpload({
  onAnalysisFinished,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [file, setFile] =
    useState<File | null>(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function validateFile(
    selectedFile: File
  ) {
    if (
      !selectedFile.name
        .toLowerCase()
        .endsWith(".c")
    ) {
      setError(
        "Apenas arquivos .c são permitidos."
      );
      return false;
    }

    if (
      selectedFile.size > MAX_FILE_SIZE
    ) {
      setError(
        "O arquivo deve ter no máximo 2 MB."
      );
      return false;
    }

    setError("");
    return true;
  }

  function handleFile(
    selectedFile: File
  ) {
    if (!validateFile(selectedFile))
      return;

    setFile(selectedFile);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      e.target.files?.[0];

    if (!selectedFile) return;

    handleFile(selectedFile);
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    const selectedFile =
      e.dataTransfer.files?.[0];

    if (!selectedFile) return;

    handleFile(selectedFile);
  }

  async function handleAnalyze() {
    if (!file) return;

    try {
      setLoading(true);

      const result =
        await analyzeFile(file);

      onAnalysisFinished(result);
    } catch (error) {
      console.error(error);

      setError(
        "Erro ao analisar o arquivo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Upload do Código
      </h2>

      <div
        onClick={() =>
          inputRef.current?.click()
        }
        onDragOver={(e) =>
          e.preventDefault()
        }
        onDrop={handleDrop}
        className="
          flex cursor-pointer flex-col
          items-center justify-center
          rounded-lg border-2 border-dashed
          border-gray-300 p-10
          transition hover:border-blue-500
          hover:bg-blue-50
        "
      >
        <Upload size={40} />

        <p className="mt-4 text-lg font-medium">
          Arraste um arquivo .c aqui
        </p>

        <p className="text-sm text-gray-500">
          ou clique para selecionar
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".c"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {file && (
        <div className="mt-4 max-h-[50px] flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <FileCode size={20} />

            <div>
              <p className="font-medium">
                {file.name}
              </p>

              <p className="text-sm text-gray-500">
                {(
                  file.size / 1024
                ).toFixed(1)}{" "}
                KB
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="
            flex items-center gap-2
            rounded-lg bg-blue-600
            px-4 py-2 text-white
            transition hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-gray-300
          "
        >
          {loading && (
            <Loader2
              size={16}
              className="animate-spin"
            />
          )}

          {loading
            ? "Analisando..."
            : "Analisar Arquivo"}
        </button>
      </div>
    </section>
  );
}