<template>
  <div class="m-main__bg" @click="emit('close')" />
  <div class="m-main__sidebar">
    <MBtn class="border m-btn--small " icon-start="material-symbols:arrow-back" text="Назад" @click="$router.go(-1)" />
    <ul class="m-main-menu">
      <li v-for="item in menuRole" :key="item.to">
        <NuxtLink v-if="!item.children" :to="item.to" class="m-main-menu__item">
          <Icon :name="item.icon" class="m-main-menu__icon" />
          <span class="m-main-menu__text "> {{ item.name }} </span>
        </NuxtLink>
        <details v-else class="group [&_summary::-webkit-details-marker]:hidden" :open="isOpen(item.children)">
          <summary class="group m-main-menu__sub-block">
            <div class="flex items-center gap-2">
              <Icon :name="item.icon" class="m-main-menu__icon" />
              <span class="m-main-menu__text"> {{ item.name }} </span>
            </div>

            <span class="m-main-menu__chevron">
              <Icon name="tabler:chevron-down" class="m-main-menu__icon" />
            </span>
          </summary>

          <ul class="m-main-menu__subitems">
            <li v-for="itemChildren in item.children" :key="itemChildren.to">
              <NuxtLink
                :to="itemChildren.to"
                class="m-main-menu__subitem"
              >
                {{ itemChildren.name }}
              </NuxtLink>
            </li>
          </ul>
        </details>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '~/store/auth'
const store = useAuthStore()
const route = useRoute()

const emit = defineEmits(['close'])

const menu = [
  { name: 'Dashboard', to: '/', icon: 'codicon:dashboard', role: [1, 2] },
  { name: 'Проекты', to: '/projects', icon: 'codicon:dashboard', role: [1, 2] },
  {
    name: 'Делопроизводство',
    icon: 'ph:office-chair',
    role: [1, 2],
    children: [
      { name: 'Реестр договоров', to: '/office-work/contracts' },
      { name: 'Реестр писем', to: '/office-work/letters' },
      { name: 'Реестр служебных записок', to: '/office-work/official-notes' },
      { name: 'Реестр приказов', to: '/office-work/orders' },
      { name: 'Реестр внутренних совещаний', to: '/office-work/internal-meetings' }
    ]
  },
  {
    name: 'Склад',
    icon: 'tabler:building-warehouse',
    role: [1, 2],
    children: [
      { name: 'Произведенная продукция', to: '/warehouse/manufactured-products' },
      { name: 'Комплектация', to: '/warehouse/equipments' }
    ]
  },
  {
    name: 'Экономика',
    icon: 'streamline:decent-work-and-economic-growth',
    role: [1, 2],
    children: [
      { name: 'Структура организации / штатное расписание', to: '/economy/organization-structure' },
      { name: 'Планирование поступления/расхода ДС в проектах', to: '/economy/admission-planning' },
      { name: 'Участие персонала в проектах', to: '/economy/staff-participation' }
    ]
  },
  {
    name: 'Работники Матрикс',
    icon: 'mdi:user',
    role: [1, 2],
    children: [
      { name: 'Список', to: '/users' },
      { name: 'Должности', to: '/users/positions' }
    ]
  },
  {
    name: 'Контрагенты',
    icon: 'mdi:television-guide',
    role: [1],
    children: [
      { name: 'Список', to: '/counter-agents' },
      { name: 'Работники контрагентов', to: '/counter-agents/workers' }
    ]
  },
  {
    name: 'База',
    icon: 'mdi:television-guide',
    role: [1],
    children: [
      { name: 'Элементная база', to: '/base/elements' },
      { name: 'Элементная база Цены', to: '/base/elements/prices' },
      { name: 'Программируемые логические контроллеры', to: '/base/plks' },
      { name: 'Программное обеспечение', to: '/base/softwares' }
    ]
  },
  {
    name: 'Админ',
    role: [1],
    icon: 'material-symbols:settings-outline',
    children: [
      // { name: 'Статичные данные', to: '/admin/static-data' },
      // { name: 'exel-test', to: '/admin/exel-test' },
      // { name: 'Элементы', to: '/admin/elements' },
      { name: 'Управление файлами', to: '/admin/files' },
      { name: 'Вопрос', to: '/questions' }
    ]
  },
  {
    name: 'Опросные листы',
    role: [1],
    icon: 'material-symbols:settings-outline',
    children: [
      { name: 'ШУ', to: '/questionnaires/survey' },
      { name: 'КНС', to: '/questionnaires/kns' },
      { name: 'Соотношение элементов', to: '/questionnaires/ratio' }
    ]
  },
  { name: 'Замечания/предложения', to: '/suggestions', icon: 'codicon:dashboard', role: [1] }
]
//
const menuRole = computed(() => {
  return store.user ? menu.filter(i => i.role.find(e => e === 1)) : []
})

function isOpen (children: { name: string, to: string }[]) {
  let result = false
  children.forEach((child) => {
    if (child.to === route.path) { result = true }
  })
  return result
}

</script>
