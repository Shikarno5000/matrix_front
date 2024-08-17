import { addCode } from '../index'

const features = addCode({
  article: { name: 'Артикул', type: 'string', maxSize: 100, required: true },
  element_type_id: { name: 'Тип', type: 'select', static: 'element_types', required: true },
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  weight_per_unit: { name: 'Вес на единицу', type: 'number', min: 0 },
  nds_value_id: { name: 'НДС', type: 'select', static: 'nds_values' },
  unit_id: { name: 'Единица измерения', type: 'select', static: 'units' },
  type_operation_id: { name: 'Тип операции', type: 'select', static: 'type_operations' },
  element_for_type_id: { name: 'Используется в', type: 'select', static: 'element_for_types' },
  order_code_id: { name: 'Опросный лист', type: 'select', static: 'order_codes' },
  manufacturer: { name: 'Производитель', type: 'string', maxSize: 50 },
  ip_id: { name: 'IP', type: 'select', static: 'ips' },
  ex_id: { name: 'Ex', type: 'select', static: 'exs' }
})

export const elements = {
  table: {
    code: 'elements',
    title: 'Перечень элементов',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.article, to: '/base/elements/{id}/' },
      { ...features.name, to: '/base/elements/{id}/' },
      features.weight_per_unit,
      features.unit_id,
      features.nds_value_id,
      features.type_operation_id,
      features.element_type_id,
      features.element_for_type_id,
      features.order_code_id,
      features.manufacturer,
      features.ip_id,
      features.ex_id,
      { type: 'files' },
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование элемента', add: 'Добавление элемента' },
    values: [
      {
        formBlock: '2',
        items: [features.article, features.element_type_id]
      },
      features.name,
      features.manufacturer,
      {
        formBlock: '2',
        items: [features.weight_per_unit, features.nds_value_id, features.unit_id, features.type_operation_id, features.element_for_type_id, features.order_code_id, features.ip_id, features.ex_id]
      }
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      ...Object.values(features),
      { name: 'Файлы', type: 'files', table: 'elements' }
    ]
  }

}
