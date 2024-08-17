<template>
  <!-- <pre>{{ getData() }}</pre> -->
  <div class="grid gap-3">
    <MSection :sec-code="`project-elements-${data.id}`" :title="`Выгрузка проекта: ${data.name}`">
      <div class="grid gap-2">
        <div class="flex gap-2">
          <MBtn text="Выделить все" class="m-btn--default m-btn--small border" @click="checkAll(true)" />
          <MBtn text="Снять все" class="m-btn--default m-btn--small border" @click="checkAll(false)" />
        </div>
        <MSection v-for="direction in temp" :key="direction.id" :sec-code="`direction-${direction.id}`" :title="direction.name" type="second">
          <template #header>
            <MBtn text="Выделить все" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAllInDir( true, direction.id)" />
            <MBtn text="Снять все" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAllInDir( false, direction.id)" />
            <MBtn text="ШУ" class="m-btn--default border" text-class="text-xs" @click="checkAllTypes('product', direction.id)" />
            <MBtn text="Сервера" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAllTypes('server', direction.id)" />
            <MBtn text="НУ" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAllTypes('lower_level', direction.id)" />
            <MBtn text="ДПУ" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAllTypes('chapter_element', direction.id)" />
            <MBtn text="ПЛК у разделов" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAllTypes('chapter_plk', direction.id)" />
          </template>
          <div class="grid gap-2">
            <MSection v-for="subgroup in direction.subgroups" :key="subgroup.id" :sec-code="`subgroup-${subgroup.id}`" :title="subgroup.name" type="second">
              <div>
                <div v-for="chapter in subgroup.chapters" :key="chapter.id" class="grid gap-2">
                  <div v-if="chapter.items.length" class="grid gap-2">
                    <template v-for="item in chapter.items" :key="item.id">
                      <MTable
                        :settings="settings"
                        :title="item.name"
                        :items="item.items"
                      >
                        <template #header>
                          <EProjectElementsExport :name="item.name" :items="item.items" class="ml-auto" />
                          <EProjectElementsCheckbox :value="checkVal(item.checkbox)" :name="item.checkbox" @value-change="(e) => checked(e)" />
                        </template>
                      </MTable>
                      <MSection v-if="item.plk && item.plk.length" sec-code="" title="Встроенные ПЛК" class="ml-5">
                        <template #header>
                          <MBtn text="Выбрать все" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAlPlk(chapter.id, true)" />
                          <MBtn text="Снять все" class="m-btn--default m-btn--small border" text-class="text-xs" @click="checkAlPlk(chapter.id, false)" />
                        </template>
                        <MTable
                          v-for="plk in item.plk"
                          :key="plk.id"
                          :settings="settings"
                          :title="plk.name"
                          :items="plk.items"
                        >
                          <template #header>
                            <EProjectElementsExport :name="plk.name" :items="plk.items" class="ml-auto" />
                            <EProjectElementsCheckbox :value="checkVal(plk.checkbox)" :name="plk.checkbox" @value-change="(e) => checked(e)" />
                          </template>
                        </MTable>
                      </MSection>
                    </template>
                  </div>
                </div>
              </div>
            </MSection>
          </div>
        </MSection>
      </div>
    </MSection>
    <!-- <pre>{{ allElements }}</pre> -->
    <MTable
      :settings="settings"
      title="Результат"
      :items="allSum"
    >
      <template #header>
        <EProjectElementsExport name="all" :items="allSum" class="ml-auto" />
      </template>
    </MTable>
  </div>
</template>

<script setup lang="ts">
//  Коды предусмотреть
const props = defineProps<{
  data: any
}>()

const allElements = ref<any[]>([])
function checked(event: any) {
  const index = allElements.value.findIndex(res => res.checkbox === event.name)
  allElements.value[index].value = event.value
}
function checkAll(newValue: boolean) {
  allElements.value = allElements.value.map((res) => { res.value = newValue; return res })
}
function checkAllInDir(newValue: boolean, directionId: number) {
  allElements.value = allElements.value.map((res) => { if (res.directionId === directionId) { res.value = newValue } return res })
}
function checkAllTypes(type: string, directionId: number) {
  allElements.value = allElements.value.map((res) => { if (res.type === type && res.directionId === directionId) { res.value = true } return res })
}
function checkAlPlk(chapterId: number, value: boolean) {
  allElements.value = allElements.value.map((res) => { if (res.type === 'plk_product' && res.chapterId === chapterId) { res.value = value } return res })
}
function checkVal(name: string) {
  const index = allElements.value.findIndex(res => res.checkbox === name)
  return allElements.value[index].value
}

const all = computed(() => {
  const result: any[] = markRaw([])
  allElements.value.forEach((i) => {
    if (i.value) {
      result.push(...i.items)
    }
  })
  return result
})

const allSum = computed(() => {
  return sumValues(useCloneDeep(all.value))
  // const result: any[] = markRaw(all.value)
  // return sumValues(result)
})

function sumValues(result: any[]) {
  const resultNew: any[] = []
  // суммируем если совпадение
  result.forEach((i) => {
    if (i) {
      const index = resultNew.findIndex(res => res.element_id === i.element_id)
      if (index !== -1) {
        resultNew[index].col += num(i.col)
      } else {
        resultNew.push(i)
      }
    }
  })
  return resultNew
}

function getData() {
  return useCloneDeep(props.data.directions).map((direction: any) => {
    return {
      id: direction.id,
      name: direction.name,
      subgroups: direction.subgroups.map((subgroup: any) => {
        return {
          id: subgroup.id,
          name: subgroup.name,
          chapters: subgroup.chapter_with_elements.map((chapter: any) => {
            return {
              id: chapter.id,
              name: chapter.name,
              items: getItems(chapter, direction.id)
            }
          })
        }
      })
    }
  })
}
const temp = getData()

function getPlk(plk: any, chapterId: number, productCol: number) {
  if (plk.product_plk_with_elements.length === 0) { return [] }
  return plk.product_plk_with_elements.map((item: any) => {
    const items = getPlkElementsFromProduct(item, productCol)
    allElements.value.push({ checkbox: 'plk_product_' + item.id, value: false, items, type: 'plk_product', chapterId })
    return {
      id: item.id,
      name: `${item.plk.article} Количество: ${item.col}`,
      checkbox: 'plk_product_' + item.id,
      items
    }
  })
}

function getItems(chapter: any, directionId: number) {
  if (chapter.product_with_elements.length) {
    return chapter.product_with_elements.map((item: any) => {
      const items = getElementsFromProduct(item)
      allElements.value.push({ checkbox: 'product_' + item.id, value: false, items, type: 'product', directionId })
      return {
        id: item.id,
        name: `${item.name} Количество: ${item.col}`,
        checkbox: 'product_' + item.id,
        items,
        plk: getPlk(item, chapter.id, item.col)
      }
    })
  }
  if (chapter.server_with_elements.length) {
    return chapter.server_with_elements.map((item: any) => {
      const items = getElementsFromServer(item)
      allElements.value.push({ checkbox: 'server_' + item.id, value: false, type: 'server', items, directionId })
      return {
        id: item.id,
        name: `${item.name} Количество: ${item.col}`,
        checkbox: 'server_' + item.id,
        items
      }
    })
  }
  if (chapter.lower_level_with_elements.length) {
    return chapter.lower_level_with_elements.map((item: any) => {
      const items = getElementsFromLowerLevel(item)
      allElements.value.push({ checkbox: 'lower_level_' + item.id, value: false, type: 'lower_level', items, directionId })
      return {
        id: item.id,
        name: `${item.name} Количество: ${item.col}`,
        checkbox: 'lower_level_' + item.id,
        items
      }
    })
  }
  if (chapter.chapter_elements.length) {
    const items = getElementsFromChapterElement(chapter.chapter_elements)
    allElements.value.push({ checkbox: 'chapter_element_' + chapter.id, value: false, type: 'chapter_element', items, directionId })
    return [
      {
        id: 10000,
        name: `${chapter.name}`,
        checkbox: 'chapter_element_' + chapter.id,
        items
      }
    ]
  }
  if (chapter.chapter_plks.length) {
    return chapter.chapter_plks.map((item: any) => {
      const items = getElementsFromPlk(item)
      allElements.value.push({ checkbox: 'chapter_plk_' + item.plk.id, value: false, type: 'chapter_plk', items, directionId })
      return {
        id: item.plk.id,
        name: `${item.plk.name} Количество: ${item.col}`,
        checkbox: 'chapter_plk_' + item.plk.id,
        items
      }
    })
  }
  return []
}

function num(num: number) {
  return parseFloat(num.toFixed(10))
}

function getElementsFromProduct(item: any) {
  const suCol = item.col
  const tempResult = [
    ...useCloneDeep(item.product_elements).map((i: any) => {
      i.col = num(i.col * suCol)
      return i
    })
  ]
  return getResult(tempResult)
}
function getPlkElementsFromProduct(item: any, productCol: number) {
  const plkCol = item.col
  const tempResult: any[] = [
    ...useCloneDeep(item.plk.plk_elements).map((plk: any) => {
      plk.col = num(plk.col * productCol * plkCol)
      return plk
    })]
  // console.log(item)
  // item.product_plk_with_elements.forEach((i: any) => {
  //   const plkCol = i.col
  //   tempResult.push(

  //   )
  // })
  return getResult(tempResult)
}
function getElementsFromServer(item: any) {
  const suCol = item.col
  const tempResult = [
    ...useCloneDeep(item.server_elements).map((i: any) => {
      i.col = num(i.col * suCol)
      return i
    })
  ]
  return getResult(tempResult)
}
function getElementsFromLowerLevel(item: any) {
  const suCol = item.col
  const tempResult = [
    ...useCloneDeep(item.lower_level_elements).map((i: any) => {
      i.col = num(i.col * suCol)
      return i
    })
  ]
  return getResult(tempResult)
}
function getElementsFromPlk(item: any) {
  const suCol = item.col
  const tempResult = [
    ...useCloneDeep(item.plk.plk_elements).map((i: any) => {
      i.col = num(i.col * suCol)
      return i
    })
  ]
  return getResult(tempResult)
}

function getElementsFromChapterElement(item: any) {
  return getResult(useCloneDeep(item))
}

// chapter_elements

function getResult(tempResult: any[]) {
  const result: any[] = []
  // суммируем если совпадение
  tempResult.forEach((i) => {
    if (i) {
      const index = result.findIndex(res => res.element_id === i.element_id)
      if (index !== -1) {
        result[index].col += num(i.col)
      } else {
        result.push(getLine(i))
      }
    }
  })
  return result
}

function getLine(i: any) {
  return {
    col: i.col,
    element_id: i.element_id,
    element_name: i.element.name,
    element_article: i.element.article
  }
}

const settings = {
  code: '',
  import: false,
  export: false,
  importExport: false,
  delAll: false,
  add: false,
  edit: false,
  headers: [
    { name: 'Артикул', code: 'element_article', type: 'string', tableSize: 250 },
    { name: 'Наименование', code: 'element_name', type: 'string' },
    { name: 'Количество', code: 'col', type: 'number', min: 0, tableSize: 50 }
  ]
}
</script>
