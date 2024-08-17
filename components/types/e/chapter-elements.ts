type withTable = {
  element: TElement
}
type rev = {
  elementName?: string
}

declare global {
  type TChapterElementFillable = {
      chapter_id: number
      element_id: number
      col: number
      specification_id: number
  }
  type TChapterElement = AId & TChapterElementFillable & withTable
  type TChapterElementRev = TChapterElement & rev
}
export default global
