declare global {
  type TPositionFillable = {
      name: string
  }
  type TPosition = AId & TPositionFillable
}
export default global
