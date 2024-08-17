type withTable = {
  element: TElement
}

type rev = {
  elementName: string
  elementArticle: string
  elementType: string
}

declare global {

  type TLowerLevelElementFillable = {
    col: number
    element_id: number
    lower_level_id: number
    position:string
    comment:string
  }

  type TLowerLevelElement = AId & TLowerLevelElementFillable & withTable
  type TLowerLevelElementRev = TLowerLevelElement & rev
}
export default global
