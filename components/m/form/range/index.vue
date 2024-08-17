<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required, maxLength, email, maxValue, minValue } from '@vuelidate/validators'
import { validationError } from '~/assets/data/validationErrors'
const props = defineProps<{
    name?: string
    code: string
    icon?: string
    type?: string
    maxSize?: number
    modelValue: string | number | null
    ruleRequired?: boolean
    ruleEmail?: true
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
    <div class="px-6 w-full">
      <span v-if="name" class="text-xs font-semibold">
        <Icon v-if="icon" :name="icon" class="h-4 w-4" />
        {{ name }}: {{ model }} {{ ruleRequired ? '*' : '' }}
      </span>
      <input
        :id="inputId"
        v-model="model"
        type="range"
        class="range bg-blue-500 thumb:bg-white w-full"
        min="0"
        max="100"
        step="1"
      >
      <div class="flex justify-between text-xs text-gray-600">
        <span class="w-8 text-left">0%</span>
        <span class="w-8 text-center">25%</span>
        <span class="w-8 text-center">50%</span>
        <span class="w-8 text-center">75%</span>
        <span class="w-8 text-right">100%</span>
      </div>
    </div>
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
