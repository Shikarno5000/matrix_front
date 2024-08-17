type withTable = {
  // files: TFile[]
}

declare global {
  type TDecisionFillable = {
    description: string
    responsible_id: number
    date: string
    decision_status_id: number
    question_id: number
  }
  type TDecision = AId & TDecisionFillable & withTable
}
export default global
