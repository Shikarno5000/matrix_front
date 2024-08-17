import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 120, required: true }
})

export const positions = {
  table: {
    code: 'positions',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [features.name, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование должности', add: 'Добавление должности' },
    values: [features.name]
  }

}
