<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { validationError } from '~/assets/data/validationErrors'
const props = defineProps<{
  name: string
  code: string
  values: TRadio[]
  modelValue: number | null
  ruleRequired?: true
  multiple?: boolean
}>()

const model = ref(props.modelValue ? getById(props.values, props.modelValue) : props.values[0])
const rules = {
  [props.code]: {}
}
props.ruleRequired && Object.assign(rules[props.code], { required })

const emit = defineEmits(['update:modelValue'])
const v$ = useVuelidate(rules, { [props.code]: model })
emit('update:modelValue', model.value ? model.value?.id : null)
watch(
  () => model.value,
  () => {
    v$.value[props.code].$touch()
    emit('update:modelValue', model.value ? model.value?.id : null)
  }
)
const error = computed(() => validationError(v$.value[props.code]))
</script>

<template>
  <div class="m-radio">
    <div class="m-radio__header">
      {{ name }}
    </div>
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
    <div v-for="item in values" :key="item.id" class="m-radio__item">
      <input
        :id="'radio-' + item.id"
        v-model="model"
        type="radio"
        :value="item"
        class="m-radio__input"
        :aria-labelledby="'radio-' + item.id"
        :aria-describedby="'radio-' + item.id"
      >
      <label :for="'radio-' + item.id" class="m-radio__label"> {{ item.name }} </label>
    </div>
  </div>
</template>
