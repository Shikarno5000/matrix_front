type withTable = {
  // element: TElement
}

type revealed = {
  // tr_class?: string
  // element_name?: string
  // element_article?: string
  // counter_agent_name?: string
}

declare global {
  type TElementCodeFillable = {
    element_id: number
    code: string
    weight_per_unit: number
    type_operation_id: number
    ip_id: number
    ex_id: number
  }
  type TElementCode = AId & TElementCodeFillable & withTable
  type TElementCodeRevealed = TElementCode & revealed
}
export default global
