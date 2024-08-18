<template>
  <div class="m-dialog">
    <div class="m-dialog__block">
      <div class="m-dialog__item">
        <div class="m-dialog__panel">
          <h2 class="m-dialog__title">
            <div>Вход в СУИП.</div>
          </h2>
          <div class="m-dialog__body">
            <div class="grid max-w-full gap-3">
              <MFormInput v-model="email" name="Логин" code="email" rule-required />
              <MFormInput v-model="password" type="password" name="Пароль" code="password" rule-required />
            </div>
          </div>
          <MAlertError v-if="showError" :error="showError" />
          <div class="m-dialog__btns">
            <MBtn text="Войти" class="m-btn--green" :disabled="disabledSubmit" @click="login()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useAuthStore } from '~/store/auth'
const store = useAuthStore()
const v$ = useVuelidate()
const cookieToken = useCookie('at', {
  expires: new Date(Date.now() + 12096e5), // 2 weeks from now
  sameSite: 'strict'
})

const disabledSubmit = computed(() => v$.value.$invalid)
const email = ref('')
const password = ref('')
const showError = ref<false | TErrorData>(false)

async function login () {
  const { data, pending, error } = await useFetch<TDefaultResponse>('/auth/login', getOptions('POST', { email.value, password.value }))
  if (!pending && data.value) {
    cookieToken.value = data.value.token
    await store.getUser()
    return navigateTo('/')
  }
  if (error.value) {
    showError.value = response.error
   
  }
}


async function login(email: string, password: string) {
    try {
      const { data, pending } = await useFetch<TDefaultResponse>('/auth/login', getOptions('POST', { email.value, password.value }))
      if (pending && data.value) {
        cookieToken.value = data.value.token
        return data.value
      }
    } catch {
      return errorCode
    }
    return errorCode
  }

</script>
