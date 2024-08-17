declare global {
  type TProjectUserFillable = {
    users: number[] | null
  }
  type TProjectUser = TProjectUserFillable
}
export default global
