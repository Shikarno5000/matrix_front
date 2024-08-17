<template>
  <MTable
    :settings="entitySettings.products.table"
    :title="data.name"
    :items="data.products"
    :to="{id: data.id }"
    @refresh="emit('refresh')"
  >
    <template #header>
      <MCreate v-if="data.create_update" :data="data.create_update" />
      <MDialog table="chapters" action="edit" :data="data" @refresh="emit('refresh')" />
    </template>
  </MTable>
  <div class="ml-3">
    <MTable
      v-if="getAllPlk(props.data.products).length"
      :settings="entitySettings.productPlks.table2"
      :title="entitySettings.productPlks.table2.title"
      :items="getAllPlk(props.data.products)"
      @refresh="emit('refresh')"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['refresh'])
const props = defineProps<{
  data: TChapter
}>()

function getAllPlk (products: TProduct[]) {
  const result: any[] = []
  products.forEach((product) => {
    product.product_plks.forEach((productPlk) => {
      result.push({ ...productPlk, product })
    })
  })
  return result
}
</script>
