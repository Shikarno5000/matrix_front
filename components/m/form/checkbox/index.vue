<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
const props = defineProps<{
  name: string
  code: string
  modelValue: boolean | null
}>()
const inputId = computed(() => 'input-' + Math.ceil(Math.random() * 1000))
const model = ref(props.modelValue)
const rules = {
  [props.code]: {}
}
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
</script>

<template>
  <label :for="inputId" class="m-checkbox">
    <div class="flex items-center">
      &#8203;
      <input :id="inputId" v-model="model" type="checkbox" class="m-checkbox__icon">
    </div>

    <div>
      <strong class="m-checkbox__text"> {{ name }} </strong>
    </div>
  </label>
</template>
