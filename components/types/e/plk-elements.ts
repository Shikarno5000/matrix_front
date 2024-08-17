type withTable = {
  element: TElement
}

type rev = {
  elementName: string
  elementArticle: string
  elementType: string
}

declare global {

  type TPlkElementVal = {
    col: number
    element_id: number
    plk_id: number
    position:string
    comment:string
  }

  type TPlkElement = AId & TPlkElementVal & withTable
  type TPlkElementRev = TPlkElement & rev
}
export default global
