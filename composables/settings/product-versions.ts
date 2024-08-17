import { addCode } from '../index'

const features = addCode({
  version_date: { name: 'Дата', type: 'date', required: true },
  version_comment: { name: 'Комментарий', type: 'string', maxSize: 100, required: true },
  version_price: { name: 'Цена', type: 'price' },
  version_pfa: { name: 'П.Ф.А.', type: 'checkbox' }
})

export const productVersions = {
  table: {
    code: 'product-versions',
    title: 'Версии',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.version_date, to: '/projects/2/prod-{id}' },
      features.version_comment,
      features.version_price,
      features.version_pfa,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование версии', add: 'Добавление версии' },
    values: [
      {
        formBlock: '2',
        items: [features.version_date, features.version_comment, features.version_price, features.version_pfa]
      }
    ]
  }

}
