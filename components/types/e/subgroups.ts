type withTable = {
  chapters: TChapter[]
  direction: TDirection
}

declare global {
  type TSubgroupFillable = {
    name: string
    suffix: string
    project_id: number
    direction_id: number
    project_type: number
  }
  type TSubgroup = AId & TSubgroupFillable & withTable
}
export default global
