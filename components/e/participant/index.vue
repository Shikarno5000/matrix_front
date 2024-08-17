<template>
  <MSection v-if="data" :sec-code="`info-part-${data.id}`" title="Участники проекта" hide-in-modal>
    <template #header>
      <MBtnShowEdit v-model="showEdit" />
      <MDialog :to="{id: data.id}" table="participants" action="add" @refresh="emit('refresh')" />
    </template>
    <dl class="divide-y">
      <div v-for="(participant, index ) in useGroupBy(props.data.participants, 'participant_type_id')" :key="index" class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 sm:items-center text-xs">
        <div class="font-semibold text-gray-900">
          {{ staticDataGetNameById('participant_types', Number(index)) }}
        </div>
        <div class="text-gray-700 sm:col-span-2">
          <EParticipantCard :show-edit="showEdit" :data="participant" @refresh="emit('refresh')" />
        </div>
      </div>
      <div class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4 sm:items-center text-xs">
        <div class="font-semibold text-gray-900">
          Участники проекта от Матрикс
        </div>
        <div class="text-gray-700 sm:col-span-2">
          <div class="flex w-full">
            <span class="flex flex-wrap flex-1 gap-2 items-center">
              <EUserCard v-for="item in data.users" :key="item.id" :data="item" />
            </span>
            <MDialog
              v-if="showEdit"
              :to="{id: data.id}"
              table="project-users"
              :data="data"
              action="edit"
              @refresh="emit('refresh')"
            />
          </div>
        </div>
      </div>
    </dl>
  </MSection>
</template>

<script setup lang="ts">
const showEdit = ref(false)
const emit = defineEmits(['refresh'])
const props = defineProps<{
  data: TProject
}>()
</script>
