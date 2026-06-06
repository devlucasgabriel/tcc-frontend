export type GompCalls = {
	gompFunction: string
	ocorrences: number
}

export interface CompilerAnalysis {
  gccVersion: string
  calls: GompCalls[]
  compatible: boolean
}