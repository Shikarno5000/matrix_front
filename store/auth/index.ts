import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth-store', () => {
  const user = ref<TUser>()
  const baseUrl = 'users'

  const getUser = async () => {
    if (!user.value) {
      const { status, data } = await useAuthNew().api(`${baseUrl}/user`)
      if (status.value === 'success') {
        user.value = data.value
      }
    }
  }
  const getSettingValue = (name: string) => {
    const settings = user.value?.settings
    if (!settings || typeof settings !== 'string') {
      return
    }
    const parseSettings: { name: string; value: any }[] = JSON.parse(settings)

    const setting = parseSettings.find((i: any) => i.name === name)
    return setting ? setting.value : undefined
  }
  const setSettingValue = async (name: string, value: number | boolean) => {
    await useAuthNew().api(`${baseUrl}/settings`, 'patch', { name, value })
  }

  return {
    setSettingValue,
    user,
    getUser,
    getSettingValue
  }
})
