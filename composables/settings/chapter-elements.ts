import { addCode } from '../index'

const features = addCode({
  element_id: { name: 'ЭБ', type: 'select', items: 'elements', itemsFilter: 4, required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  specification_id: { name: 'Спецификация', type: 'select', items: 'specifications' }
})

export const chapterElements = {
  table: {
    code: 'chapter-elements',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { name: 'Элемент', code: 'element', type: 'extractingValues', extractingValue: 'name' },
      { name: 'Артикул', code: 'element', type: 'extractingValues', extractingValue: 'article' },
      { name: 'IP', code: 'element', type: 'extractingValues', extractingValue: 'ip_id', static: 'ips' },
      { name: 'Ex', code: 'element', type: 'extractingValues', extractingValue: 'ex_id', static: 'exs' },
      features.col,
      features.specification_id,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование привязки ЭБ к разделу', add: 'Добавление привязки ЭБ к разделу' },
    values: [
      features.element_id,
      {
        formBlock: '2',
        items: [features.col, features.specification_id]
      }
    ]
  }
}
