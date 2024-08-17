type revealed = {
  type_operation?: string
}

type withTable = {
  files: TFile[]
  stages: TStage[]
  timelines: TTimeline[]
  server_elements: TServerElement[]
  specification: TSpecification
}
type pivot = {
//   pivot?: {
//     product_id: number
//     element_id: number
//     col: number
//     position: null,
//     comment: null,
//     created_by: null,
//     created_at: null,
//     updated_by: null,
//     updated_at: null
// }
}

declare global {
  type TServerFillable = {
    chapter_id: number
    name: string
    article: string
    nds_value_id: number,
    type_operation_id: number
    specification_id: number
    col: number
  }

  type TServer = AId & TServerFillable & withTable & pivot
  type TServerRevealed = TServer & revealed
}
export default global
