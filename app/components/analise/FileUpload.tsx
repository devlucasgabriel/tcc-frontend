"use client";

import { useRef, useState } from "react";

import {
  Upload,
  FileCode,
  Loader2,
  X,
} from "lucide-react";

import { CompilerAnalysisResults } from "@/types/analise";
import { analyzeFiles } from "@/services/analysis.service";

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const MAX_C_FILES = 3;
const MAX_CPP_FILES = 3;
const MAX_H_FILES = 9;

interface Props {
  onAnalysisFinished: (
    data: CompilerAnalysisResults[]
  ) => void;
}

export default function FileUpload({
  onAnalysisFinished,
}: Props) {
  const inputRef =
    useRef<HTMLInputElement>(null);

  const [files, setFiles] =
    useState<File[]>([]);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function getFileCounts(fileList: File[]) {
    return fileList.reduce(
      (counts, file) => {
        const name = file.name.toLowerCase();

        if (name.endsWith(".c")) {
          counts.c += 1;
        } else if (name.endsWith(".cpp")) {
          counts.cpp += 1;
        } else if (name.endsWith(".h")) {
          counts.h += 1;
        }

        return counts;
      },
      { c: 0, cpp: 0, h: 0 }
    );
  }

  function validateFile(
    selectedFile: File,
    currentFiles: File[]
  ) {
    const name = selectedFile.name
      .toLowerCase();

    if (
      !name.endsWith(".c") &&
      !name.endsWith(".cpp") &&
      !name.endsWith(".h")
    ) {
      setError(
        "Apenas arquivos .c, .cpp e .h são permitidos."
      );
      return false;
    }

    if (
      selectedFile.size > MAX_FILE_SIZE
    ) {
      setError(
        "Cada arquivo deve ter no máximo 2 MB."
      );
      return false;
    }

    const counts = getFileCounts(
      currentFiles
    );

    if (
      name.endsWith(".c") &&
      counts.c >= MAX_C_FILES
    ) {
      setError(
        `Máximo de ${MAX_C_FILES} arquivos .c permitido.`
      );
      return false;
    }

    if (
      name.endsWith(".cpp") &&
      counts.cpp >= MAX_CPP_FILES
    ) {
      setError(
        `Máximo de ${MAX_CPP_FILES} arquivos .cpp permitido.`
      );
      return false;
    }

    if (
      name.endsWith(".h") &&
      counts.h >= MAX_H_FILES
    ) {
      setError(
        `Máximo de ${MAX_H_FILES} arquivos .h permitido.`
      );
      return false;
    }

    return true;
  }

  function addFiles(selectedFiles: FileList) {
    const incomingFiles = Array.from(
      selectedFiles
    );
    const updatedFiles = [...files];

    for (const selectedFile of incomingFiles) {
      if (
        validateFile(selectedFile, updatedFiles)
      ) {
        updatedFiles.push(selectedFile);
      }
    }

    if (updatedFiles.length !== files.length) {
      setFiles(updatedFiles);
      setError("");
    }
  }

  function removeFile(index: number) {
    const updatedFiles = files.filter(
      (_, i) => i !== index
    );
    setFiles(updatedFiles);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = e.target.files;

    if (!selectedFiles) return;

    addFiles(selectedFiles);
    e.target.value = "";
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>
  ) {
    e.preventDefault();

    const selectedFiles =
      e.dataTransfer.files;

    if (!selectedFiles) return;

    addFiles(selectedFiles);
  }

  async function handleAnalyze() {
    if (files.length === 0) return;

    try {
      setLoading(true);

      const result = await analyzeFiles(files)

      onAnalysisFinished(result);
    } catch (error) {
      console.error(error);

      setError(
        "Erro ao analisar os arquivos."
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
          Arraste arquivos .c, .cpp e .h aqui
        </p>

        <p className="text-sm text-gray-500">
          ou clique para selecionar até {MAX_C_FILES} arquivos .c, {MAX_CPP_FILES} .cpp e {MAX_H_FILES} arquivos .h
        </p>

        <input
          ref={inputRef}
          type="file"
          accept=".c,.cpp,.h"
          multiple
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <FileCode size={20} />

                <div>
                  <p className="font-medium">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                onClick={() => removeFile(index)}
                className="p-1 text-gray-400 hover:text-red-600 transition"
                title="Remover arquivo"
              >
                <X size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-4 flex justify-between gap-4">
        <div className="text-sm text-gray-600">
          Selecionados: {files.length} arquivo(s)
        </div>

        <button
          onClick={handleAnalyze}
          disabled={files.length === 0 || loading}
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
            : "Analisar Arquivos"}
        </button>
      </div>
    </section>
  );
}
