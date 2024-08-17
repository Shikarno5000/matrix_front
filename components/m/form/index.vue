<template>
  <template v-for="(line, index) in values" :key="index">
    <div v-if="line.formBlock" :class="getClass(line.formBlock)">
      <template v-for="(subLine, blockIndex) in line.items" :key="blockIndex">
        <MFormItem
          v-if="showItem(subLine.noAdd, subLine.noEdit)"
          v-model="formData[subLine.code as keyof typeof formData]"
          :data="subLine"
          :item-class="getBlockClass(line.formBlock, blockIndex)"
          :form-data="formData"
          :action="action"
        />
      </template>
    </div>
    <template v-else>
      <MFormItem v-if="showItem(line.noAdd, line.noEdit)" v-model="formData[line.code as keyof typeof formData]" :data="line" :form-data="formData" :action="action" />
    </template>
  </template>
</template>

<script lang="ts" setup>
// стандартный блок
const props = defineProps<{
  action: 'add' | 'edit'
  values: any[]
  data: any
}>()

function getClass (type: string) {
  let res = 'grid gap-2 '
  if (type === '2') { res += 'grid-cols-2' }
  if (type === '3' || type === '21' || type === '12') { res += 'grid-cols-3' }
  return res
}
function getBlockClass (type: string, index: number) {
  if ((type === '21' && !(index % 2)) || (type === '12' && index % 2)) { return 'col-span-2' }
}

function showItem (noAdd: true | undefined, noEdit: true | undefined) {
  if (props.action === 'add' && noAdd) { return false }
  if (props.action === 'edit' && noEdit) { return false }
  return true
}

// получение списка значений
const formValues = computed(() => {
  const res: string[] = []
  const def: {code: string, value: string }[] = []
  props.values.forEach((line) => {
    if (line.formBlock && line.items) {
      line.items.forEach((subLine: any) => {
        res.push(subLine.code)
        if (typeof subLine.default !== 'undefined') { def.push({ code: subLine.code, value: subLine.default }) }
      }
      )
    } else if (line.code) {
      res.push(line.code)
      if (typeof line.default !== 'undefined') { def.push({ code: line.code, value: line.default }) }
    }
  })
  return { res, def }
})

// Получение данных
const formData = ref(getFormData(props.data, formValues.value.res, formValues.value.def))
// отслеживание изменений
const emit = defineEmits(['updateFormData', 'submit', 'close'])
const handleEnterClick = (event: any) => {
  if (!event.shiftKey && ['Enter', 'NumpadEnter'].includes(event.code)) { emit('submit') }
  if (event.code === 'Escape') { emit('close') }
}
onMounted(() => window.addEventListener('keydown', handleEnterClick))
onUnmounted(() => window.removeEventListener('keydown', handleEnterClick))
watch(() => formData.value, () => { emit('updateFormData', formData.value) }, { deep: true })
</script>
