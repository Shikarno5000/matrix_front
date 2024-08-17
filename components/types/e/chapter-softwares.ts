type withTable = {
  software: TSoftware
}
type rev = {
  softwareName?: string
}

declare global {
  type TChapterSoftwareFillable = {
      col: number
      software_id: number
      chapter_id: number
      specification_id: number
  }
  type TChapterSoftware = AId & TChapterSoftwareFillable & withTable & rev
}
export default global
