type withTable = {
  files: TFile[]
  counter_agent: TCounterAgent
  products: TProduct[]
  servers: TServer[]
  lower_levels: TLowerLevel[]
  chapter_elements: TChapterElement[]
  chapter_plks: TChapterPlk[]
  chapter_software: TChapterSoftware[]
  contract: TContract
  stages: TStage[]
}

type revealed = {}

declare global {
  type TSpecificationFillable = {
    contract_id: number
    article: string
    description: string
    date: string
    delivery_date: string
    counter_agent_id: number
    comment: string
  }
  type TSpecification = AId & TSpecificationFillable & withTable
  type TSpecificationRevealed = TSpecification & revealed
}
export default global
