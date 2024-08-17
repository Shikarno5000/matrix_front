<template>
  <MSection :sec-code="`direction-${data.id}`" :title="data.name" hide-in-modal>
    <template #header>
      <div v-if="data.project?.project_type_id === 1" class="flex gap-2">
        <MBtn text="ПД" text-class="text-xs" class="m-btn--small border" @click="addPDorRD(data.id, 'pd', 'ПД')" />
        <MBtn text="РД" text-class="text-xs" class="m-btn--small border" @click="addPDorRD(data.id, 'rd', 'РД')" />
      </div>
      <MCreate v-if="data.create_update" :data="data.create_update" />
      <MDialog table="directions" action="edit" :data="data" @refresh="emit('refresh')" />
      <MDialog :to="{id: data.id}" table="subgroups" add-icon="material-symbols:add-home-outline" action="add" @refresh="emit('refresh')" />
    </template>
    <div class="grid gap-1">
      <ESubgroups
        v-for="item in data.subgroups"
        :key="item.id"
        :data="item"
        @refresh="emit('refresh')"
      />
    </div>
  </MSection>
</template>

<script setup lang="ts">
async function addPDorRD(id: number, type: string, name: string) {
  if (window.confirm(`Добавить ${name}?`)) {
    await useAuthNew().api(`directions/${type}/${id}`, 'POST')
    emit('refresh')
  }
}

defineProps<{
  data: TDirection
}>()
const emit = defineEmits(['refresh'])
</script>
