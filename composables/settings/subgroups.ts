import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  suffix: { name: 'Суффикс', type: 'string', maxSize: 25 }
})

export const subgroups = {
  table: {
    code: 'subgroups',
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
    title: { edit: 'Редактирование раздела', add: 'Добавление раздела' },
    values: [features.name, features.suffix]
  },
  card: {

  }

}
