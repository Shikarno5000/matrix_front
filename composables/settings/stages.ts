import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 100, required: true },
  checked: { name: 'Выполнен', type: 'checkbox' },
  sort: { name: 'Сортировка', type: 'number', max: 1000, min: 0 }
})

export const stages = {
  table: {
    code: 'stages',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [{ type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование вехи', add: 'Добавление вехи' },
    values: [
      features.name,
      {
        formBlock: '2',
        items: [features.checked, features.sort]
      }]
  }

}
