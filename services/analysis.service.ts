import { CompilerAnalysis } from "@/types/analise";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL

export async function analyzeFile(
  file: File
): Promise<CompilerAnalysis[]> {
  const formData = new FormData();

  formData.append("file", file);

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