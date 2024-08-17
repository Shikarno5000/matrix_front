import { addCode } from '../index'

const features = addCode({
  name: { name: 'Наименование', type: 'string', maxSize: 250, required: true },
  description: { name: 'Описание', type: 'textarea', required: true },
  link: { name: 'Ссылка на страницу', type: 'link', maxSize: 250 },
  comment: { name: 'Комментарий', type: 'textarea', maxSize: 250 },
  suggestion_status_id: { name: 'Статус', type: 'select', static: 'suggestion_statuses', batchEditing: true },
  suggestion_type_id: { name: 'Тип', type: 'select', static: 'suggestion_types', batchEditing: true }
})

export const suggestions = {
  table: {
    code: 'suggestions',
    title: '',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { name: 'Дата', code: 'create_update', type: 'extractingValues', extractingValue: ['c', 'at'], extractingType: 'date' },
      features.name,
      features.description,
      features.comment,
      features.link,
      features.suggestion_type_id,
      features.suggestion_status_id,
      { name: 'Автор', code: 'create_update', type: 'extractingValues', extractingValue: ['c', 'by'] },
      { type: 'files' },
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование замечания/предложения', add: 'Добавление замечания/предложения' },
    values: [
      features.name,
      features.link,
      features.description,
      features.comment,
      {
        formBlock: '2',
        items: [features.suggestion_status_id, features.suggestion_type_id]
      }
    ]
  }

}
