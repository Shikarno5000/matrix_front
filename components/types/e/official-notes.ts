type withTable = {
  files: TFile[]
}

declare global {
  type TOfficialNoteFillable = {
    date: string
    code: string
    recipient_id: number
    content: string
    applications: string
    executor_id: number
    notes: string
  }
  type TOfficialNote = AId & TOfficialNoteFillable & withTable
}
export default global
