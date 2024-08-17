<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { validationError } from '~/assets/data/validationErrors'
const props = defineProps<{
  name: string
  code: string
  values: string[]
  modelValue: string | null
  ruleRequired?: true
  multiple?: boolean
}>()

const model = ref(props.modelValue)
const rules = {
  [props.code]: {}
}
props.ruleRequired && Object.assign(rules[props.code], { required })

const emit = defineEmits(['update:modelValue'])
const v$ = useVuelidate(rules, { [props.code]: model })
emit('update:modelValue', model.value ? model.value : null)
watch(
  () => model.value,
  () => {
    v$.value[props.code].$touch()
    emit('update:modelValue', model.value ? model.value : null)
  }
)
const error = computed(() => validationError(v$.value[props.code]))
</script>

<template>
  <div class="grid grid-cols-2 gap-3 items-center w-[400px]">
    <div class="m-">
      {{ name }}:
    </div>
    <div class="flex  gap-2">
      <div v-for="item in values" :key="item" class="flex">
        <input
          :id="'radio-' + item"
          v-model="model"
          type="radio"
          :value="item"
          class="m-radio__input"
          :aria-labelledby="'radio-' + item"
          :aria-describedby="'radio-' + item"
        >
        <label :for="'radio-' + item" class="m-radio__label"> {{ item }} </label>
      </div>
    </div>
  </div>
  <div v-if="error" class="text-red-500">
    {{ error }}
  </div>
</template>
