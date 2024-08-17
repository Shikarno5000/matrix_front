import { addCode } from '../index'

const features = addCode({
  date: { name: 'Дата регистрации', type: 'date', required: true },
  code: { name: 'Номер', type: 'string', maxSize: 25, required: true },
  content: { name: 'Содержание', type: 'string', maxSize: 250 },
  recipient_id: { name: 'Получатель', type: 'select', items: 'users', withCode: 'recipient' },
  applications: { name: 'Приложения', type: 'string', maxSize: 250 },
  executor_id: { name: 'Исполнитель', type: 'select', items: 'users', withCode: 'executor' },
  notes: { name: 'Примечания', type: 'string', maxSize: 250 }
})

export const officialNotes = {
  table: {
    code: 'official-notes',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [features.date, features.code, features.recipient_id, features.executor_id, features.content, features.applications, features.notes, { type: 'files' }, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование служебной записки', add: 'Добавление служебной записки' },
    values: [
      {
        formBlock: '2',
        items: [features.date, features.code]
      },
      {
        formBlock: '2',
        items: [features.recipient_id, features.executor_id]
      },
      features.content,
      features.applications,
      features.notes
    ]
  }

}
