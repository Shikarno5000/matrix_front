type withTable = {
  element: TElement
  counter_agent: TCounterAgent
}

type revealed = {
  tr_class?: string
  element_name?: string
  element_article?: string
  counter_agent_name?: string
}

declare global {
  type TElementPriceFillable = {
    element_id: number
    counter_agent_id: number
    price: number
    price_for_matrix: number
  }
  type TElementPrice = AId & TElementPriceFillable & withTable
  type TElementPriceRevealed = TElementPrice & revealed
}
export default global
