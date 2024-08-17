// type revealed = {
//   role?: string
// }
// type withTable = {}

declare global {
  type TRatioFillable = {
    name: string
    element_id: number
  }

  type TRatio = AId & TRatioFillable
}
export default global
