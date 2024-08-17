declare global {
  type TSuggestionFillable = {
    name: string
    description: string
    link: string
    suggestion_status_id: number
  }

  type TSuggestion = AId & TSuggestionFillable
}
export default global
