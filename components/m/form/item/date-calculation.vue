<template>
  <div v-if="formData.date" class="flex gap-2 border p-2">
    <MFormInput
      v-model="model"
      :name="data.name"
      :code="data.code"
      :rule-required="data.required"
      type="date"
    />
    <MFormSelect
      v-model="calcType"
      :values="[{id: 1, name: 'Календарных'}, {id: 2, name: 'Рабочих'}]"
      name="Тип"
      code="calcType"
      class="col-span-2"
    />
    <MFormInput
      v-model="calcVal"
      name="Дней"
      code="calcVal"
      type="number"
    />
    <MBtn text="Выч." class="m-btn--green" @click="calcContractExecution()" />
    <div class="" />
  </div>
</template>

<script lang="ts" setup>
const model = defineModel<any>()
const props = defineProps<{
  data: any
  formData: any
}>()

const calcType = ref(1)
const calcVal = ref(null)

function calcContractExecution () {
  if (props.formData.date && calcVal.value) {
    model.value = calcType.value === 1 ? addDays(props.formData.date, calcVal.value) : addWorkDays(props.formData.date, calcVal.value)
  }
}
</script>
