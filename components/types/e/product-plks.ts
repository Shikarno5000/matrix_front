type withTable = {
  plk: TPlk
}

type rev = {
  plkName: string
  plkArticle: string
  plkType: string
}

declare global {

  type TProductPlkFillable = {
    col: number
    plk_id: number
    product_id: number
    ready_col: number
    position:string
    comment:string
  }

  type TProductPlk = AId & TProductPlkFillable & withTable
  type TProductPlkRev = TProductPlk & rev
}
export default global
