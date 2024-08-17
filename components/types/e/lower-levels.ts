type revealed = {
  type_operation?: string
}

type withTable = {
  timelines: TTimeline[]
  stages: TStage[]
  files: TFile[]
  lower_level_elements: TLowerLevelElement[]
  specification: TSpecification
}

declare global {

  type TLowerLevelFillable = {
    chapter_id: number
    name: string
    article: string
    specification_id: number
    col: number
    ip_id: number
    ex_id: number
  }
  type TLowerLevel = AId & TLowerLevelFillable & withTable
  type TLowerLevelRevealed = TServer & revealed
}
export default global
