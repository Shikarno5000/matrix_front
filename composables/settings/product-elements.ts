import { addCode } from '../index'

const features = addCode({
  element_id: { name: 'ЭБ', type: 'select', items: 'elements', required: true, disabledEdit: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  comment: { name: 'Комментарий', type: 'string', maxSize: 250 },
  position: { name: 'Позиция', type: 'string', maxSize: 50 },
  fix_price: { name: 'Фиксированная цена', type: 'price', min: 0 }
})

export const productElements = {
  table: {
    code: 'product-elements',
    title: 'Элементная база',
    import: true,
    export: true,
    importExport: features,
    delAll: true,
    add: true,
    edit: true,
    headers: [
      { name: 'Артикул', code: 'element', type: 'extractingValues', extractingValue: 'article' },
      { name: 'Элемент', code: 'element', type: 'extractingValues', extractingValue: 'name' },
      { name: 'Ед. изм.', code: 'element', type: 'extractingValues', static: 'units', extractingValue: 'unit_id' },
      features.col,
      features.comment,
      features.position,
      features.fix_price,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование привязки элемента базы к изделию', add: 'Добавление привязки элемента базы к изделию' },
    values: [
      {
        formBlock: '21',
        items: [
          features.element_id,
          features.col
        ]
      },
      features.comment,
      features.position,
      features.fix_price,
      { type: 'element_prices' }
    ]
  }

}
