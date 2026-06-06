export async function enviarArquivo(
  file: File
) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    "http://localhost:8080/analisar",
    {
      method: "POST",
      body: formData,
    }
  );

  return response.json();
}