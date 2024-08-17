import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  article: { name: 'Артикул', type: 'string', maxSize: 100, required: true },
  plk_type_id: { name: 'Тип', type: 'select', static: 'plk_types', required: true },
  weight_per_unit: { name: 'Вес на единицу', type: 'number', min: 0 },
  nds_value_id: { name: 'НДС', type: 'select', static: 'nds_values' },
  type_operation_id: { name: 'Тип операции', type: 'select', static: 'type_operations' },
  not_our: { name: 'НЕ наше производство', type: 'checkbox' }
})

export const plks = {
  table: {
    code: 'plks',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.name, type: 'toIf', ifNot: 'not_our', to: '/base/plks/{id}/' },
      { ...features.article, type: 'toIf', ifNot: 'not_our', to: '/base/plks/{id}/' },
      features.plk_type_id,
      features.weight_per_unit,
      features.nds_value_id,
      features.type_operation_id,
      features.not_our,
      { type: 'files' },
      { type: 'cog' }
    ]
  },
  form: {
    title: {
      edit: 'Редактирование программируемого логического контроллера',
      add: 'Добавление программируемого логического контроллера'
    },
    values: [
      features.name,
      {
        formBlock: '2',
        items: [features.article, features.plk_type_id, features.weight_per_unit, features.nds_value_id, features.type_operation_id, features.not_our]
      }
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      ...Object.values(features),
      { name: 'Файлы', type: 'files', table: 'plks' }
    ]
  }
}
