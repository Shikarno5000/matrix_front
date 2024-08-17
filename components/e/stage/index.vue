<template>
  <MSection :sec-code="`stages-${to.table}`" title="Вехи" :hide-in-modal="hideInModal">
    <template #header>
      <MBtnShowEdit v-model="showEdit" />
      <MDialog table="stages" :to="to" action="add" @refresh="emit('refresh')" />
    </template>
    <div class="m-stages">
      <div v-for="item in stages" :key="item.id" class="m-stage" :class="item.class">
        <MFormCheckbox v-model="item.checked" code="checked" :name="item.name" class="m-checkbox--small" @click="check(item.id, { checked: !item.checked})" />
        <div v-if="showEdit" class="flex items-center gap-1 m-text-muted">
          <MCreate v-if="item.create_update" :data="item.create_update" />
          <MDialog table="stages" :data="item" action="edit" @refresh="emit('refresh')" />
        </div>
      </div>
    </div>
  </MSection>
</template>

<script setup lang="ts">
async function check(id: number, val: {checked: boolean}) {
  await useAuthNew().api(`stages/${id}`, 'PATCH', val)
}

const showEdit = ref(false)
const emit = defineEmits(['refresh'])
defineProps<{
  stages: TStage[]
  hideInModal?: true
  to: {
    table: string
    id: number
  }
}>()
</script>
