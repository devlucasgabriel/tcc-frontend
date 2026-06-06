"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    label: "Análise",
    href: "/analise",
  },
  {
    label: "Diretivas",
    href: "/diretivas",
  }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Lado esquerdo */}
        <h2 className="text-2xl font-bold">
          REPOSITÓRIO DE INFORMAÇÕES SOBRE O ECOSSISTEMA DO OPENMP
        </h2>

        <nav>
          <ul className="flex gap-2">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                      active
                        ? "bg-blue-400 text-white"
                        : "text-gray-700 hover:bg-blue-100"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}