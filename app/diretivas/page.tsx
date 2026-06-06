"use client";

import { useEffect, useState } from "react";
import DirectiveDescription from "../components/diretivas/DiretiveDescription";
import DirectiveFunctions from "../components/diretivas/DiretiveFunctions";
import DirectiveSidebar from "../components/diretivas/DiretiveSidebar";
import DirectiveSyntax from "../components/diretivas/DiretiveSyntax";
import { Directive } from "@/types/directive";

export default function DiretivasPage() {
  const [directives, setDirectives] = useState<Directive[]>([]);
  const [selected, setSelected] = useState<Directive | null>(null);

  const [cache, setCache] = useState<Record<string, Directive>>({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  async function loadDirectives() {
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}informations/directives`);
      const data = await res.json();

      setDirectives(data);

      if (data.length > 0) {
        await handleSelect(data[0]);
      }
    } finally {
      setLoading(false);
    }
  }

  loadDirectives();
}, []);

  const handleSelect = async (directive: Directive) => {
  const cached = cache[directive.id];

  if (cached) {
    setSelected(cached);
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}informations/directive/${directive.id}`);
    const data = await res.json();

    setSelected(data);

    setCache((prev) => ({
      ...prev,
      [directive.id]: data,
    }));
  } finally {
    setLoading(false);
  }
};

  if (loading && !selected) {
    return (
      <main className="p-6">
        <p>Carregando diretivas...</p>
      </main>
    );
  }

  if (!selected) return null;

  return (
    <main className="h-[calc(100vh-80px)] p-6">
      <div className="grid h-full grid-cols-[250px_1fr] gap-6">
        <DirectiveSidebar
          directives={directives}
          selected={selected.id}
          onSelect={handleSelect}
        />

        <div className="flex h-full flex-col gap-6">
          <DirectiveDescription directive={selected} />

          <div className="grid flex-1 grid-cols-2 gap-6">
            <DirectiveSyntax syntax={selected.sintax} />

            <DirectiveFunctions gompFunctions={selected.gompFunctions ?? []} />
          </div>
        </div>
      </div>
    </main>
  );
}