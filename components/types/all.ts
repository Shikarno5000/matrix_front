declare global {
  type ACreatedUpdated = {
      c?: {
        at: string
        by: string
      }
      u?: {
        at: string
        by: string
      }
    }
  type AId = {
    id: number
    create_update: ACreatedUpdated
  }
  type TTo =
    | {
        table?: string
        projectTypeId?: number
        directions?: number
        id: number
      }
    | undefined
}
export default global
