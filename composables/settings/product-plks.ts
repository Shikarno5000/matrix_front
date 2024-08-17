import { addCode } from '../index'

const features = addCode({
  plk_id: { name: 'Контроллер', type: 'select', items: 'plks', required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  ready_col: { name: 'Количество готовых', type: 'number', min: 0 },
  comment: { name: 'Комментарий', type: 'string', maxSize: 100 },
  position: { name: 'Позиция', type: 'string', maxSize: 10 }
})

export const productPlks = {
  table: {
    code: 'product-plks',
    title: 'ПЛК',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { name: 'Артикул', code: 'plk', type: 'extractingValues', extractingValue: 'article' },
      { name: 'Наименование', code: 'plk', type: 'extractingValues', extractingValue: 'name' },
      features.col,
      features.ready_col,
      features.comment,
      features.position,
      { type: 'cog' }
    ]
  },
  table2: {
    code: '',
    title: 'Контроллеры из ШУ',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: false,
    edit: false,
    headers: [
      { name: 'Артикул', code: 'plk', type: 'extractingValues', extractingValue: 'article' },
      { name: 'Наименование', code: 'plk', type: 'extractingValues', extractingValue: 'name' },
      features.col,
      features.ready_col,
      { name: 'Изделие', code: 'product', type: 'extractingValues', extractingValue: 'name' }
    ]
  },
  form: {
    title: { edit: 'Редактирование привязки ПЛК к изделию', add: 'Добавление привязки ПЛК к изделию' },
    values: [
      {
        formBlock: '21',
        items: [features.plk_id, features.col]
      },
      features.ready_col,
      features.comment,
      features.position
    ]
  }
}
