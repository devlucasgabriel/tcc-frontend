"use client";

import { useState } from "react";
import DirectiveDescription from "../components/diretivas/DiretiveDescription";
import DirectiveFunctions from "../components/diretivas/DiretiveFunctions";
import DirectiveSidebar from "../components/diretivas/DiretiveSidebar";
import DirectiveSyntax from "../components/diretivas/DiretiveSyntax";
import { directives } from "../data/directives";


export default function DiretivasPage() {
  const [selected, setSelected] = useState(
    directives[0]
  );

  return (
    <main className="h-[calc(100vh-80px)] p-6">
      <div className="grid h-full grid-cols-[250px_1fr] gap-6">
        <DirectiveSidebar
          directives={directives}
          selected={selected.id}
          onSelect={setSelected}
        />

        <div className="flex h-full flex-col gap-6">
          <DirectiveDescription
            directive={selected}
          />

          <div className="grid flex-1 grid-cols-2 gap-6">
            <DirectiveSyntax
              syntax={selected.syntax}
            />

            <DirectiveFunctions
              functions={selected.functions}
            />
          </div>
        </div>
      </div>
    </main>
  );
}