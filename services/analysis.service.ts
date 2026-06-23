import { CompilerAnalysisResults } from "@/types/analise";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function analyzeFiles(
  files: File[]
): Promise<CompilerAnalysisResults[]> {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file, file.name);
  });

  const response = await fetch(
    `${backendUrl}analysis/analyze`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      "Erro ao analisar arquivo"
    );
  }

  return response.json();
}