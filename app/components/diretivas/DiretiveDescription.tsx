import { Directive } from "@/types/directive";

interface Props {
  directive: Directive;
}

export default function DirectiveDescription({
  directive,
}: Props) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-semibold">
        {directive.name}
      </h2>

      <div className="leading-8 text-gray-700">
        {directive.description}
      </div>
    </section>
  );
}