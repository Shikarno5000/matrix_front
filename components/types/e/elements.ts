type withTable = {
  element_codes: TElementCode[]
  contract: {
    id: number
    code: string
  }
}

type revealed = {
  type_operation?: string
  element_type?: string
  unit?: string
}

type pivot = {
  pivot?: {
    product_id: number
    element_id: number
    col: number
    position: null,
    comment: null,
    created_by: null,
    created_at: null,
    updated_by: null,
    updated_at: null
}
}

declare global {
  type TElementFillable = {
    name: string
    article: string
    weight_per_unit: number
    nds_value_id: number,
    unit_id: number
    type_operation_id: number
    element_type_id: number
    element_for_type_id: number
    order_code_id: number
    manufacturer: string
    ip_id: number
    ex_id: number
  }

  type TElement = AId & TElementFillable & pivot & withTable
  type TElementRevealed = TElement & revealed
}
export default global
