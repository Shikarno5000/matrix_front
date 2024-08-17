// type revealed = {
//   role?: string
// }
type pivot = {
  pivot?: {
    counter_agent_id: number
    counter_agent_worker_id: number
    comment: string
  }
}
type withTable = {
  counter_agents?: TCounterAgent[]
}

declare global {
  type TCounterAgentWorkerFillable = {
    name: string
    name_short: string
    email: string
    phone: string
    position: string
    comment: string
  }

  type TCounterAgentWorker = AId & TCounterAgentWorkerFillable & pivot & withTable
  type TCounterAgentWorkerWith = TCounterAgentWorker & withTable
  // type TCounterAgentWorkerRevealed = TCounterAgentWorker & revealed

}
export default global
