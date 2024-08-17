declare global {
  type TCardItem = {
    name: string
    text?: string | number | null
    static_data?: {
      table: keyof typeof staticData
      value: number | null
    }
    user_id?: number
    boolean?: boolean | null
    counter_agent_data?: TCounterAgent
    counter_agent_worker_data?: TCounterAgentWorker
    price?: number
    link?: {
      to: string
      text: string | number
    }
    files?: {
      values: TFile[]
      to: {
        table: string
        id: number
      }
    }
  }

}
export default global
