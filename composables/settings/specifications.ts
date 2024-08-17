import { addCode } from '../index'
const features = addCode({
  article: { name: 'Номер', type: 'string', maxSize: 100, required: true },
  description: { name: 'Описание', type: 'string', maxSize: 250 },
  date: { name: 'Дата', type: 'date' },
  delivery_date: { name: 'Дата поставки', type: 'date' },
  counter_agent_id: { name: 'Грузополучатель', type: 'select', items: 'counterAgents' },
  comment: { name: 'Комментарий', type: 'textarea' },
  specification_status_id: { name: 'Статус', type: 'select', static: 'specification_statuses' }
})

export const specifications = {
  table: {
    code: 'specifications',
    title: 'Спецификации',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.article, type: 'linkToId', to: '/office-work/contracts/{id}/' },
      features.description,
      features.date,
      features.delivery_date,
      features.counter_agent_id,
      features.specification_status_id,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование спецификации', add: 'Добавление спецификации' },
    values: [features.article, features.description, features.date, features.delivery_date, features.counter_agent_id, features.comment, features.specification_status_id]
  },
  card: {
    title: 'Основная информация',
    values: [...Object.values(features), { name: 'Файлы', type: 'files', table: 'specifications' }]
  }

}
