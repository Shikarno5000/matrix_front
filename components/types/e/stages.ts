declare global {
  type TStageFillable = {
    name: string
    checked: boolean
    class: string
    sort: number
    to?: { table: string, id: number }
  }
  type TStage = AId & TStageFillable
}
export default global
