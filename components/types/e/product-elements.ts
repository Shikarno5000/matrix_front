type withTable = {
  element: TElement
}

type rev = {
  elementName: string
  elementArticle: string
  elementType: string
}

declare global {

  type TProductElementFillable = {
    col: number
    element_id: number
    product_id?: number
    position:string
    comment:string
    fix_price:number
  }

  type TProductElement = AId & TProductElementFillable & withTable
  type TProductElementRev = TProductElement & rev
}
export default global
