<template>
  <MSection :sec-code="`timeline-${to?.table}`" :title="title ? title : 'История'" :hide-in-modal="hideInModal">
    <template #header>
      <MTableCompShow v-model="limit" />
      <MBtnShowEdit v-model="showEdit" />
      <MDialog v-if="to" table="timelines" :to="to" action="add" @refresh="emit('refresh')" />
    </template>
    <div class="m-timeline">
      <div
        v-for="line in undatedTimelines"
        :key="line.id"
        class="m-timeline__item"
      >
        <div class="grid gap-1">
          <div class="flex gap-2 items-center">
            <span class="text-sm font-semibold my-0">
              {{ formatTime(line.date, 'dd.mm.yy') }}
            </span>
            <span v-if="line.parent" class="m-badge m-badge--gray">{{ line.parent.name }}</span>
            <span v-if="line.entrance" class="m-badge m-badge--green">
              {{ priceSet(line.entrance) }}
            </span>
            <span v-if="line.expenditure" class="m-badge m-badge--red">
              {{ priceSet(line.expenditure) }}
            </span>
            <span class="text-xs tracking-wide">
              {{ line.text }}
            </span>
          </div>
          <div v-if="line.description" class="text-xs m-text-muted">
            {{ line.description }}
          </div>
        </div>
        <div v-if="showEdit" class="flex gap-1 items-center m-text-muted">
          <MCreate v-if="line.create_update" :data="line.create_update" />
          <MDialog table="timelines" :data="line" action="edit" @refresh="emit('refresh')" />
        </div>
      </div>
    </div>
  </MSection>
</template>

<script setup lang="ts">
const props = defineProps<{
  timelines: TTimeline[]
  hideInModal?: true
  title?: string
  to?: {
    table: string
    id: number
  }
}>()
const emit = defineEmits(['refresh'])

const limit = ref<number>(10)
const showEdit = ref(false)
const undatedTimelines = computed(() => Number(limit.value) && props.timelines ? props.timelines.slice(0, limit.value) : props.timelines)

</script>
