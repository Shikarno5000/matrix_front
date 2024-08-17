type withTable = {}

declare global {
  type TProductVersionFillable = {
    version_date: string | null
    version_comment: string | null
    version_price: number | null
    version_pfa: boolean | null
  }
  type TProductVersion = AId & TProductVersionFillable & withTable
}
export default global
