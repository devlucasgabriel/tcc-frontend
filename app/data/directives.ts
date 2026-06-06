import { Directive } from "@/types/directive";

export const directives: Directive[] = [
  {
    id: "parallel",
    name: "Parallel",

    description:
      "Quando uma thread encontra uma construção parallel, uma equipe de threads é criada para executar a região paralela. O segmento que encontrou a construção torna-se a thread principal da nova equipe. O número de threads permanece constante durante a execução da região paralela.",

    syntax: `#pragma omp parallel [clause[, clause] ...]
{
    /* código paralelo */
}`,

    functions: [
      "GOMP_parallel_start",
      "GOMP_parallel_end",
    ],
  },

  {
    id: "for",
    name: "For",

    description:
      "Distribui as iterações de um loop entre as threads da equipe atual.",

    syntax: `#pragma omp for [clause[, clause] ...]
for (...) {
    ...
}`,

    functions: [
      "GOMP_loop_static_start",
      "GOMP_loop_end",
    ],
  },

  {
    id: "target",
    name: "Target",

    description:
      "Executa uma região de código em um dispositivo alvo, como GPU.",

    syntax: `#pragma omp target
{
    ...
}`,

    functions: [
      "GOMP_target",
      "GOMP_target_end",
    ],
  },

  {
    id: "task",
    name: "Task",

    description:
      "Cria uma tarefa explícita que pode ser executada por qualquer thread da equipe.",

    syntax: `#pragma omp task
{
    ...
}`,

    functions: [
      "GOMP_task",
      "GOMP_taskwait",
    ],
  },

  {
    id: "loop",
    name: "Loop",

    description:
      "Permite distribuir a execução de loops entre os recursos disponíveis.",

    syntax: `#pragma omp loop
for (...) {
    ...
}`,

    functions: [
      "GOMP_loop_nonmonotonic_dynamic_start",
      "GOMP_loop_end",
    ],
  },
];