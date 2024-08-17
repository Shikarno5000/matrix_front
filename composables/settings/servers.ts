import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  article: { name: 'Артикул', type: 'string', maxSize: 100, required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  nds_value_id: { name: 'НДС', type: 'select', static: 'nds_values' },
  type_operation_id: { name: 'Тип операции', type: 'select', static: 'type_operations' },
  specification_id: { name: 'Спецификация', type: 'select', items: 'specifications' }
})

export const servers = {
  table: {
    code: 'servers',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.article, type: 'linkToId', to: '/projects/{id}/server-' },
      { ...features.name, type: 'linkToId', to: '/projects/{id}/server-' },
      features.col,
      features.specification_id,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование сервера или АРМа', add: 'Добавление сервера или АРМа' },
    values: [
      features.name,
      {
        formBlock: '21',
        items: [features.article, features.col]
      },
      {
        formBlock: '2',
        items: [features.nds_value_id, features.type_operation_id, features.specification_id]
      }
    ]
  },
  card: {
    title: 'Основная информация',
    values: [...Object.values(features), { name: 'Файлы', type: 'files', table: 'servers' }]
  }

}
