type withTable = {
  documents: TDocument[]
  products: TProduct[]
  subgroup: TSubgroup
  chapter_softwares: TChapterSoftware[]
  chapter_elements: TChapterElement[]
  chapter_plks: TChapterPlk[]
  servers: TServer[]
  lower_levels: TLowerLevel[]
}

declare global {
  type TChapterFillable = {
    name: string
    subgroup_id: number
    chapter_type_id: number
  }
  type TChapter = AId & TChapterFillable & withTable
}
export default global
