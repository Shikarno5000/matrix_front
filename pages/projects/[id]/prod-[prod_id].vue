<template>
  <MPage
    :status="status"
    :title="data && data['name']"
    :title-short="data && data['code']"
    :error="error"
    :breadcrumbs="breadcrumbs"
  >
    <div v-if="data" class="grid gap-3">
      <div class="grid md:grid-cols-3 gap-3">
        <MAlert v-if="data.version" type="info">
          <MCardItems :items="cardValues" @refresh="refresh" />
        </MAlert>
        <MCard :data="data" :no-edit="data.version ? true : false" :code="entitySettings.products.table.code" :card="entitySettings.products.card" @refresh="refresh" />
        <ETimeline v-if="!data.version" :timelines="data.timelines" :to="{table: 'products', id: data.id }" @refresh="refresh" />
        <div v-if="!data.version" class="grid gap-3">
          <EStage :stages="data.stages" :to="{table: 'products', id: data.id }" @refresh="refresh" />
          <MTable
            :settings="entitySettings.productVersions.table"
            :items="data.versions"
            :to="{table: 'products', id: data.id }"
            @refresh="refresh"
          />
        </div>
      </div>
      <MTable
        :settings="{...entitySettings.productPlks.table, add: !data.version ? true : false, edit: !data.version ? true : false }"
        :items="data.product_plks"
        :to="{table: 'products', id: data.id }"
        @refresh="refresh"
      />
      <MTable
        :settings="{...entitySettings.productElements.table, add: !data.version ? true : false, edit: !data.version ? true : false }"
        :items="data.product_elements"
        :to="{table: 'products', id: data.id }"
        @refresh="refresh"
      />
    </div>
  </MPage>
</template>

<script setup lang="ts">
const { status, data, error, refresh } = useAuthNew().getShow('products', useRoute().params.prod_id)

const breadcrumbs = computed(() => {
  const res = [{ to: '/projects/', title: 'Проекты' }]
  if (data.value) { res.push({ to: '/projects/' + data.value.chapter.subgroup.direction.project.id + '/', title: data.value.chapter.subgroup.direction.project.name_short }) }
  return res
})

definePageMeta({
  middleware: 'm-auth'
})

const cardValues = computed<TCardItem[]>(() => {
  if (!data.value) { return [] }
  return [
    {
      name: 'Snapshot ШУ',
      data: {
        value: 'перейти',
        type: 'link',
        to: `/projects/2/prod-${data.value.product.version_group}/`
      }
    },
    {
      name: 'Дата',
      data: {
        value: data.value.product.version_date,
        type: 'text'
      }
    },
    {
      name: 'Комментарий',
      data: {
        value: data.value.product.version_comment,
        type: 'text'
      }
    },
    {
      name: 'Стоимость',
      data: {
        value: data.value.product.version_price,
        type: 'text'
      }
    },
    {
      name: 'План факт анализ',
      data: {
        value: data.value.product.version_pfa ? 'да' : 'нет',
        type: 'text'
      }
    }
  ]
})
</script>
