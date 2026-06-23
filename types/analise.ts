export type GompCalls = {
	gompFunction: string
	ocorrences: number
}

export interface AnalysisSeries {
	fileName: string
	calls: GompCalls[]
}

export interface CompilerAnalysis {
  gccVersion: string
  calls: GompCalls[]
  compatible: boolean
}

export interface CompilerAnalysisResults {
  fileName: string
  results: CompilerAnalysis[]
}
