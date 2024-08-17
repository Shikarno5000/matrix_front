<template>
  <MPage
    title="Файлы"
    :status="status"
    :error="error"
    :breadcrumbs="[{ to: '/admin', title: 'Админ' }]"
  >
    <MTable v-if="data" :settings="entitySettings.files.table" :items="data" @refresh="refresh" />
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getAll('files')

definePageMeta({
  middleware: 'm-auth'
})
</script>
// TODO: нужно для переделки страницы
<!-- <template>
  <MTable
    title="Список файлов"
    :settings="filesStore.table"
    :items="filesStore.all"
    table="files"
    @refresh="filesStore.getAll()"
  >
    <template #size="{item}">
      {{ formatBytes(item.size) }}
    </template>
    <template #delete="{item}">
      <Icon name="ic:baseline-delete-forever" class="pointer size-4" @click="delFile(item.id)" />
    </template>
    <template #elements="{item}">
      {{ item.elements.map((i: any) => i.name).join(', ') }}
      {{ item.products.map((i: any) => i.name).join(', ') }}
      {{ item.documents.map((i: any) => i.name).join(', ') }}
      {{ item.plks.map((i: any) => i.name).join(', ') }}
      {{ item.servers.map((i: any) => i.name).join(', ') }}
      {{ item.softwares.map((i: any) => i.name).join(', ') }}
    </template>
  </MTable>
  <MAlert v-if="unnecessaryFiles.length" type="error" class="mt-5">
    <div class="font-semibold">
      Лишние файлы
    </div>
    {{ unnecessaryFiles.join(', ') }}
  </MAlert>
</template> -->

<!-- <script setup lang="ts">
import { useFilesStore } from '~/store/files'
const filesStore = useFilesStore()
filesStore.getAll()

const files = await useAuth().api('/files/all')
const unnecessaryFiles = computed(() => {
  if (!files.success || !files.data) { return [] }
  const fileNames: string[] = []
  files.data.forEach((i: string) => {
    const name = i.slice(7)
    if (name !== '.gitignore') {
      fileNames.push(name)
    }
  })
  return useDifference(fileNames, filesStore.all.map(i => i.url))
})

function delFile (id: number) {
  filesStore.del(id)
  filesStore.getAll()
}

</script> -->

<!-- <template>
</template>

<script setup lang="ts">
const page = {
  title: 'Файлы'
}
definePageMeta({
  middleware: 'm-auth'
})
useHead({
  title: page.title
})
</script> -->
