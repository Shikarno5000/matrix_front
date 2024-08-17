import { addCode } from '../index'

const features = addCode({
  description: { name: 'Предложение', type: 'textarea', required: true },
  author_id: { name: 'Автор', type: 'select', items: 'users', withCode: 'author', required: true }
})

export const offers = {
  table: {
    code: 'offers',
    title: 'Предложения',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      features.author_id,
      features.description,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование предложения', add: 'Добавление предложения' },
    values: [
      features.description,
      features.author_id
    ]
  },
  card: {
    title: 'Основная информация',
    values: []
  }

}
