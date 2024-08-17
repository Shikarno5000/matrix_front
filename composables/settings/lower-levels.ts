import { addCode } from '../index'

const features = addCode({
  article: { name: 'Код', type: 'string', maxSize: 100, required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  specification_id: { name: 'Спецификация', type: 'select', items: 'specifications' },
  ip_id: { name: 'IP', type: 'select', static: 'ips' },
  ex_id: { name: 'Ex', type: 'select', static: 'exs' }
})

export const lowerLevels = {
  table: {
    code: 'lower-levels',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.article, type: 'linkToId', to: '/projects/{id}/lowerlevel-' },
      { ...features.name, type: 'linkToId', to: '/projects/{id}/lowerlevel-' },
      features.col,
      features.ip_id,
      features.ex_id,
      features.specification_id,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование нижнего уровня', add: 'Добавление нижнего уровня' },
    values: [
      {
        formBlock: '21',
        items: [features.article, features.col]
      },
      features.name,
      features.specification_id,
      {
        formBlock: '2',
        items: [features.ip_id, features.ex_id]
      }
    ]
  },
  card: {
    title: 'Основная информация',
    values: [...Object.values(features), { name: 'Файлы', type: 'files', table: 'lower-levels' }]
  }

}
