<template>
  <ClientOnly v-if="show">
    <MFormSelect
      v-if="['select','multiSelect'].includes(data.type)"
      v-model="model"
      :values="filteredSelect"
      :name="data.name"
      :code="data.code"
      :disabled="action === 'edit' && data.disabledEdit"
      :rule-required="req"
      :multiple="data.multiple"
      :class="itemClass"
    />
    <MFormInput
      v-if="['string','price','date', 'number','email', 'phone', 'link'].includes(data.type)"
      v-model="model"
      :name="data.name"
      :max-size="data.maxSize"
      :min-size="data.minSize"
      :max="data.max"
      :min="data.min"
      :code="data.code"
      :rule-required="req"
      :rule-email="data.type === 'email' ? true : undefined"
      :rule-link="data.type === 'link' ? true : undefined"
      :hint="data.type === 'price' ? 'price' : undefined"
      :type="data.type"
      :class="itemClass"
    />
    <MFormFile v-if="data.type === 'file'" v-model="model" :code="data.code" :rule-required="data.required" />
    <MFormCheckbox
      v-if="data.type === 'checkbox'"
      v-model="model"
      :name="data.name"
      :code="data.code"
      :rule-required="req"
      :class="itemClass"
    />
    <MFormTextarea
      v-if="data.type === 'textarea'"
      v-model="model"
      :name="data.name"
      :code="data.code"
      :rule-required="req"
      :class="itemClass"
    />
    <MFormRange
      v-if="data.type === 'range'"
      v-model="model"
      :name="data.name"
      :code="data.code"
      :rule-required="req"
      :class="itemClass"
    />
    <MFormItemElementPrices v-if="data.type === 'element_prices'" :data="formData" :class="itemClass" />
    <MFormItemDateCalculation v-if="data.type === 'dateCalculation'" v-model="model" :form-data="formData" :data="data" :class="itemClass" />
  </ClientOnly>
</template>

<script lang="ts" setup>
const model = defineModel<any>()
const props = defineProps < {
  action: 'add' | 'edit'
  data: any
  formData: any
  itemClass?: string
}>()

const req = computed(() => props.data.required || (props.action === 'add' && props.data.addRequired))

const select = ref<TSelect[]>([])
if (['select', 'multiSelect'].includes(props.data.type)) {
  await getItems()
}
const filteredSelect = ref(select.value)
async function getItems () {
  if (['contracts', 'positions', 'users', 'letters', 'plks', 'projects', 'specifications', 'software', 'counterAgents', 'counterAgentWorkers', 'elements'].includes(props.data.items)) {
    let url = props.data.items
    props.data.items === 'software' && (url = 'softwares')
    props.data.items === 'counterAgents' && (url = 'counter-agents')
    props.data.items === 'counterAgentWorkers' && (url = 'counter-agent-workers')
    const { status, pending, data } = await useAuthNew().getSelectData(url)
    if (!pending.value && status.value === 'success') {
      // фильтруем значения
      if (props.data.items === 'elements' && data.value) {
        select.value = props.data.itemsFilter ? data.value.filter((i: any) => i.element_type_id === props.data.itemsFilter) : data.value
      } else { select.value = data.value }
    }
  }
  if (props.data.static) {
    select.value = staticDataForSelect(props.data.static)
  }
  return []
}
// показывать ли
const show = computed(() => {
  if (!props.data.if) { return true }
  if (props.formData && props.formData[props.data.if]) {
    if (props.data.ifEqual) {
      return props.formData[props.data.if] === props.data.ifEqual
    } else { return true }
  }
  return false
})
// фильтр элементов
if (props.formData && props.data.itemsFilter && props.data.filterValue) {
  watch(
    () => props.formData[props.data.itemsFilter],
    () => {
      filteredSelect.value = select.value.filter((i:any) => {
        if (i[props.data.filterValue] && i[props.data.filterValue].includes(props.formData[props.data.itemsFilter])) { return true }
        return false
      })
    }
  )
}

</script>
