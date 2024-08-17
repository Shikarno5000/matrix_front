type withTable = {
  files: TFile[]
}

type revealed = {}

declare global {
  type TApplicationFillable = {
    contract_id: number
    name: string
    code: string
    date: string
  }
  type TApplication = AId & TApplicationFillable & withTable
  type TApplicationRevealed = TApplication & revealed
}
export default global
