type withTable = {
  element: TElement
}

type rev = {
  elementName: string
  elementArticle: string
  elementType: string
}

declare global {

  type TServerElementVal = {
    col: number
    element_id: number
    server_id: number
    position:string
    comment:string
  }

  type TServerElement = AId & TServerElementVal & withTable
  type TServerElementRev = TServerElement & rev
}
export default global
