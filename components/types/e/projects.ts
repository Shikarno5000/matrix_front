// type revealed = {
//   role?: string
// }
type withTable = {
  directions: TDirection[]
  users: TUser[]
  stages: TStage[]
  timelines: TTimeline[]
  participants: TParticipant[]
  subgroups: TSubgroup[]
  contract: TContract
  files: TFile[]
}

declare global {
  type TProjectFillable = {
    name: string
    name_short: string
    project_type_id: number
    cipher_prefix: string
    responsible_executor_id: number
    object_description: string
    // contract_date: string
    // contract_execution: string
    // contract_price: number
    // contract_number: string
    // contract_status_id: number
    archive: boolean
    contract_id: number
    sort: number
  }

  type TProject = AId & TProjectFillable & withTable
  type TProjectFillableWithTable = TProjectFillable & withTable
}
export default global
