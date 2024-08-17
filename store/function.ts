export function useDefaultStore<T, U>(baseUrl: string) {
  // получение всех данных
  const all = ref<T[]>([])
  const getAll = async () => {
    const response = await useAuth().api(baseUrl)
    all.value = response.success ? response.data : []
  }
  const delAll = async (id: number) => {
    await useAuth().api(`${baseUrl}/del-all/${id}`)
  }
  const show = async (id: number): Promise<TDefaultResponse> => {
    return await useAuth().api(`${baseUrl}/` + id)
  }

  // получение данных для select
  const select = ref<TSelect[]>([])
  const getSelectData = async () => {
    const response = await useAuth().api(`${baseUrl}/select`)
    select.value = response.success ? response.data : []
  }
  // стандартные
  const add = async (value: U): Promise<TDefaultResponse> => await useAuth().api(baseUrl, 'post', value)
  const edit = async (id: number, value: U): Promise<TDefaultResponse> => await useAuth().api(`${baseUrl}/${id}`, 'patch', value)
  const del = async (id: number): Promise<TDefaultResponse> => await useAuth().api(`${baseUrl}/${id}`, 'delete')
  const batchEditing = async (value: any): Promise<TDefaultResponse> => await useAuth().api(`${baseUrl}/batch-editing`, 'post', value)

  return { all, getAll, delAll, select, getSelectData, show, add, edit, del, batchEditing }
}

export function getHeaders() {}

export function checkLength(string: string | number, max: number, strNumber: number) {
  return string && string.toString().length > max ? ` строка ${strNumber} position '${string}' больше ${max} символов` : ''
}
export function checkNumber(string: string | number, strNumber: number, colName: string) {
  return string && typeof string !== 'number' ? ` строка ${strNumber} ${colName} '${string}' не число` : ''
}
export function checkRequired(string: string | number, strNumber: number, colName: string) {
  return !string ? ` строка ${strNumber} столбец '${colName}' обязателен` : ''
}
export function checkStatic(str: string | number, strNumber: number, colName: string, staticTable: keyof typeof staticData) {
  const id = staticDataGetIdByName(staticTable, str)

  return id
    ? {
        error: '',
        val: id
      }
    : {
        error: ` строка ${strNumber} столбец '${colName}' неправильное значение`,
        val: null
      }
}
