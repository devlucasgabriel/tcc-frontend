import { Directive } from "@/types/directive";

interface Props {
  directives: Directive[];
  selected: number;
  onSelect: (directive: Directive) => void;
}

export default function DirectiveSidebar({
  directives,
  selected,
  onSelect,
}: Props) {
  return (
    <section className="h-full overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="border-b bg-gray-50 p-4">
        <h2 className="font-semibold">
          Diretivas OpenMP
        </h2>
      </div>

      <div className="flex max-h-full flex-col overflow-y-auto">
        {directives.map((directive) => (
          <button
            key={directive.id}
            onClick={() => onSelect(directive)}
            className={`
              border-b px-4 py-3 text-left transition
              ${
                selected === directive.id
                  ? "bg-blue-50 font-medium text-blue-600"
                  : "hover:bg-gray-50"
              }
            `}
          >
            {directive.name}
          </button>
        ))}
      </div>
    </section>
  );
}