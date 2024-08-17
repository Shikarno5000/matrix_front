type withTable = {
  // files: TFile[]
  users: TUser[]
  questions: TQuestion[]
}

declare global {
  type TInternalMeetingFillable = {
    date: string
    place: string
    organizer_id: number
  }
  type TInternalMeeting = AId & TInternalMeetingFillable & withTable
}
export default global
