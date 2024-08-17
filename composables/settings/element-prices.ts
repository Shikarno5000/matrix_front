import { addCode } from '../index'

const features = addCode({
  element_id: { name: 'Элемент', type: 'select', items: 'elements', required: true },
  counter_agent_id: { name: 'Контрагент', type: 'select', items: 'counterAgents', required: true },
  price: { name: 'Цена', type: 'price', min: 0, required: true },
  price_for_matrix: { name: 'Цена для матрикса', type: 'price', min: 0 }
})

export const elementPrices = {
  table: {
    code: 'element-prices',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { name: 'Артикул', code: 'element', type: 'extractingValues', extractingValue: 'article' },
      { name: 'Наименование', code: 'element', type: 'extractingValues', extractingValue: 'name' },
      features.counter_agent_id,
      features.price,
      features.price_for_matrix,
      { name: 'Дата изменения', type: 'dateOfChange', code: 'date' },
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование цены', add: 'Добавление цены' },
    values: [features.element_id, features.counter_agent_id, features.price, features.price_for_matrix]
  }

}
