"use client";

import { useState } from "react";

import { directives } from "../data/directives";
import GompSidebar from "../components/gomp/GompSidebar";
import GompGcc from "../components/gomp/GompGcc";
import GompFunctions from "../components/gomp/GompFunctions";


export default function GompPage() {
  const [selected, setSelected] = useState(
    directives[0]
  );

  return (
    <main className="h-[calc(100vh-80px)] p-6">
      <div className="grid h-full grid-cols-[250px_1fr] gap-6">
        <GompSidebar
          directives={directives}
          selected={selected.id}
          onSelect={setSelected}
        />

          <div className="grid flex-1 grid-cols-2 gap-6">
            <GompGcc
              syntax={selected.syntax}
            />

            <GompFunctions
              functions={selected.functions}
            />
          </div>
        </div>
    </main>
  );
}