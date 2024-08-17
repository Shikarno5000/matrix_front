import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 50, required: true },
  name_short: { name: 'Краткое', type: 'string', maxSize: 20 },
  sort: { name: 'Сортировка', type: 'number', max: 1000, min: 0 }
})

export const directions = {
  table: {
    code: 'directions',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true
  },
  form: {
    title: { edit: 'Редактирование стадии', add: 'Добавление стадии' },
    values: [
      features.name,
      {
        formBlock: '2',
        items: [features.name_short, features.sort]
      }
    ]
  }
}
