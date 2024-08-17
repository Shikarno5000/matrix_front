<script setup lang="ts">
const emit = defineEmits(['refresh'])
defineProps<{
  data: TParticipant[]
  showEdit: boolean
}>()

</script>

<template>
  <div class="divide-y">
    <div v-for="participant in data" :key="participant.id" class="flex justify-between  items-center">
      <div class="grid gap-2 p-2">
        <div class="flex gap-3">
          <ECounterAgentCard :data="participant.counter_agent" /> {{ participant.comment }}
        </div>
        <span v-if="participant.counter_agent_workers?.length" class="flex flex-wrap gap-3">
          <b>Контактные лица:</b>
          <ECounterAgentWorkerCard v-for="worker in participant.counter_agent_workers" :key="worker.id" :data="worker" />
        </span>
      </div>
      <div v-if="showEdit" class="flex gap-2 items-center">
        <MCreate v-if="participant.create_update" :data="participant.create_update" />
        <MDialog :data="participant" table="participants" action="edit" @refresh="emit('refresh')" />
      </div>
    </div>
  </div>
</template>
