declare global {
type TValues = {
  type?: 'files' | 'cog' | 'string' | 'price' | 'date' | 'extractingValues' | 'extractingLink' | 'user' | 'counterAgentWorkers' | 'counterAgents' | 'counterAgent' | 'counterAgentWorker' | 'boolean' | 'linkIf'
  code?: string
  name?: string
  max?: number
  min?: number
  required?: true
  noAdd?: true
  noEdit?: true
  extractingValue?: string
  static?: keyof typeof staticData
  to?: string
  slot?: string
  class?: string
  if?: string
  ifNot?: string
}

  type TFormBlock = {
    formBlock: '2' | '3' | '21'
    items: TValues[]

  }

  type TFormValues = {
    res: string[]
    def: {code: string, value: string }[]
  }

type TValuesArray = Array<TValues | TFormBlock>

// type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
// type TFormLines = RequiredFields<TValues, 'code'>

}
export default global
