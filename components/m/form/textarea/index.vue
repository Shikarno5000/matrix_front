<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, email } from '@vuelidate/validators'
import { validationError } from '~/assets/data/validationErrors'
const props = defineProps<{
  name: string
  code: string
  icon?: string
  type?: string
  maxSize?: number
  modelValue: string | number | null
  ruleRequired?: true
  ruleEmail?: true
}>()
const inputId = computed(() => 'input-' + props.code)
const model = ref(props.modelValue)
const rules = {
  [props.code]: {}
}
props.maxSize && Object.assign(rules[props.code], { maxLength: maxLength(props.maxSize) })
props.ruleRequired && Object.assign(rules[props.code], { required })
props.ruleEmail && Object.assign(rules[props.code], { email })

const emit = defineEmits(['update:modelValue'])
const v$ = useVuelidate(rules, { [props.code]: model })
watch(
  () => model.value,
  () => {
    v$.value[props.code].$touch()
    emit('update:modelValue', model.value)
  }
)
const error = computed(() => validationError(v$.value[props.code]))
</script>

<template>
  <div class="m-textarea" :class="error ? 'm-textarea--error' : 'm-textarea--default'">
    <textarea
      :id="inputId"
      v-model="model"
      class="peer m-textarea__body"
      placeholder=" "
      :type="type ? type : 'text'"
    />
    <div class="m-textarea__hint">
      <div>
        <span v-if="error">{{ error }}</span>
      </div>
      <div v-if="maxSize">
        {{ model && typeof model === 'string' ? model.length : 0 }} / {{ maxSize }}
      </div>
    </div>
    <label class="m-textarea__label" :for="inputId">
      <Icon v-if="icon" :name="icon" class="h-4 w-4" />
      {{ name }} {{ ruleRequired ? '*' : '' }}
    </label>
  </div>
</template>
