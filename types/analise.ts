export interface GompFunction {
  name: string;
  occurrences: number;
}

export interface CompilerAnalysis {
  compiler: string;
  compatible: boolean;
  functions: GompFunction[];
}