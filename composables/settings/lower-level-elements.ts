import { addCode } from '../index'

const features = addCode({
  element_id: { name: 'ЭБ', type: 'select', items: 'elements', required: true },
  col: { name: 'Количество', type: 'number', min: 0 },
  comment: { name: 'Комментарий', type: 'string', maxSize: 250 },
  position: { name: 'Позиция', type: 'string', maxSize: 50 }
})

export const lowerLevelElements = {
  table: {
    code: 'lower-level-elements',
    title: 'Элементная база',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { name: 'Артикул', code: 'element', type: 'extractingValues', extractingValue: 'article' },
      { name: 'Элемент', code: 'element', type: 'extractingValues', extractingValue: 'name' },
      features.col,
      features.comment,
      features.position,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование привязки ЭБ к НУ', add: 'Добавление привязки ЭБ к НУ' },
    values: [
      {
        formBlock: '21',
        items: [features.element_id, features.col]
      },
      features.comment,
      features.position
    ]
  }

}
