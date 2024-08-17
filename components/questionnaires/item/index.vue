<template>
  <MFormInput
    v-if="type === 'number'"
    v-model="model[name]"
    :name="name"
    type="number"
    :min="0"
    :code="name"
  />
  <MFormSelect v-else v-model="model[name]" :name="name" :values="getValues" :code="name" />
</template>

<script setup lang="ts">
const model = defineModel<any>()
const props = defineProps<{
  name: string
  type: string
}>()
const getValues = computed(() => {
  if (props.type === 'yesNo') {
    return [
      { id: 'да', name: 'да' },
      { id: 'нет', name: 'нет' }
    ]
  } else if (props.type === 'rele') {
    return [
      { id: 'да', name: 'да' },
      { id: 'нет', name: 'нет' },
      { id: 'добавить', name: 'добавить' }
    ]
  } else if (props.type === '22024') {
    return [
      { id: '220', name: '220' },
      { id: '24', name: '24' },
      { id: 'питание не требуется', name: 'питание не требуется' }
    ]
  } else if (props.type === 'ptkOven') {
    return [
      { id: 'ПТК ГПП', name: 'ПТК ГПП' },
      { id: 'ОВЕН', name: 'ОВЕН' },
      { id: 'Нет', name: 'Нет' }
    ]
  } else if (props.type === 'type') {
    return [
      { id: 'УПП', name: 'УПП' },
      { id: 'ПЧ', name: 'ПЧ' },
      { id: 'ПП', name: 'ПП' },
      { id: 'УПП+ПП', name: 'УПП+ПП' }
    ]
  }
  return []
})

</script>
