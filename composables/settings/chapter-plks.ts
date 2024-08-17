import { addCode } from '../index'

const features = addCode({
  plk_id: { name: 'ПЛК', type: 'select', items: 'plks', required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  specification_id: { name: 'Спецификация', type: 'select', items: 'specifications' }
})

export const chapterPlks = {
  table: {
    code: 'chapter-plks',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { name: 'Артикул', code: 'plk', type: 'toIf', ifNot: 'not_our', extractingValue: 'article', to: '/base/plks/{id}/' },
      { name: 'Наименование', code: 'plk', type: 'toIf', ifNot: 'not_our', extractingValue: 'name', to: '/base/plks/{id}/' },
      { name: 'Тип', code: 'plk', type: 'extractingValues', extractingValue: 'plk_type_id', static: 'plk_types' },
      features.col,
      features.specification_id,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование  привязки ПЛК', add: 'Добавление  привязки ПЛК' },
    values: [
      features.plk_id,
      {
        formBlock: '2',
        items: [features.col, features.specification_id]
      }
    ]
  }

}
