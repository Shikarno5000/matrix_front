type withTable = {
  plk: TPlk
}
type rev = {
  plkName?: string
  plkArticle?: string
  plkType?: string
}

declare global {
  type TChapterPlkFillable = {
      col: number
      plk_id: number
      chapter_id: number
      specification_id: number
  }
  type TChapterPlk = AId & TChapterPlkFillable & withTable & rev
}
export default global
