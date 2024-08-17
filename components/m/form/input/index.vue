<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, email, maxValue, minValue, url } from '@vuelidate/validators'
import { validationError } from '~/assets/data/validationErrors'
const props = defineProps<{
    name?: string
    code: string
    icon?: string
    type?: string
    maxSize?: number
    modelValue: string | number | null | undefined
    ruleRequired?: boolean
    ruleEmail?: true
    ruleLink?: true
    filtered?: true
    min?: number
    max?: number
    hint?: 'price'
  }>()
const inputId = computed(() => 'input-' + props.code)
const model = ref(props.modelValue)
const rules = {
  [props.code]: {}
}
props.maxSize && Object.assign(rules[props.code], { maxLength: maxLength(props.maxSize) })
props.max && Object.assign(rules[props.code], { maxValue: maxValue(props.max) })
props.min && Object.assign(rules[props.code], { minValue: minValue(props.min) })
props.ruleRequired && Object.assign(rules[props.code], { required })
props.ruleEmail && Object.assign(rules[props.code], { email })
props.ruleLink && Object.assign(rules[props.code], { url })

const getType = computed(() => {
  if (props.type === 'price' || props.type === 'number') { return 'number' }
  if (props.type === 'date') { return 'date' }
  if (props.type === 'link') { return 'url' }
  return 'text'
})

const emit = defineEmits(['update:modelValue'])
const v$ = useVuelidate(rules, { [props.code]: model })
watch(
  () => model.value,
  () => {
    v$.value[props.code].$touch()
    emit('update:modelValue', model.value)
  }
)
watch(
  () => props.modelValue,
  () => {
    model.value = props.modelValue
  }
)
const error = computed(() => validationError(v$.value[props.code]))
</script>

<template>
  <div class="m-input" :class="error ? 'm-input--error' : 'm-input--default'">
    <label :for="inputId" class="m-input__label">
      <input
        :id="inputId"
        v-model="model"
        :type="getType"
        class="peer m-input__body"
        :placeholder="name"
        :min="min"
        :max="max"
      >
      <div v-if="model" class="cursor-pointer absolute inset-y-0 right-0 flex items-center " :class="type === 'date' || type === 'number' ? 'mr-8': 'mr-2'" @click="model = null">
        <Icon name="material-symbols:close-small" aria-hidden="true" class="h-5 w-5 text-gray-400" />
      </div>
      <span v-if="name" class="m-input__text">
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
        {{ name }} {{ ruleRequired ? '*' : '' }}
      </span>
    </label>
    <div class="m-input__hint">
      <div>
        <span v-if="hint ==='price' && typeof model === 'number'">{{ priceSet(model) }}</span>
        <span v-if="error">{{ error }}</span>
      </div>
      <div v-if="maxSize">
        {{ model && typeof model === 'string' ? model.length : 0 }} / {{ maxSize }}
      </div>
    </div>
  </div>
</template>
