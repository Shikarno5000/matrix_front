type withTable = {
  // files: TFile[]
  // users: TUser[]
}

declare global {
  type TQuestionFillable = {
    name: string
    description: string
    internal_meeting_id: number
  }
  type TQuestion = AId & TQuestionFillable & withTable
}
export default global
