export function useAuthNew() {
  const baseURL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8000/api' : 'http://http://5.35.84.206:8000/api'
  const cookieToken = useCookie('at', {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: 'strict'
  })

  function getLazyOptionsNew(method: string = 'GET', body: any = false, file: boolean = false) {
    const options: any = {
      baseURL,
      method,
      // lazy: true,
      // server: false,
      headers: cookieToken.value
        ? {
            Accept: file ? 'multipart/form-data' : 'application/json',
            Authorization: 'Bearer ' + cookieToken.value
          }
        : { Accept: 'application/json' }
    }
    if (body) {
      options.body = body
    }
    return options
  }

  function getShow(url: string, id: string | string[]) {
    return useFetch<any>(`${baseURL}/${url}/${id}`, getLazyOptionsNew())
  }
  function getAll(url: string) {
    return useFetch<any>(`${baseURL}/${url}`, getLazyOptionsNew())
  }
  function getSelectData(url: string) {
    return useFetch<any>(`${baseURL}/${url}/select`, getLazyOptionsNew())
  }
  function batchEditing(url: string, values: any) {
    return useFetch<any>(`${baseURL}/${url}/batch-editing`, getLazyOptionsNew('POST', values))
  }
  function delAll(url: string) {
    return useFetch<any>(`${baseURL}/${url}`, getLazyOptionsNew())
  }
  function del(url: string, id: string) {
    return useFetch<any>(`${baseURL}/${url}/${id}`, getLazyOptionsNew('DELETE'))
  }
  function add(url: string, values: any) {
    return useFetch<any>(`${baseURL}/${url}`, getLazyOptionsNew('POST', values))
  }
  function addFile(url: string, values: any) {
    return useFetch<any>(`${baseURL}/${url}`, getLazyOptionsNew('POST', values, true))
  }
  function edit(url: string, id: string, values: any) {
    return useFetch<any>(`${baseURL}/${url}/${id}`, getLazyOptionsNew('PATCH', values))
  }
  function api(url: string, method: string = 'GET', values: any = null) {
    return useFetch<any>(`${baseURL}/${url}`, getLazyOptionsNew(method, values))
  }

  return {
    getShow,
    getAll,
    getSelectData,
    batchEditing,
    delAll,
    del,
    add,
    addFile,
    edit,
    api
  }
}
