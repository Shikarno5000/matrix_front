type parent = {
  parent?: {
    id: number
    name: string
  }
}

declare global {
  type TTimelineFillable = {
    text: string
    event_id: number
    entrance: number
    expenditure: number
    description: null | string
    date: string
    to?: { table: string, id: number }
  }
  type TTimeline = AId & TTimelineFillable & parent
}
export default global
