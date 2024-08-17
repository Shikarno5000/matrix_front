type revealed = {
  type_operation?: string
  plk_type?: string
}

type withTable = {
  files: TFile[]
  plk_elements: TPlkElement[]
}

type pivot = {
  pivot?: {
    product_id: number
    plk_id: number
    col: number
    ready_col: number
    position: null | string,
    comment: null | string,
    created_by: null | number,
    created_at: null | number,
    updated_by: null | string,
    updated_at: null | string
}
}

declare global {
  type TPlkFillable = {
    name: string
    article: string
    weight_per_unit: number
    nds_value_id: number,
    type_operation_id: number
    plk_type_id: number
    not_our: boolean,
  }

  type TPlk = AId & TPlkFillable & withTable & pivot
  type TPlkRevealed = TPlk & revealed
}
export default global
