import { addCode } from '../index'

const features = addCode({
  name: { name: 'Вопрос', type: 'string', maxSize: 250, required: true },
  description: { name: 'Описание', type: 'textarea' }
})

export const questions = {
  table: {
    code: 'questions',
    title: 'Вопросы',
    import: false,
    export: false,
    importExport: features,
    delAll: false,
    add: true,
    edit: true,
    headers: [
      { ...features.name, to: '/office-work/internal-meetings/{internal_meeting_id}/{id}/' },
      features.name,
      features.description,
      { type: 'cog' }
    ]
  },
  form: {
    title: { edit: 'Редактирование вопроса', add: 'Добавление вопроса' },
    values: [
      features.name,
      features.description
    ]
  },
  card: {
    title: 'Основная информация',
    values: [
      features.name,
      features.description
      // { name: 'Файлы', type: 'files', table: table.code }
    ]
  }

}
