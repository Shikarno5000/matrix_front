import { addCode } from '../index'

const features = addCode({
  code: { name: 'Код', type: 'string', maxSize: 30, required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  name: { name: 'Наименование', type: 'string', maxSize: 200, required: true },
  product_status_id: { name: 'Статус ШУ', type: 'select', static: 'product_statuses' },
  corpus_type_id: { name: 'Тип корпуса', type: 'select', static: 'corpus_types' },
  developer_id: { name: 'Разработчик', type: 'select', items: 'users', withCode: 'developer' },
  development_status_id: { name: 'Спецификация ШУ', type: 'select', static: 'development_statuses' },
  height: { name: 'Высота, мм', type: 'number', min: 0 },
  width: { name: 'Длина, мм', type: 'number', min: 0 },
  depth: { name: 'Глубина, мм', type: 'number', min: 0 },
  power: { name: 'Мощность, кВт', type: 'number', min: 0 },
  switch: { name: 'Рубильник, А', type: 'number', min: 0 },
  cross_section: { name: 'Сечение, мм', type: 'number', min: 0 },
  weight_estimation: { name: 'Оценка веса, кг', type: 'number', min: 0 },
  production_time_estimation: { name: 'Время изготовления, ч', type: 'number', min: 0 },
  unforeseen_expenses_percentage: { name: 'Непредвиденные, %', type: 'number', min: 0 },
  ups: { name: 'ИБП', type: 'select', static: 'booleans' },
  ip_id: { name: 'IP', type: 'select', static: 'ips' },
  ex_id: { name: 'Ex', type: 'select', static: 'exs' },
  voltage: { name: 'Питание', type: 'string', maxSize: 15 },
  location_id: { name: 'Монтаж', type: 'select', static: 'locations' },
  specification_id: { name: 'Спека к договору', type: 'select', items: 'specifications' }
})

export const products = {
  table: {
    code: 'products',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.code, type: 'linkToId', to: '/projects/{id}/prod-' },
      { ...features.name, type: 'linkToId', to: '/projects/{id}/prod-' },
      features.ups,
      features.ip_id,
      features.ex_id,
      features.voltage,
      features.specification_id,
      features.product_status_id,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование ШУ', add: 'Добавление ШУ' },
    values: [
      features.name,
      {
        formBlock: '3',
        items: [features.code, features.col, features.developer_id]
      },
      {
        formBlock: '3',
        items: [features.product_status_id, features.development_status_id, features.specification_id]
      },
      {
        formBlock: '3',
        items: [features.corpus_type_id, features.ip_id, features.ex_id]
      },
      {
        formBlock: '3',
        items: [features.height, features.width, features.depth]
      },
      {
        formBlock: '3',
        items: [features.location_id, features.ups, features.voltage]
      },
      {
        formBlock: '3',
        items: [features.power, features.switch, features.cross_section]
      },
      {
        formBlock: '3',
        items: [features.weight_estimation, features.production_time_estimation, features.unforeseen_expenses_percentage]
      }
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      ...Object.values(features),
      { name: 'Файлы', type: 'files', table: 'products' }
    ]
  }

}
