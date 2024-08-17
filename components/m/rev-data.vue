<template>
  <template v-if="data.type === 'text'">
    {{ data.value }}
  </template>
  <template v-else-if="data.type === 'textarea'">
    <MPopover v-if="data.value" text="читать" class="whitespace-pre-wrap">
      <div class="p-3">
        {{ data.value }}
      </div>
    </MPopover>
  </template>
  <template v-else-if="data.type === 'pre'">
    <pre>{{ data.value }}</pre>
  </template>
  <template v-else-if="data.type === 'email'">
    <a v-if="data.value" :href="`mailto:${data.value}`" class="underline">
      {{ data.value }}
    </a>
  </template>
  <template v-else-if="data.type === 'phone'">
    <a v-if="data.value" :href="`tel:${data.value}`" class="underline">
      {{ data.value }}
    </a>
  </template>
  <template v-else-if="data.type === 'contract'">
    <NuxtLink v-if="data.value" class="mr-2 underline" :to="getTo(data.value, '/office-work/contracts/{id}/')">
      № {{ data.value.code }} от {{ data.value.date }} ({{ data.value.object_name }})
    </NuxtLink>
  </template>
  <template v-else-if="data.type === 'contracts'">
    <NuxtLink v-for="contract in data.value" :key="contract.id" class="mr-2 underline" :to="getTo(contract, '/office-work/contracts/{id}/')">
      № {{ contract.code }} от {{ contract.date }} ({{ contract.object_name }})
    </NuxtLink>
  </template>
  <template v-else-if="data.type === 'counterAgent'">
    <ECounterAgentCard v-if="data.value" :data="data.value" />
  </template>
  <template v-if="data.type === 'counterAgents'">
    <ECounterAgentCard v-for="agent in data.value" :key="agent.id" :data="agent" class="mr-2" />
  </template>
  <template v-else-if="data.type === 'counterAgentWorker'">
    <ECounterAgentWorkerCard v-if="data.value" :data="data.value" />
  </template>
  <template v-else-if="data.type === 'counterAgentWorkers'">
    <ECounterAgentWorkerCard v-for="worker in data.value" :key="worker.id" :data="worker" class="mr-2" />
  </template>
  <template v-else-if="data.type === 'user'">
    <EUserCard :data="data.value" />
  </template>
  <template v-else-if="data.type === 'users'">
    <EUserCard v-for="user in data.value" :key="user.id" :data="user" class="mr-2" />
  </template>
  <template v-else-if="data.type === 'link'">
    <NuxtLink :to="data.to" class="underline" :download="data.download" :target="data.target">
      {{ data.value }}
    </NuxtLink>
  </template>
  <div v-else-if="data.type === 'cog' && edit" class="flex items-center gap-1 justify-center">
    <MCreate v-if="data.value.create_update" :data="data.value.create_update" />
    <MDialog :data="data.value" :table="table" action="edit" @refresh="emit('refresh')" />
  </div>
  <template v-else-if="data.type === 'files'">
    <div class="flex gap-1">
      <MDialog table="files" action="add" add-icon="fluent:document-add-16-regular" :to="data.value.to" @refresh="emit('refresh')" />
      <MPopover v-if="data.value.files.length" :text="`Файлов: ${data.value.files.length}`">
        <div class="divide-y">
          <div v-for="file in data.value.files" :key="file.id" class="flex p-2 items-center justify-between">
            <div>
              <NuxtLink :to="`${useAuth().baseStorageURL}/storage/${file.url}`" target="_blank" class="underline" :text="file.name" />
              <div>
                <span v-if="file.date"> Дата: {{ file.date }}</span>
                <span v-if="file.comment"> Ком.: {{ file.comment }}</span>
              </div>
            </div>
            <Icon name="ic:baseline-delete-forever" class="pointer size-4" @click="delFile(file.id)" />
          </div>
        </div>
      </MPopover>
    </div>
  </template>
</template>
<script lang="ts" setup>
const emit = defineEmits(['refresh'])
defineProps<{
  edit: boolean
  table: string
  data: {
    value: any
    type: string
    to: string
    target: '_blank'
    download?: true
  }
}>()

async function delFile(id: number) {
  await useAuthNew().api(`files/${id}`, 'DELETE')
  emit('refresh')
}
</script>
