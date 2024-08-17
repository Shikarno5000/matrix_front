type withTable = {
  files: TFile[]
}

declare global {
  type TOrderFillable = {
    date: string
    code: string
    content: string
    applications: string
    executor_id: number
    notes: string
  }
  type TOrder = AId & TOrderFillable & withTable
}
export default global
