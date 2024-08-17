type withTable = {
  files: TFile[]
  counter_agent: TCounterAgent
  counter_agent_worker: TCounterAgentWorker
  project: {
    id: number
    name_short: string
  }
  letters: TLetter[]
  applications: TApplication[]
  specifications: TSpecification[]
  projects: TProject[]
}

type revealed = {
  contract_status: string
  contract_type: string
  pricing_type: string
}

declare global {
  type TContractFillable = {
    date: string
    code: string
    contract_status_id: number
    responsible_executor_id: number
    counter_agent_id: number
    counter_agent_worker_id: number
    subject_contract: string
    term_of_agreement: string
    contract_type_id: number
    pricing_type_id: number
    price: number
    notes: string
    execution_percentage: number
    object_name: string
  }
  type TContract = AId & TContractFillable & withTable
  type TContractRevealed = TContract & revealed
}
export default global
