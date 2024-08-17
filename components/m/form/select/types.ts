declare global {
  type TSelect = {
    id: number | string
    name: string
    name_short?: string
    counter_agent_ids?: number[]
  }
}
export default global
