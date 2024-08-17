type revealed = {
  type_operation?: string
}

type pivot = {
//   pivot?: {
//     product_id: number
//     element_id: number
//     col: number
//     position: null,
//     comment: null,
//     created_by: null,
//     created_at: null,
//     updated_by: null,
//     updated_at: null
// }
}

declare global {
  type TSoftwareFillable = {
    name: string
    article: string
    nds_value_id: number,
    type_operation_id: number
  }

  type TSoftware = AId & TSoftwareFillable & pivot
  type TSoftwareRevealed = TSoftware & revealed
}
export default global
