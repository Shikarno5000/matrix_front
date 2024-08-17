import { addCode } from '../index'

const features = addCode({
  name: { name: 'Переменная', type: 'string', maxSize: 20, required: true },
  element_id: { name: 'ЭБ', type: 'select', items: 'elements', required: true }
})

export const ratios = {
  table: {
    code: 'ratios',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      features.name,
      { name: 'Артикул', code: 'element', type: 'extractingValues', extractingValue: 'article' },
      { name: 'Элемент', code: 'element', type: 'extractingValues', extractingValue: 'name' },
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование соотношения', add: 'Добавление соотношения' },
    values: [
      features.name,
      features.element_id
    ]
  }
}
