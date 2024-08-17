<template>
  <MPage
    :status="status"
    :title="data && data['article']"
    :title-short="data && data['article']"
    :error="error"
    :breadcrumbs="breadcrumbs"
  >
    <div v-if="data" class="grid gap-3">
      <div class="grid grid-cols-2 gap-3">
        <MCard :data="data" :code="entitySettings.specifications.table.code" :card="entitySettings.specifications.card" @refresh="refresh" />
        <EStage :stages="data.stages" :to="{table: 'specifications', id: data.id }" @refresh="refresh" />
      </div>
      <MTable
        :settings="getTable2(true)"
        table="products"
        title="Перечень продукции ШУ"
        :items="data.products"
        @refresh="refresh"
      />
      <MTable
        :settings="getTable2()"
        table="servers"
        title="Перечень продукции Сервера"
        :items="data.servers"
        @refresh="refresh"
      />
      <MTable
        :settings="getTable2()"
        table="lower_levels"
        title="Перечень продукции НУ"
        :items="data.lower_levels"
        @refresh="refresh"
      />
      <MTable
        :settings="getTable('element')"
        table="elements"
        title="Перечень продукции ЭБ"
        :items="data.chapter_elements"
        @refresh="refresh"
      />
      <MTable
        :settings="getTable('plk')"
        table="plks"
        title="Перечень продукции Плк"
        :items="data.chapter_plks"
        @refresh="refresh"
      />
      <MTable
        :settings="getTable('software')"
        table="servers"
        title="Перечень продукции ПО"
        :items="data.chapter_software"
        @refresh="refresh"
      />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('specifications', useRoute().params.sid)

const breadcrumbs = computed(() => {
  const res = [{ to: '/office-work/', title: 'Делопроизводство' }, { to: '/office-work/contracts/', title: 'Реестр договоров' }]
  if (data.value) { res.push({ to: `/office-work/contracts/${data.value.contract.id}`, title: data.value.contract.code }) }
  return res
})

definePageMeta({
  middleware: 'm-auth'
})

function getTable(table: string) {
  return {
    code: '',
    title: '',
    import: false,
    export: false,
    importExport: null,
    delAll: false,
    add: false,
    edit: false,
    headers: [
      { name: 'Наименование', code: table, type: 'extractingValues', extractingValue: 'article' },
      { name: 'Артикул', code: table, type: 'extractingValues', extractingValue: 'name' },
      { code: 'col', name: 'Количество', type: 'string' },
      { code: 'projects', name: 'Проект', type: 'projects' }
    ]
  }
}
function getTable2(code: boolean = false) {
  return {
    code: '',
    title: '',
    import: false,
    export: false,
    importExport: null,
    delAll: false,
    add: false,
    edit: false,
    headers: [
      { name: code ? 'Код' : 'Артикул', code: code ? 'code' : 'article', type: 'string' },
      { name: 'Наименование', code: 'name', type: 'string' },
      { code: 'col', name: 'Количество', type: 'string' },
      { code: 'projects', name: 'Проект', type: 'projects' }
    ]
  }
}

</script>
