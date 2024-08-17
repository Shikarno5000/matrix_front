declare global {
  type TErrorData = {
    type: string
    code: string | number
    msg: string | object
  }
  /** Ответ с ошибкой */
  type TErrorResponse = {
    success: false
    error: TErrorData
  }
  /** Основа правильного ответа */
  type TGoodResponse = {
    success: true
    data: any
  }
  /** Стандартные данные ордера */
  type TDefaultResponse = TErrorResponse | TGoodResponse
}
export default global
