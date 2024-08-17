export default defineNuxtPlugin(() => {
  // редирект если не авторизован
  addRouteMiddleware('m-auth', () => {
    const cookieToken = useCookie('at')
    if (process.client && !cookieToken.value) {
      // console.log('РЕдирект так как не авторизован')
      // return navigateTo('/login')
    }
  })
  // редирект если авторизован
  addRouteMiddleware('m-guest', () => {

  })
})
