type withTable = {
  counter_agent_workers?: TCounterAgentWorker[]
  counter_agent: TCounterAgent
}

declare global {
  type TParticipantFillable = {
    counter_agent_id: number
    participant_type_id: number
    project_id: number
    comment: string
  }
  type TParticipant = AId & TParticipantFillable & withTable
  type TParticipantFillableWith = TParticipantFillable & withTable
}
export default global
