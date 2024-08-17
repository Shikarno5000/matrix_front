type withTable = {
  timelines: TTimeline[]
  stages: TStage[]
  files: TFile[]
  product_plks: TProductPlk[]
  product_elements: TProductElement[]
  chapter: TChapter
  specification: TSpecification
  versions: TProductVersion[]
}

declare global {

  type TProductFillable = {
    chapter_id: number
    col: number
    name: string
    code: string
    product_status_id: number
    height: number
    width: number
    depth: number
    corpus_type_id: number
    weight_estimation: number
    production_time_estimation: number
    power: number
    switch: number
    cross_section: number
    unforeseen_expenses_percentage: number
    developer_id: number
    development_status_id: number

    version: number | null
    version_group: number | null
    version_date: string | null
    version_comment: string | null
    version_price: number | null
    version_pfa: boolean | null
    ups: number
    voltage: string | null
    location_id: number | null
    specification_id: number | null
    ip_id: number | null
    ex_id: number

  }
  type TProduct = AId & TProductFillable & withTable
}
export default global
