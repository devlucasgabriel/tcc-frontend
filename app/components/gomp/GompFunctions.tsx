interface Props {
  functions: string[];
}

export default function GompFunctions({
  functions,
}: Props) {
  return (
    <section className="h-full rounded-xl border bg-white shadow-sm">
      <div className="border-b rounded-t-lg bg-blue-300 p-4">
        <h3 className="font-semibold">
          Funções LibGOMP
        </h3>
      </div>

      <div className="p-6">
        <ul className="space-y-2">
          {functions.map((fn) => (
            <li
              key={fn}
              className="rounded-lg bg-blue-50 p-3 font-mono text-sm"
            >
              {fn}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}