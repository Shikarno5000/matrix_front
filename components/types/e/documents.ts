type withTable = {
  stages: TStage[]
  timelines: TTimeline[]
  files: TFile[]
  chapter: TChapter
}

declare global {
  type TDocumentFillable = {
    chapter_id: number
    name: string
    suffix: string
    sort: number
    execution_weight: number
    document_status_id: number
    last_status_change: string
    change_from_gip: string
    executor_id: number
  }
  type TDocument = AId & TDocumentFillable & withTable
}
export default global
