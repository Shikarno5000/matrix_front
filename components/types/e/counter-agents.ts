type revealed = {
  role?: string
}
type pivot = {
  pivot?: {
    project_id: number
    counter_agent_id: number
    comment: string
    participant_type_id: number
  }
}
type withTable = {
  counter_agent_workers?: TCounterAgentWorker[]
}

declare global {
  type TCounterAgentFillable = {
      name: string
      name_short: string
      legal_address: string
      actual_address: string
      inn: string
      kpp: string
      ogrn: string
      okpo: string
      oktmo: string
      counter_agent_role_id: number
  }

  type TCounterAgent = AId & TCounterAgentFillable & pivot & withTable
  type TCounterAgentWith = TCounterAgent & withTable
  type TCounterAgentRevealed = TCounterAgent & revealed

}
export default global
