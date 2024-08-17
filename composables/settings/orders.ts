import { addCode } from '../index'

const features = addCode({
  date: { name: 'Дата регистрации', type: 'date', required: true },
  code: { name: 'Номер', type: 'string', maxSize: 25, required: true },
  content: { name: 'Содержание', type: 'string', maxSize: 250 },
  applications: { name: 'Приложения', type: 'string', maxSize: 250 },
  executor_id: { name: 'Исполнитель', type: 'select', items: 'users', withCode: 'executor' },
  notes: { name: 'Примечания', type: 'string', maxSize: 250 }
})

export const orders = {
  table: {
    code: 'orders',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [features.date, features.code, features.executor_id, features.content, features.applications, features.notes, { type: 'files' }, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование приказа', add: 'Добавление приказа' },
    values: [
      {
        formBlock: '2',
        items: [features.date, features.code]
      },
      features.executor_id,
      features.content,
      features.applications,
      features.notes
    ]
  }

}
