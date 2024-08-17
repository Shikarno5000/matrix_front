import { addCode } from '../index'

const features = addCode({
  code: { name: 'Номер', type: 'string', maxSize: 100, required: true },
  name: { name: 'Наименование', type: 'string', maxSize: 200, required: true },
  date: { name: 'Дата', type: 'date' }
})

export const applications = {
  table: {
    code: 'applications',
    title: 'Приложения',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [{ ...features.date, tableSize: 250 }, features.code, { ...features.name, name: 'Наим.' }, { type: 'files' }, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование приложения', add: 'Добавление приложения' },
    values: [
      {
        formBlock: '2',
        items: [features.code, features.date]
      },
      features.name
    ]
  }
}
