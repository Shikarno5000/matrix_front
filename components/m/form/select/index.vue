<script lang="ts" setup>
import { useVuelidate } from '@vuelidate/core'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { required } from '@vuelidate/validators'
import { validationError } from '~/assets/data/validationErrors'
const props = defineProps<{
  name: string
  code: string
  values: TSelect[]
  modelValue?: TSelect[] | null | number | string
  ruleRequired?: true
  multiple?: boolean
}>()

const filter = ref('')
const filteredItems = computed(() => {
  if (!props.values) {
    return []
  }
  // Фильтрация
  let filteredItems = []
  if (filter.value && filter.value !== '') {
    filteredItems = props.values.filter((items) => {
      if (String(items.name).toLowerCase().includes(filter.value.toLowerCase())) {
        return true
      }
      return false
    })
  } else {
    filteredItems = props.values
  }
  return filteredItems
})

const selectedItems: TSelect[] = []
if (Array.isArray(props.modelValue)) {
  props.modelValue.forEach((i) => {
    const index = getIndex(props.values, i.id)
    if (index !== -1) {
      selectedItems.push(props.values[index])
    }
  })
}

const model = ref(props.multiple ? selectedItems : typeof props.modelValue === 'number' ? getById(props.values, props.modelValue) : [])
const rules = {
  [props.code]: {}
}
props.ruleRequired && Object.assign(rules[props.code], { required })

const emit = defineEmits(['update:modelValue'])
const v$ = useVuelidate(rules, { [props.code]: model })
watch(
  () => model.value,
  () => {
    v$.value[props.code].$touch()
    emit('update:modelValue', props.multiple ? model.value : model.value && !Array.isArray(model.value) ? model.value.id : null)
  }
)
const error = computed(() => validationError(v$.value[props.code]))
</script>

<template>
  <Listbox v-model="model" :multiple="multiple">
    <div class="m-select" :class="error ? 'm-select--error' : 'm-select--default'">
      <ListboxButton class="m-select__button">
        <template v-if="multiple && Array.isArray(model)">
          <div v-if="model.length > 0" class="line-clamp-1">
            {{ model?.map((i: TSelect) => i.name).join(', ') }}
          </div>
        </template>
        <template v-else>
          <div v-if="model && !Array.isArray(model)" class="line-clamp-1">
            {{ model.name_short ? model.name_short : model.name }}
          </div>
        </template>

        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon name="tabler:chevron-down" aria-hidden="true" class="h-5 w-5 text-gray-400" />
        </div>
        <div class="m-select__text">
          {{ name }} {{ ruleRequired ? '*' : '' }}
        </div>
      </ListboxButton>
      <ListboxOptions class="m-select__options">
        <div v-if="values.length > 10" class="block w-[calc(100%+0.5rem)] focus:ring-transparent text-sm px-3 py-1.5 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border-0 border-b border-gray-200 dark:border-gray-700 sticky -top-1 -mt-1 mb-1 -mx-1 z-20 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none">
          <MFormInput v-model="filter" code="filter" name="Поиск" icon="mdi:search" />
        </div>
        <ListboxOption v-slot="{ active }" @click="model = multiple ? [] : null">
          <li :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-10 pr-4']">
            <div class="opacity-80">
              Не выбрано
            </div>
          </li>
        </ListboxOption>
        <ListboxOption v-for="item in filteredItems" v-slot="{ active, selected }" :key="item.id" :value="item" as="template">
          <li :class="[active ? 'bg-amber-100 text-amber-900' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-10 pr-4']">
            <span :class="[selected ? 'font-medium' : 'font-normal', 'block']">{{ item.name }}</span>
            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
              <Icon name="tabler:check" aria-hidden="true" class="h-5 w-5" />
            </span>
          </li>
        </ListboxOption>
      </ListboxOptions>
      <div v-if="error" class="m-select__hint">
        {{ error }}
      </div>
    </div>
  </Listbox>
</template>
