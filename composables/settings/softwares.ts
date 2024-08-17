import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  article: { name: 'Артикул', type: 'string', maxSize: 100, required: true },
  nds_value_id: { name: 'НДС', type: 'select', static: 'nds_values' },
  type_operation_id: { name: 'Тип операции', type: 'select', static: 'type_operations' }
})

export const softwares = {
  table: {
    code: 'softwares',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [features.name, features.article, features.nds_value_id, features.type_operation_id, { type: 'files' }, { type: 'cog' }]
  },
  form: {
    title: { edit: 'Редактирование программное обеспечение', add: 'Добавление программное обеспечение' },
    values: [
      features.name,
      features.article,
      {
        formBlock: '2',
        items: [features.nds_value_id, features.type_operation_id]
      }
    ]
  }

}
