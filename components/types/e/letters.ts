type withTable = {
  files: TFile[]
  contract: {
    id: number
    code: string
  }
}

type revealed = {
  letter_direction: string
  letter_type: string
  shipping_method: string
}

declare global {
  type TLetterFillable = {
    date: string
    code: string
    letter_direction_id: number
    letter_type_id: number
    organization: string
    fio: string
    shipping_method_id: number
    delivery_email: string
    delivery_address: string
    content: string
    applications: string
    executor_id: number
    contract_id: number
    incoming_letter_date: string
    incoming_letter_code: string
    response_to_id: number
    execute_before: string
    execution_date: string
    notes: string
  }
  type TLetter = AId & TLetterFillable & withTable
  type TLetterRevealed = TLetter & revealed
}
export default global
