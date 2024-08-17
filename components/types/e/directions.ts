type withTable = {
  subgroups: TSubgroup[]
  project: {
    id: number
    name_short: string
    cipher_prefix: string
  }
}

declare global {
  type TDirectionFillable = {
    id: number
    project_id: number
    name: string
    name_short: string
    sort: number
    project: Pick<TProject, 'id' | 'name_short' | 'cipher_prefix' | 'project_type_id' >
  }
  type TDirection = AId & TDirectionFillable & withTable
}
export default global
