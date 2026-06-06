interface Props {
  syntax: string;
}

export default function GompGcc({
  syntax,
}: Props) {
  return (
    <section className="h-full rounded-xl border bg-white shadow-sm">
      <div className="border-b rounded-t-lg bg-blue-300 p-4">
        <h3 className="font-semibold">
          Sintaxe
        </h3>
      </div>

      <div className="p-6">
        <pre className="overflow-auto whitespace-pre-wrap rounded-lg bg-blue-50 p-4 text-sm">
          {syntax}
        </pre>
      </div>
    </section>
  );
}