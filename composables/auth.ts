const errorCode: TErrorResponse = {
  success: false,
  error: {
    type: 'Ошибка authAPI',
    code: 403,
    msg: 'Ошибка обращения к апи'
  }
}

export function useAuth() {
  const baseURL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8000/api' : 'http://5.35.84.206:8090/api'
  const baseStorageURL = process.env.NODE_ENV !== 'production' ? 'http://127.0.0.1:8000' : 'http://5.35.84.206:8090'
  const cookieToken = useCookie('at', {
    expires: new Date(Date.now() + 12096e5), // 2 weeks from now
    sameSite: 'strict'
  })
  const loggedIn = computed(() => !!cookieToken.value)

  function getOptions(method: string, body: any = false, file: boolean = false) {
    const options: any = {
      baseURL,
      method,
      headers: loggedIn.value
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
  function getLazyOptions(method: string = 'GET', body: any = false, file: boolean = false) {
    const options: any = {
      baseURL,
      method,
      lazy: true,
      server: false,
      headers: loggedIn.value
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

  async function api(url: string, method: string = 'GET', newData: any = false, file: boolean = false) {
    // const { data, pending, error } = await useFetch<TDefaultResponse>(url, getOptions(method, newData, file))

    // if (error.value) {
    //   throw showError({ statusCode: error.value.data.error.code, message: error.value.data.error.msg, fatal: true })
    // }
    // if (pending) {
    //   return data.value ? data.value : errorCode
    // }
    // return errorCode

    try {
      const { data, pending, error } = await useFetch<TDefaultResponse>(url, getOptions(method, newData, file))

      if (error.value) {
        throw showError({ statusCode: error.value.data.error.code, message: error.value.data.error.msg, fatal: true })
      }

      if (pending && data.value) {
        return data.value
      }
    } catch (err: any) {
      return {
        success: false,
        error: {
          type: err.name,
          code: err.code,
          msg: err.message
        }
      } as TErrorResponse
    }
    return errorCode
  }

  function apiLazy(url: string, method: string = 'GET', newData: any = false, file: boolean = false) {
    return useFetch<TDefaultResponse>(url, getLazyOptions(method, newData, file))
  }

  async function login(email: string, password: string) {
    try {
      const { data, pending } = await useFetch<TDefaultResponse>('/auth/login', getOptions('POST', { email, password }))
      if (pending) {
        if (data.value) {
          if (data.value.success) {
            cookieToken.value = data.value.token
          }
          return data.value
        }
      }
    } catch {
      return errorCode
    }
    return errorCode
  }

  async function logout() {
    try {
      const { data, pending } = await useFetch<TDefaultResponse>('/auth/logout', getOptions('POST'))
      if (pending) {
        if (data.value && data.value.success) {
          cookieToken.value = null
          return navigateTo('/login')
        }
      }
    } catch {
      return errorCode
    }

    return errorCode
  }

  return {
    baseStorageURL,
    api,
    login,
    logout,
    apiLazy,
    getLazyOptions
  }
}
