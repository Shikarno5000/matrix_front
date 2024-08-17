import { addCode } from '../index'

const features = addCode({
  code: { name: 'Номер', type: 'string', maxSize: 50, required: true },
  weight_per_unit: { name: 'Вес на единицу', type: 'number', min: 0 },
  type_operation_id: { name: 'Тип операции', type: 'select', static: 'type_operations' },
  ip_id: { name: 'IP', type: 'select', static: 'ips' },
  ex_id: { name: 'Ex', type: 'select', static: 'exs' }
})

export const elementCodes = {
  table: {
    code: 'element-codes',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [features.code, features.weight_per_unit, features.type_operation_id, features.ip_id, features.ex_id, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование кода', add: 'Добавление кода' },
    values: [
      features.code,
      {
        formBlock: '2',
        items: [features.weight_per_unit, features.type_operation_id, features.ip_id, features.ex_id]
      }
    ]
  }

}
