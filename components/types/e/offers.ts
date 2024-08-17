type withTable = {
  // files: TFile[]
}

declare global {
  type TOfferFillable = {
    description: string
    author_id: number
    question_id: number
  }
  type TOffer = AId & TOfferFillable & withTable
}
export default global
